// @ts-check
const { test, expect } = require("@playwright/test")
const { LandingPage } = require("../pages/LandingPage")
const { ToastComponent } = require("../components/ToastComponent")
const { Database } = require("../database/Database")
const { ZombiePlusAPI } = require("../api/ZombiePlusAPI")

const { faker } = require("@faker-js/faker")

require('dotenv').config()

const LANDING_PAGE = process.env.LANDING_PAGE
const nome = process.env.NOME
const email = process.env.EMAIL
const emailIncorreto = process.env.EMAIL_INCORRETO
const nomeVazio = process.env.NOME_VAZIO
const emailVazio = process.env.EMAIL_VAZIO
const APIUrl = process.env.API_URL

test.beforeEach(async ({ page }) => {
  if (!LANDING_PAGE) {
    throw new Error("LANDING_PAGE is not defined in your env file")
  }
  await page.goto(LANDING_PAGE)
})

test.describe('Adicionando Leads', () => {
  // Se algum teste falhar, ele repete mais uma vez:
  // test.describe.configure({ retries: 2 })

  test('deve cadastrar um lead na fila de espera @regression', async ({ page }) => {

    const db = new Database()

    console.log(await db.deleteLeads())

    const landingPage = new LandingPage(page)
    const toastComponent = new ToastComponent(page)

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(nome, email)

    const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
    await toastComponent.checkToastMessage(message)

    await toastComponent.checkIfToastIsHidden()

    console.log(await db.getLeads())
  })



  test('não deve cadastrar um lead quando o e-mail já existe @temp', async ({ page, request }) => {
    const landingPage = new LandingPage(page)
    const toastComponent = new ToastComponent(page)
    const zombiePlusAPI = new ZombiePlusAPI(request)

    const db = new Database()

    console.log(await db.deleteLeads())

    // const leadName = faker.person.fullName()
    // const leadEmail = faker.internet.email()

    const newLead = await zombiePlusAPI.postAPIZombie(APIUrl, nome, email)

    expect(newLead.ok()).toBeTruthy()

    await landingPage.clicarNoBotaoAperteOPlay()
    await landingPage.cadastrarNovoLead(nome, email)

    const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
    await toastComponent.checkToastMessage(message)

    await toastComponent.checkIfToastIsHidden()
  })

  test('deve cadastrar um lead na fila de espera usando faker @regression', async ({ page }) => {
    const landingPage = new LandingPage(page)
    const toastComponent = new ToastComponent(page)

    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

    await landingPage.clicarNoBotaoAperteOPlay()

    await landingPage.cadastrarNovoLead(leadName, leadEmail)

    // Explicação no README.md para pegar o html do Toast explicado pelo professor na aula - Elementos Flutuantes.
    // await page.getByText("seus dados conosco").click()
    // const content = await page.content()
    // console.log(content)

    const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
    await toastComponent.checkToastMessage(message)

    await toastComponent.checkIfToastIsHidden()
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
