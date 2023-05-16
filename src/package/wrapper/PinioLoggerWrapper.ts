import crypto from 'crypto';
import { pinoHttp } from 'pino-http';
import { config } from '../../utility/Config';

const pinoHttpInstance = pinoHttp({
    ...(process.env.NODE_ENV !== 'production' &&
        config.LOGGER_PRINT_PRETTY_ENABLED && {
            transport: {
                target: 'pino-pretty',
            },
        }),
    level: config.LOGGER_LEVEL,
    redact: ['key', 'req.headers.authorization', 'req.headers.cookie'],
    // TODO support OpenTel to forward headers in request and use in downstream messaging
    // customProps: (req) => {
    //     return {
    //         traceId: req.headers.traceId,
    //     };
    // },
    // Printout the request outcome Success/Failure and all the header info
    autoLogging: config.LOGGER_AUTO_LOGGING_ENABLED,
    // Include all the request information in the context log messages
    quietReqLogger: config.LOGGER_QUIET_REQ_LOGGER_ENABLED,
    // For now just generate a random request ID to be use in all contexts,
    // in the future we can maybe use the traceID from open telemetry
    genReqId: () => crypto.randomUUID(),
    formatters: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        level: (label, number) => ({ level: label }),
    },
});

const globalLogger = pinoHttpInstance.logger;

export { globalLogger, pinoHttpInstance };
