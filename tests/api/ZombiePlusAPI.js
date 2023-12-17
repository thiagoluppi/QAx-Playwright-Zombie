
export class ZombiePlusAPI {

    constructor(request) {
        this.request = request
    }

    async postAPIZombie(url, leadName, leadEmail) {
        const newLead = await this.request.post(url, {
            data: {
                name: leadName,
                email: leadEmail
            }
        })
        return newLead
    }
}