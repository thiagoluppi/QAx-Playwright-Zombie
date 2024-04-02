// @ts-check
const { test } = require("@playwright/test")
const { LoginActions } = require("../actions/LoginActions")
const { MoviesActions } = require("../actions/MoviesActions")
const { ToastComponent } = require("../components/ToastComponent")
const { Database } = require("../database/Database")

const data = require("../support/fixtures/movies.json")


require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const MOVIES_PAGE = process.env.MOVIES_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA

const db = new Database()

const movie = data.movies

test.beforeEach(async ({ page }) => {
    const loginActions = new LoginActions(page)

    if (!LOGIN_PAGE) {
        throw new Error("LOGIN_PAGE is not defined in your env file")
    }
    await page.goto(LOGIN_PAGE)

    await loginActions.login(adminEmail, adminSenha)
    await loginActions.verifyLogin(MOVIES_PAGE, "Admin")
})

test.afterAll(async () => {
    await db.close()
})

test.describe('Movies', () => {

    test('deve cadastrar um filme @regression', async ({ page }) => {
        const moviesActions = new MoviesActions(page)
        const toastComponent = new ToastComponent(page)

        await db.deleteMovies()

        await moviesActions.addMovie(
            movie.exterminio.title,
            movie.exterminio.overview,
            movie.exterminio.company,
            movie.exterminio.release_year)

        const message = "Cadastro realizado com sucesso!"
        await toastComponent.checkToastMessage(message)
    })

    test('não deve cadastrar um filme sem os campos obrigatórios @regression', async ({ page }) => {
        const moviesActions = new MoviesActions(page)

        await db.deleteMovies()

        await moviesActions.navigateToAddMovie()
        await moviesActions.submitMovieRegistration()

        await moviesActions.verifyAlertMessage([
            'Por favor, informe o título.',
            'Por favor, informe a sinopse.',
            'Por favor, informe a empresa distribuidora.',
            'Por favor, informe o ano de lançamento.'
        ])
    })
})
