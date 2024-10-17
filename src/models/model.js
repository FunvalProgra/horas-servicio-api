import { pg } from "../libs/pg.js"; 

export class Model {
    table = '';
     constructor() {
        if (!this.table) {
            let c_name = this.constructor.name;
            const lastChar = c_name[c_name.length - 1];

            if (lastChar === 'y') {
                c_name = c_name.slice(0, -1);
                this.table = `${c_name}ies`;
            } else if (lastChar === 's') {
                this.table = `${c_name}es`;
            } else {
                this.table = `${c_name}s`;
            }
        }

       this.client = pg;

    }

    async all() {
        try {
            const query = `SELECT * FROM ${this.table}`;
            const res = await pg.query(query);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    async get(id) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE id= $1`;
            const { rows } = await pg.query(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const fields = Object.keys(data).join(',');
            const values = Object.values(data).map((_, i) => `$${i + 1}`).join(',');
            const query = `INSERT INTO ${this.table} (${fields}) VALUES (${values}) RETURNING *`;
            const res = await pg.query(query, Object.values(data));
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const fields = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(',');
            const query = `UPDATE ${this.table} SET ${fields} WHERE id = $${Object.keys(data).length + 1} RETURNING *`;
            console.log(Object.values(data));
            const res = await pg.query(query, [...Object.values(data), id]);
            return res;  
        } catch (error) {
            throw error;
        }
    }

    async remove(id) {
        try {
            const query = `DELETE FROM ${this.table} WHERE id = ?`;
            const [res] = await pg.query(query, [id]);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async find(data) {
        try {
            const query = `SELECT * FROM ${this.table} WHERE ${Object.keys(data).map(key => `${key} = ?`).join(' AND ')}`;
            const res = await pg.query(query, Object.values(data));
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    async query(query, data) {
        try {
            const res = await pg.query(query, data);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }



}
