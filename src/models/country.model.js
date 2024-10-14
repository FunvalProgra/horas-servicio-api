import { pool } from "../libs/pool.js";

export async function allCountries() {
  try {
    const query = "SELECT * FROM countries";
    const [res] = await pool.execute(query);
    return res;
  } catch (error) {
    throw error;
  }

}


export default { allCountries };