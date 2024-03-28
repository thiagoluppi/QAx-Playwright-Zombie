const { test: base } = require('@playwright/test')

const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page
        })
    }
})
