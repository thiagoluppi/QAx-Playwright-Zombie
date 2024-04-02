const { expect } = require("@playwright/test")

export class LeadActions {

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

    // Ação para iniciar o processo de cadastro de lead
    async iniciarCadastroLead() {
        await this.botaoApertePlay.click()
        await expect(this.filaDeEsperaModalHeading).toHaveText("Fila de espera")
    }

    // Ação para preencher informações do lead
    async preencherInformacoesLead(nome, email) {
        await this.informeSeuNomeField.fill(nome)
        await expect(this.informeSeuNomeField).toHaveValue(nome)

        await this.informeSeuEmailField.fill(email)
        await expect(this.informeSeuEmailField).toHaveValue(email)
    }

    // Ação para finalizar o cadastro do lead
    async finalizarCadastroLead() {
        await this.queroEntrarNaFilaBt.click()
    }

    // Combinação de ações para cadastrar um novo lead
    async cadastrarNovoLead(nome, email) {
        await this.iniciarCadastroLead()
        await this.preencherInformacoesLead(nome, email)

        try {
            // Tenta realizar as checagens dos valores dos campos
            await expect(this.informeSeuNomeField).toHaveValue(nome)
            await expect(this.informeSeuEmailField).toHaveValue(email)
        } catch (error) {
            // Captura e trata erros que possam ocorrer durante as checagens
            console.error("Erro ao verificar os valores dos campos: ", error)
            throw new Error("Falha na verificação dos valores dos campos de cadastro de lead.")
        }

        await this.finalizarCadastroLead()
    }

    // Verificação do texto de alerta na landing page
    async verificarTextoAlerta(text) {
        await expect(this.landingPageAlert).toHaveText(text)
    }
}