
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

    async sendQueries(text, params) {
        try {
            const start = Date.now()
            const res = await this.pool.query(text, params)
            const duration = Date.now() - start
            console.log('executed query', { text, duration, rows: res.rowCount })
            return res
        } catch (error) {
            console.error('Error executing query', { text, error: error.message })
            // Pode lançar o erro novamente ou lidar com ele de outra maneira
            throw error
        }
    }

    async getLeads() {
        const res = await this.sendQueries("SELECT * FROM public.leads")
        return res.rows
    }

    async getALead(leadName) {
        // Note que o placeholder para o parâmetro é $1 e não há interpolação na string da consulta
        const res = await this.sendQueries("SELECT id FROM public.leads WHERE name = $1;", [leadName])
        return res
    }

    async deleteLeads() {
        const res = await this.sendQueries("DELETE FROM public.leads")
    }

    async deleteMovies() {
        const res = await this.sendQueries("DELETE FROM public.movies")
    }

    async close() {
        await this.pool.end()
    }
}
