// @ts-check
const { test } = require("@playwright/test")
const { LoginActions } = require("../support/actions/LoginActions")
const { MoviesActions } = require("../support/actions/MoviesActions")
const { ToastComponent } = require("../components/ToastComponent")
const { Database } = require("../database/Database")

const data = require("../support/fixtures/movies.json")


require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const MOVIES_PAGE = process.env.MOVIES_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA

const db = new Database()

const movies = data.movies

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

        await moviesActions.addMovie(movies.guerra_mundial_z)

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

    test('não deve cadastrar um filme repetido @regression', async ({ page }) => {
        const moviesActions = new MoviesActions(page)
        const toastComponent = new ToastComponent(page)
        let message = "Cadastro realizado com sucesso!"

        await db.deleteMovies()

        await moviesActions.addMovie(movies.guerra_mundial_z)
        await toastComponent.checkToastMessage(message)

        await toastComponent.waitForToastToDisappear()

        message = "Este conteúdo já encontra-se cadastrado no catálogo"

        await moviesActions.addMovie(movies.guerra_mundial_z)
        await toastComponent.checkToastMessage(message)
    })

    test('cadastrando todos os filmes do arquivo @temp', async ({ page }) => {
        const moviesActions = new MoviesActions(page)
        const toastComponent = new ToastComponent(page)

        await db.deleteMovies()

        for (const movieKey in movies) {
            const movie = movies[movieKey]
            await moviesActions.addMovie(movie)

            const message = "Cadastro realizado com sucesso!"
            await toastComponent.checkToastMessage(message)

            // Aguardar a mensagem de sucesso desaparecer antes de proceder, se necessário
            // Isso pode ser importante para evitar sobreposições de mensagens ou estados de UI que podem interferir no cadastro do próximo filme
            // Exemplo (ajuste conforme a necessidade):
            // await toastComponent.waitForToastToDisappear()
        }
    })
})
