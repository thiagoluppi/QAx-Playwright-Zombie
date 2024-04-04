const { expect } = require("@playwright/test")

export class ToastComponent {

    constructor(page) {
        this.page = page
        this.toast = this.page.locator(".toast")
    }

    async checkToastMessage(message) {
        await expect(this.toast).toContainText(message)
    }

    async checkIfToastIsHidden() {
        await expect(this.toast).toBeHidden({ timeout: 10000 })
    }

    async waitForToastToDisappear() {
        await this.toast.waitFor({
            state: 'detached', // Aguarda até que o elemento não esteja mais presente no DOM
            timeout: 15000 // Especifica um timeout, por exemplo, 5000 milissegundos (5 segundos)
        }).catch(e => console.log('Toast message did not disappear within timeout', e))
    }
}
