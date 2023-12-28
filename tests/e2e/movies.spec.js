// @ts-check
const { test } = require("@playwright/test")
const { LoginPage } = require("../pages/LoginPage")
const { MoviesPage } = require("../pages/MoviesPage")
// const { ToastComponent } = require("../components/ToastComponent")

require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA


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

        await moviesPage.addMovie("titulo do filme", "Sinopse do filme", "Netflix", "1970")
        await page.waitForTimeout(5000)
    })
})