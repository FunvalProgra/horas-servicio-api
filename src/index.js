import express from "express";

import { APP_PORT } from "./config/app.config.js";
import routes from "./routes/index.js";
import { LogError, ErrorHandler } from "./middlewares/ErrorsHandler.js";
import cors from "cors";
const app = express();
app.use(cors(
    {
        origin: "*", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());

routes(app);
app.use(LogError);
app.use(ErrorHandler);


app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});