import { configDotenv } from "dotenv";

configDotenv();

/**  
    * @description: This file is used to store all the db config variables
*/

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

export { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT };
