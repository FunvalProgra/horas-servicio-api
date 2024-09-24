import { configDotenv } from "dotenv";

configDotenv();

/**  
    * @description: This file is used to store all the db config variables
*/

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME };
