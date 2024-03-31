const { expect } = require("@playwright/test")

export class LandingPage {

    constructor(page) {
        this.page = page
        this.botaoApertePlay = this.page.getByRole("button", { name: /Aperte o play/ })
        this.filaDeEsperaModal = this.page.getByTestId("modal")
        this.filaDeEsperaModalHeading = this.filaDeEsperaModal.getByRole("heading")
        this.informeSeuNomeField = this.filaDeEsperaModal.getByPlaceholder("Informe seu nome")
        this.informeSeuEmailField = this.filaDeEsperaModal.getByPlaceholder("Informe seu email")
        this.queroEntrarNaFilaBt = this.filaDeEsperaModal.getByText("Quero entrar na fila!")
        this.landingPageAlert = this.filaDeEsperaModal.locator(".alert")
    }

    async clicarNoBotaoAperteOPlay() {
        await this.botaoApertePlay.click()
        await expect(this.filaDeEsperaModalHeading).toHaveText("Fila de espera")
    }

    async cadastrarNovoLead(nome, email) {
        await this.informeSeuNomeField.fill(nome)
        await this.informeSeuEmailField.fill(email)

        await this.queroEntrarNaFilaBt.click()
    }

    async checkAlertText(text) {
        await expect(this.landingPageAlert).toHaveText(text)
    }
}