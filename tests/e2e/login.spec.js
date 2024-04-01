// @ts-check
const { test } = require("@playwright/test")
const { Login } = require("../actions/Login")
const { ToastComponent } = require("../components/ToastComponent")

require('dotenv').config()

const LOGIN_PAGE = process.env.LOGIN_PAGE
const MOVIES_PAGE = process.env.MOVIES_PAGE
const adminEmail = process.env.ADMIN_EMAIL
const adminSenha = process.env.ADMIN_SENHA
const adminSenhaIncorreta = process.env.ADMIN_SENHA_INCORRETA
const adminEmailVazio = process.env.ADMIN_EMAIL_VAZIO
const adminSenhaVazio = process.env.ADMIN_SENHA_VAZIO
const adminEmailInvalido = process.env.ADMIN_EMAIL_INVALIDO

test.beforeEach(async ({ page }) => {
  if (!LOGIN_PAGE) {
    throw new Error("LOGIN_PAGE is not defined in your env file")
  }
  await page.goto(LOGIN_PAGE)
})

test.describe('Login', () => {

  test('deve logar como adminstrador @regression', async ({ page }) => {
    const login = new Login(page)

    await login.login(adminEmail, adminSenha)
    await login.verifyLogin(MOVIES_PAGE)
  })

  test('não deve logar com senha incorreta @regression', async ({ page }) => {
    const login = new Login(page)
    const toastComponent = new ToastComponent(page)

    await login.login(adminEmail, adminSenhaIncorreta)

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await toastComponent.checkToastMessage(message)
  })

  test('não deve logar com campo email inválido @regression', async ({ page }) => {
    const login = new Login(page)

    await login.login(adminEmailInvalido, adminSenha)

    await login.verifyLoginFormAlert("Email incorreto")
  })

  test('não deve logar com campo email vazio @regression', async ({ page }) => {
    const login = new Login(page)

    await login.login(adminEmailVazio, adminSenha)

    await login.verifyLoginFormAlert("Campo obrigatório")
  })

  test('não deve logar com campo senha vazio @regression', async ({ page }) => {
    const login = new Login(page)

    await login.login(adminEmail, adminSenhaVazio)

    await login.verifyLoginFormAlert("Campo obrigatório")
  })

  test('não deve logar quando nenhum campo é preenchido @regression', async ({ page }) => {
    const login = new Login(page)

    await login.login(adminEmailVazio, adminSenhaVazio)

    await login.verifyLoginFormAlert(["Campo obrigatório", "Campo obrigatório"])
  })
})