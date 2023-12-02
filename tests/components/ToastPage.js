const { expect } = require("@playwright/test")

export class ToastPage {

    constructor(page) {
        this.page = page
        this.toast = page.locator(".toast")
    }

    async checkTtoastMessage(message) {
        await expect(this.toast).toHaveText(message)
    }

    async checkIfToastIsHidden() {
        await expect(this.toast).toBeHidden({ timeout: 5000 })
    }
}