const { expect } = require("@playwright/test")

export class LoginActions {

    constructor(page) {
        this.page = page
        this.loginForm = this.page.locator(".login-form")
        this.emailField = this.loginForm.getByPlaceholder("E-mail")
        this.senhaField = this.loginForm.getByPlaceholder("Senha")
        this.entrarBt = this.loginForm.getByText("Entrar")

        this.loginFormAlert = this.loginForm.locator("span[class$=alert]")

        this.loggedUser = this.page.locator(".logged-user")
    }

    // Método para preencher o formulário de login
    async fillLoginForm(email, password) {
        await this.emailField.fill(email)
        await this.senhaField.fill(password)
    }

    // Método para submeter o formulário de login
    async submitLoginForm() {
        await this.entrarBt.click()
    }

    // Combinação de ações: Preencher e submeter o formulário de login
    async login(email, password) {
        await this.fillLoginForm(email, password)
        await this.submitLoginForm()
        // Espera pela mudança de estado da página para confirmar o login
        await this.page.waitForLoadState("domcontentloaded")
    }

    // Verifica se o usuário está logado verificando a visibilidade do botão de entrar
    async verifyLogin(expectedUrl, loggedUser) {
        await expect(this.entrarBt).not.toBeVisible()
        await expect(this.page).toHaveURL(expectedUrl)
        await expect(this.loggedUser).toHaveText(`Olá, ${loggedUser}`)
    }

    // Verifica o texto de alerta no formulário de login
    async verifyLoginFormAlert(text) {
        await expect(this.loginFormAlert).toHaveText(text)
    }
}
