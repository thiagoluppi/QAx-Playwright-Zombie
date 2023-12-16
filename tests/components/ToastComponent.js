const { expect } = require("@playwright/test")

export class ToastComponent {

    constructor(page) {
        this.page = page
        this.toast = this.page.locator(".toast")
    }

    async checkToastMessage(message) {
        await expect(this.toast).toHaveText(message)
    }

    async checkIfToastIsHidden() {
        await expect(this.toast).toBeHidden({ timeout: 10000 })
    }
}