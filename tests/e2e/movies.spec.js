// @ts-check
const { test } = require("@playwright/test")
const { LoginPage } = require("../pages/LoginPage")
const { MoviesPage } = require("../pages/MoviesPage")
const { ToastComponent } = require("../components/ToastComponent")
const { Database } = require("../database/Database")

const data = require("../support/fixtures/movies.json")


require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA

const movie = data.movies

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)

    if (!LOGIN_PAGE) {
        throw new Error("LOGIN_PAGE is not defined in your env file")
    }
    await page.goto(LOGIN_PAGE)

    await loginPage.submitAdminCredencials(adminEmail, adminSenha)
})

test.describe('Movies', () => {

    test('deve cadastrar um filme @temp', async ({ page }) => {
        const moviesPage = new MoviesPage(page)
        const toastComponent = new ToastComponent(page)
        const db = new Database()

        console.log(await db.deleteMovies())

        await moviesPage.addMovie(
            movie.exterminio.title,
            movie.exterminio.overview,
            movie.exterminio.company,
            movie.exterminio.release_year)

        const message = "Cadastro realizado com sucesso!"
        await toastComponent.checkToastMessage(message)
    })
})