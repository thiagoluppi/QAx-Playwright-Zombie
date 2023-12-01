// @ts-check
const { test, expect } = require("@playwright/test")

require('dotenv').config()

const BASE_URL = process.env.BASE_URL

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in your env file");
  }
  await page.goto(BASE_URL)
})

test.describe('Adicionando Leads', () => {

  test('deve cadastrar um lead na fila de espera @regression', async ({ page }) => {
    await page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(page.getByTestId("modal")
      .getByRole("heading"))
      .toHaveText("Fila de espera")

    await page.getByPlaceholder("Informe seu nome").fill("Thiago M. Luppi")
    await page.getByPlaceholder("Informe seu email").fill("softykitty@icloud.com")

    await page.getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click()

    // Explicação no README.md
    // await page.getByText("seus dados conosco").click()
    // const content = await page.content()
    // console.log(content)

    const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
    await expect(page.locator(".toast")).toHaveText(message)

    await expect(page.locator(".toast")).toBeHidden({ timeout: 5000 })

    // await page.waitForTimeout(5000)
  })

  test('não deve cadastrar com e-mail incorreto @regression', async ({ page }) => {
    await page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(page.getByTestId("modal")
      .getByRole("heading"))
      .toHaveText("Fila de espera")

    await page.getByPlaceholder("Informe seu nome").fill("Thiago M. Luppi")
    await page.getByPlaceholder("Informe seu email").fill("softykitty.com")

    await page.getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click()

    await expect(page.locator(".alert")).toHaveText("Email incorreto")
  })

  test('não deve cadastrar com campo nome vazio @regression', async ({ page }) => {
    await page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(page.getByTestId("modal")
      .getByRole("heading"))
      .toHaveText("Fila de espera")

    // await page.getByPlaceholder("Informe seu nome").fill("Thiago M. Luppi")
    await page.getByPlaceholder("Informe seu email").fill("softykitty@icloud.com")

    await page.getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click()

    await expect(page.locator(".alert")).toHaveText("Campo obrigatório")
  })

  test('não deve cadastrar com campo e-mail vazio @regression', async ({ page }) => {
    await page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(page.getByTestId("modal")
      .getByRole("heading"))
      .toHaveText("Fila de espera")

    await page.getByPlaceholder("Informe seu nome").fill("Thiago M. Luppi")
    // await page.getByPlaceholder("Informe seu email").fill("softykitty@icloud.com")

    await page.getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click()

    await expect(page.locator(".alert")).toHaveText("Campo obrigatório")
  })

  test('não deve cadastrar com ambos os campos nome e e-mail vazios @regression', async ({ page }) => {
    await page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(page.getByTestId("modal")
      .getByRole("heading"))
      .toHaveText("Fila de espera")

    // await page.getByPlaceholder("Informe seu nome").fill("Thiago M. Luppi")
    // await page.getByPlaceholder("Informe seu email").fill("softykitty@icloud.com")

    await page.getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click()

    await expect(page.locator(".alert")).toHaveText([
      "Campo obrigatório",
      "Campo obrigatório"
    ])
  })
})


