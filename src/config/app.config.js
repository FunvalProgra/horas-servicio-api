import { configDotenv } from "dotenv";

configDotenv();

/** 
 * @description: This file is used to store all the environment variables
 */
const SECRRET_KEY = process.env.SECRET_KEY;
const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL
const PRIVATE_KEY = process.env.PRIVATE_KEY

export { SECRRET_KEY, APP_PORT, APP_HOST, CLIENT_EMAIL, PRIVATE_KEY };
