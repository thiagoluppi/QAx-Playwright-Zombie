const { expect } = require("@playwright/test")

export class MoviesPage {
    constructor(page) {
        this.page = page
        this.addContentButton = this.page.locator("a[href$='register']")

        this.fieldsPanel = this.page.locator(".fields")
        this.movieTitleInputField = this.fieldsPanel.locator("input[name=title]")
        this.overviewField = this.fieldsPanel.locator("textarea[name=overview]")

        this.companyCombo = this.fieldsPanel.locator("#select_company_id")
        this.companyComboIndicatorArrow = this.companyCombo.locator(".react-select__indicator")
        this.companyList = this.companyCombo.locator(".react-select__menu .react-select__menu-list .react-select__option")

        this.yearsCombo = this.fieldsPanel.locator("#select_year")
        this.yearsComboIndicatorArrow = this.yearsCombo.locator(".react-select__indicator")
        this.yearsList = this.yearsCombo.locator(".react-select__menu .react-select__menu-list .react-select__option")

        this.cadastrarButton = this.page.getByRole("button", { name: "Cadastrar" })

        this.moviesPageAlert = this.page.locator(".alert")
    }

    async addMovieButtonClick() {
        this.addContentButton.click()
    }

    async cadastrarButtonClick() {
        this.cadastrarButton.click()
    }

    async alertHaveText(text) {
        await expect(this.moviesPageAlert).toHaveText(text)
    }

    async addMovie(title, overview, company, release_year) {
        await this.addMovieButtonClick()

        await this.movieTitleInputField.click()
        await this.movieTitleInputField.fill(title)

        await this.overviewField.click()
        await this.overviewField.fill(overview)

        await this.companyComboIndicatorArrow.click()
        await this.companyList.filter({ hasText: company }).click()

        await this.yearsComboIndicatorArrow.click()
        await this.yearsList.filter({ hasText: release_year }).click()

        await this.cadastrarButtonClick()
    }
}
