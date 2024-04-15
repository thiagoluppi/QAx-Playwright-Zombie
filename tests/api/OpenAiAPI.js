const { Configuration, OpenAIApi } = require("openai")
const fetch = require("node-fetch")

export class OpenAiAPI {
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })
        this.openai = new OpenAIApi(configuration)
    }

    async fetchHTML(url) {
        try {
            const response = await fetch(url)
            return await response.text()
        } catch (error) {
            console.error('Error fetching HTML:', error)
            return null
        }
    }

    async generateTestsForPage(url) {
        const html = await this.fetchHTML(url)
        if (!html) {
            console.error('Failed to fetch HTML for url:', url)
            return
        }

        const response = await this.openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Generate Playwright e2e tests for the following HTML page: ${html}`,
            max_tokens: 1000
        })

        return response.data.choices[0].text
    }

    async saveTestsToFile(url, filePath) {
        const tests = await this.generateTestsForPage(url)
        if (!tests) {
            console.error('Failed to generate tests')
            return
        }

        const fs = require('fs')
        fs.writeFileSync(filePath, tests)
        console.log(`Tests written to ${filePath}`)
    }
}
