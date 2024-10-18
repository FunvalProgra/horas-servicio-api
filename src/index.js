import express from "express";

import { APP_PORT } from "./config/app.config.js";
import routes from "./routes/index.js";
import { LogError, ErrorHandler } from "./middlewares/ErrorsHandler.js";

const app = express();
app.use(express.json());

routes(app);
app.use(LogError);
app.use(ErrorHandler);


app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});