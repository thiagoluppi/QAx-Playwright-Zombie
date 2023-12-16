
const { Pool } = require("pg")
require("dotenv").config()

export class Database {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
        })
    }

    async query(text, params) {
        const start = Date.now()
        const res = await this.pool.query(text, params)
        const duration = Date.now() - start
        console.log('executed query', { text, duration, rows: res.rowCount })
        return res
    }

    async getLeads() {
        const res = await this.query("SELECT * FROM public.leads")
        return res.rows
    }

    async getALead(leadName) {
        // Note que o placeholder para o parâmetro é $1 e não há interpolação na string da consulta
        const res = await this.query("SELECT id FROM public.leads WHERE name = $1;", [leadName]);
        return res
    }


    async deleteLeads() {
        const res = await this.query("DELETE FROM public.leads")
        return res.rows
    }

    async close() {
        await this.pool.end()
    }
}
