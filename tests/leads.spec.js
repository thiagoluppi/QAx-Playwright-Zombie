// @ts-check
const { test } = require("@playwright/test")
const { LandingPage } = require("./pages/LandingPage")
const { ToastPage } = require("./components/ToastPage")

require('dotenv').config()

const BASE_URL = process.env.BASE_URL
const nome = process.env.NOME
const email = process.env.EMAIL
const emailIncorreto = process.env.EMAIL_INCORRETO
const nomeVazio = process.env.NOME_VAZIO
const emailVazio = process.env.EMAIL_VAZIO

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in your env file");
  }
  await page.goto(BASE_URL)
})

test.describe('Adicionando Leads', () => {

  test('deve cadastrar um lead na fila de espera @regression', async ({ page }) => {
    const landingPage = new LandingPage(page)
    const toastPage = new ToastPage(page)

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(nome, email)

    // Explicação no README.md para pegar o html do Toast explicado pelo professor na aula - Elementos Flutuantes.
    // await page.getByText("seus dados conosco").click()
    // const content = await page.content()
    // console.log(content)

    const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
    await toastPage.checkTtoastMessage(message)

    await toastPage.checkIfToastIsHidden()
  })

  test('não deve cadastrar com e-mail incorreto @regression', async ({ page }) => {
    const landingPage = new LandingPage(page)

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(nome, emailIncorreto)

    await landingPage.checkAlertText("Email incorreto")
  })

  test('não deve cadastrar com campo nome vazio @regression', async ({ page }) => {
    const landingPage = new LandingPage(page)

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(nomeVazio, email)

    await landingPage.checkAlertText(["Campo obrigatório"])
  })

  test('não deve cadastrar com campo e-mail vazio @regression', async ({ page }) => {
    const landingPage = new LandingPage(page)

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(nome, emailVazio)

    await landingPage.checkAlertText(["Campo obrigatório"])
  })

  test('não deve cadastrar com ambos os campos nome e e-mail vazios @regression', async ({ page }) => {
    const landingPage = new LandingPage(page)

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(nomeVazio, emailVazio)

    await landingPage.checkAlertText([
      "Campo obrigatório",
      "Campo obrigatório"
    ])
  })
})
