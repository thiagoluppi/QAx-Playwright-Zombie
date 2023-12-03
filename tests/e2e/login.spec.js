// @ts-check
const { test } = require("@playwright/test")
const { LoginPage } = require("../pages/LoginPage")

require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA

test.beforeEach(async ({ page }) => {
  if (!LOGIN_PAGE) {
    throw new Error("LOGIN_PAGE is not defined in your env file")
  }
  await page.goto(LOGIN_PAGE)
})

test.describe('Login', () => {

  test('deve logar como adminstrador @temp', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.submitAdminCredencials(adminEmail, adminSenha)
   
    await loginPage.isLoggedIn()
  })
})
