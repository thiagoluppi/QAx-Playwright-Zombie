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

test.describe('Adding Leads', () => {
  test('deve cadastrar um lead na fila de espera @temp', async ({ page }) => {
    await page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(page.getByTestId("modal")
      .getByRole("heading"))
      .toHaveText("Fila de espera")

    await page.getByPlaceholder("Seu nome completo").fill("Thiago M. Luppi")
    await page.getByPlaceholder("Seu email principal").fill("softykitty@icloud.com")

    await page.waitForTimeout(10000)
  })
})
