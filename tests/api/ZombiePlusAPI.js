const { expect } = require("@playwright/test")

const fs = require('fs')
const path = require('path')
// const FormData = require('form-data')

export class ZombiePlusAPI {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async postAPIZombieGetToken(urlApi, adminEmail, adminName) {
        const urlSessions = urlApi + "/sessions"
        const response = await this.request.post(urlSessions, {
            data: {
                email: adminEmail,
                password: adminName
            }
        })
        expect(response.ok()).toBeTruthy

        const responseBody = await response.json()
        this.token = responseBody.token
        return this.token
    }

    async postAPIZombieCreateNewLead(urlApi, leadName, leadEmail) {
        const urlLeads = urlApi + "/leads"
        const response = await this.request.post(urlLeads, {
            data: {
                name: leadName,
                email: leadEmail
            }
        })
        return response
    }

    async postAPIZombieCreateNewMovie(urlApi, token, movie) {
        const urlMovies = urlApi + "/movies"

        const response = await this.request.post(urlMovies, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: '16fdc3d2-8fe3-4d9d-9d60-050c3d925c89',
                release_year: movie.release_year,
                featured: movie.featured
            }
        })
        return response

        // Resolução do ChatGPT que dá erro 500 na API:
        // const urlMovies = urlApi + "/movies";
        // const filePath = path.join(__dirname, '..', '..', 'tests', 'support', 'fixtures', movie.cover);
        // const fileBuffer = fs.readFileSync(filePath);

        // const response = await this.request.post(urlMovies, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         Accept: 'application/json, text/plain, */*'
        //     },
        //     multipart: {
        //         title: movie.title,
        //         overview: movie.overview,
        //         company_id: movie.company_id,
        //         release_year: movie.release_year.toString(),
        //         featured: movie.featured.toString(),
        //         cover: {
        //             name: 'cover',
        //             mimeType: 'image/png', // ou 'image/png' dependendo do seu arquivo
        //             buffer: fileBuffer,
        //         }
        //     }
        // })

        // return response;
    }
}
