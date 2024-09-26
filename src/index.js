import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

import { APP_PORT } from "./config/app.config.js";
import routes from "./routes/index.js";
import { LogError, ErrorHandler } from "./middlewares/ErrorsHandler.js";

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger-output.json", "utf8"));

// const router = require('express').Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
routes(app);
app.use(LogError);
app.use(ErrorHandler);


app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});