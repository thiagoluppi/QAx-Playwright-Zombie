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
    await page.getByRole("button", { name: "Aperte o play... se tiver coragem" }).click()
    await page.waitForTimeout(10000)
  })
})
