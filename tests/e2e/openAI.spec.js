// @ts-check
const { test } = require("@playwright/test")
const { LoginActions } = require("../support/actions/LoginActions")
const { ToastComponent } = require("../components/ToastComponent")

require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const MOVIES_PAGE = process.env.MOVIES_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA
const ChatGPTKey = process.env.OPENAI_API_KEY

test.beforeEach(async ({ page }) => {
    if (!LOGIN_PAGE) {
        throw new Error("LOGIN_PAGE is not defined in your env file")
    }
    await page.goto(LOGIN_PAGE)
})

test.describe('Login', () => {

    test('deve logar como adminstrador @regression', async ({ page }) => {
        const loginActions = new LoginActions(page)

        await loginActions.login(adminEmail, adminSenha)
        await loginActions.verifyLogin(MOVIES_PAGE, "Admin")
    })
})