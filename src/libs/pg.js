import pg from 'pg'
import { DB_HOST,DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from '../config/db.config.js'
 
const { Pool } = pg

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,

})



export { pool as pg }