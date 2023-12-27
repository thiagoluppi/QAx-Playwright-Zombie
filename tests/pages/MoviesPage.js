const { expect } = require("@playwright/test")

export class MoviesPage {
    constructor(page) {
        this.page = page
        this.addContentButton = this.page.locator("a[href$='register']")
        this.fieldsPanel = this.page.locator(".fields")
        this.movieTitleInputField = this.fieldsPanel.locator("input[name=title]")
        this.overviewField = this.fieldsPanel.locator("textarea[name=overview]")
    }

    async addMovie(title, overview, company, release_year) {
        await this.addContentButton.click()

        await this.movieTitleInputField.click()
        await this.movieTitleInputField.fill(title)

        await this.overviewField.click()
        await this.overviewField.fill(overview)

    }
}
