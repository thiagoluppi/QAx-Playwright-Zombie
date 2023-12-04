const { expect } = require("@playwright/test")

export class LoginPage {

    constructor(page) {
        this.page = page
        this.loginForm = this.page.locator(".login-form")
        this.emailField = this.loginForm.getByPlaceholder("E-mail")
        this.senhaField = this.loginForm.getByPlaceholder("Senha")
        this.entrarBt = this.loginForm.getByText("Entrar")

        this.loginFormAlert = this.loginForm.locator("span[class$=alert]")
    }

    async submitAdminCredencials(email, password) {
        await this.emailField.fill(email)
        await this.senhaField.fill(password)
        await this.entrarBt.click()
    }

    async isLoggedIn() {
        await this.page.waitForLoadState("domcontentloaded")
        await expect(this.entrarBt).not.toBeVisible()
    }

    async checkLoginFormAlertText(text) {
        await expect(this.loginFormAlert).toHaveText(text)
    }
}