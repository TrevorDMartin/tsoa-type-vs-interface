import { HttpStatusCode } from '@src/utility/HttpStatusCode';
import { json, urlencoded } from 'body-parser';
import boxen from 'boxen';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import detect from 'detect-port';
import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { exit } from 'process';
import client from 'prom-client';
import {
    globalLogger,
    pinoHttpInstance,
} from './package/wrapper/PinioLoggerWrapper';
import { config } from './utility/Config';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '@generated/routes';
import swaggerJson from '@generated/swagger.json';

const validCorsOrigins = [/\.lowes\.com$/] as (boolean | string | RegExp)[];
validCorsOrigins.push(...config.CORS_EXTRA_DOMAINS);

const defaultGlobalCorsPolicy: CorsOptions = {
    origin: validCorsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};

if (config.OAUTH_COOKIE_SECRETS.length === 0) {
    globalLogger.error(
        `env var 'OAUTH_COOKIE_SECRETS' was not set. Please configure this env variable'`
    );
    exit(1);
}

const configAppSettings = (app: Express): void => {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJson));
    app.use('/static/swagger', express.static('generated/swagger.json'));
    app.use(
        // Disable express fingerprint
        helmet(),
        // Gzip compressing can greatly decrease the size of the response body
        // Check here for more info https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
        compression(),
        /*
            Adding logger middleware, for production build skipping prettify print to better debug.
            Check here for more info https://github.com/pinojs/pino-http
            pino is better then morgan and winston. So opted for better performance.
        */
        pinoHttpInstance,
        // Enabling cors for all routes. If you want enable cors for particular route then check here
        // https://www.npmjs.com/package/cors#enable-cors-for-a-single-route
        cors(defaultGlobalCorsPolicy),
        // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        // Check here for more info https://www.npmjs.com/package/cookie-parser
        cookieParser(config.OAUTH_COOKIE_SECRETS),
        json(),
        urlencoded({ extended: false })
        // TODO add back guid middleware
        // // GUID middleware
        // (req: Request, res: Response, next: NextFunction) => {
        //     Guid.guidV2.guidMiddleware(req, res, next).catch((err) => {
        //         req.log.error(err, 'Guid middleware error');
        //         next();
        //     });
        // }
    );

    // Check here for best practices https://expressjs.com/en/advanced/best-practice-security.html
    app.disable('x-powered-by');
};

const configAppRouter = (app: Express): void => {
    // Setup client to collect the default metrics for Prometheus
    const { register } = client;
    client.collectDefaultMetrics({ register });

    app.get('/metrics', (req, res) => {
        (async () => {
            try {
                // Return all metrics the Prometheus exposition format
                res.set('Content-Type', register.contentType);
                const metrics = await register.metrics();
                res.send(metrics);
            } catch (err) {
                res.status(HttpStatusCode.InternalServerError).end(err);
            }
        })().catch((err) => req.log.error(err, 'error getting metrics data'));
    });

    // TODO: Temporary to unblock us, in the future we should check other services
    app.get('/health', (_, res) => {
        res.status(200).send('Ok');
    });
    RegisterRoutes(app);
};

const startExpressServer = async (app: Express): Promise<void> => {
    const httpServer = http.createServer(app);
    // cleanly exit
    // See: https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
    process.on('SIGTERM', () => {
        globalLogger.info('SIGTERM signal received: closing HTTP server');
        httpServer.close(() => {
            globalLogger.info('HTTP server closed');
        });
    });

    const portChoose = await detect(8080).catch((err) => {
        globalLogger.error(err, 'Failed to configure the port');
        throw err;
    });

    httpServer.listen({ port: portChoose }, () => {
        // eslint-disable-next-line no-console
        console.log(
            '\n' +
                boxen(`Application started in http://localhost:${portChoose}`, {
                    title: 'Odin BFF',
                    padding: 1,
                    borderColor: 'magenta',
                    titleAlignment: 'center',
                })
        );
    });
};

const app = express();
configAppSettings(app);
configAppRouter(app);
startExpressServer(app).catch((err) =>
    globalLogger.error(err, 'Application failed to start')
);
