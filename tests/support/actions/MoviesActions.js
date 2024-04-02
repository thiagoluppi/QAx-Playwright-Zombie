const { expect } = require("@playwright/test")

export class MoviesActions {
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

        this.escolherArquivoBt = this.page.locator("input[name=cover]")

        this.cadastrarButton = this.page.getByRole("button", { name: "Cadastrar" })

        this.moviesPageAlert = this.page.locator(".alert")
    }

    async navigateToAddMovie() {
        await this.addContentButton.click()
    }

    async fillMovieDetails(title, overview) {
        await this.movieTitleInputField.fill(title)
        await this.overviewField.fill(overview)
    }

    async selectCompany(company) {
        await this.companyComboIndicatorArrow.click()
        await this.companyList.filter({ hasText: company }).click()
    }

    async selectReleaseYear(release_year) {
        await this.yearsComboIndicatorArrow.click()
        await this.yearsList.filter({ hasText: release_year }).click()
    }

    async uploadCover(cover) {
        this.escolherArquivoBt.setInputFiles("tests/support/fixtures" + cover)
    }

    async submitMovieRegistration() {
        await this.cadastrarButton.click()
    }

    async verifyAlertMessage(text) {
        await expect(this.moviesPageAlert).toHaveText(text)
    }

    // Método que combina todas as ações para adicionar um filme
    async addMovie(movie) {
        await this.navigateToAddMovie()
        await this.fillMovieDetails(movie.title, movie.overview)
        await this.selectCompany(movie.company)
        await this.selectReleaseYear(movie.release_year)
        await this.uploadCover(movie.cover)
        await this.submitMovieRegistration()
    }
}
