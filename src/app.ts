import express from 'express';
import { configuration } from "./config/timeControlConfig.js";
import { errorHandler } from "./errorHandler/errorHandler.js";
import * as fs from "node:fs";
import morgan from "morgan";
import { accountRouter } from "./routes/accountRouter.js";
import { timeControlRouter } from "./routes/timeControlRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../docs/openapi.json" with { type: "json" };

export const launchServer = () => {
    const app = express();

    app.listen(configuration.port, () => {
        console.log(`✅ Server runs at http://localhost:${configuration.port}`);
        console.log(`📄 Swagger UI available at http://localhost:${configuration.port}/docs`);

        const logStream = fs.createWriteStream('access.log', { flags: 'a' });
        const errorStream = fs.createWriteStream('error.log', { flags: 'a' });

        // ====== Middlewares ======
        app.use(express.json());
        app.use(morgan('dev'));
        app.use(morgan('combined', { stream: logStream }));

        // ====== Swagger ======
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

        // ====== Routers ======
        app.use('/accounts', accountRouter);
        app.use('/shifts', timeControlRouter);

        // ====== Error handler ======
        app.use(errorHandler(errorStream));
    });
};
