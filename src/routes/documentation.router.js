import { Router } from "express";

const documentation_router = Router();

import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger-output.json", "utf8"));
documentation_router.use('/', swaggerUi.serve);
documentation_router.get('/', swaggerUi.setup(swaggerDocument));

export default documentation_router