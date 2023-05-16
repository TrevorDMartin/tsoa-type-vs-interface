import { json, urlencoded } from "body-parser";
import boxen from "boxen";
import detect from "detect-port";
import type { Express } from "express";
import express from "express";
import http from "http";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@generated/routes";
import swaggerJson from "@generated/swagger.json";

const configAppSettings = (app: Express): void => {
    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJson));
    app.use("/static/swagger", express.static("generated/swagger.json"));
    app.use(json(), urlencoded({ extended: true }));
    app.disable("x-powered-by");
};

const configAppRouter = (app: Express): void => {
    RegisterRoutes(app);
};

const startExpressServer = async (app: Express): Promise<void> => {
    const httpServer = http.createServer(app);
    // cleanly exit
    // See: https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
    process.on("SIGTERM", () => {
        console.info("SIGTERM signal received: closing HTTP server");
        httpServer.close(() => {
            console.info("HTTP server closed");
        });
    });

    const portChoose = await detect(8080).catch((err) => {
        console.error(err, "Failed to configure the port");
        throw err;
    });

    httpServer.listen({ port: portChoose }, () => {
        // eslint-disable-next-line no-console
        console.log(
            "\n" +
                boxen(
                    `Swagger documentation located at http://localhost:${portChoose}/doc`,
                    {
                        title: "SUCCESS",
                        padding: 1,
                        borderColor: "magenta",
                        titleAlignment: "center",
                    }
                )
        );
    });
};

const app = express();
configAppSettings(app);
configAppRouter(app);
startExpressServer(app).catch((err) =>
    console.error(err, "Application failed to start")
);
