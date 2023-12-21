const { expect } = require("@playwright/test")

export class MoviesPage {
    constructor(page) {
        this.page = page
        this.addContentButton = this.page.locator("a[href$='register']")
    }

    async addMovie(title, overview, company, release_year) {
        await this.addContentButton.click()

    }
}
