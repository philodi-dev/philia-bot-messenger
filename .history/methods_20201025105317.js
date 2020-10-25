const request = require('./requestPromise')

module.exports = class methods {
    constructor(access_token) {
        this.ACCESS_TOKEN = access_token
    }

    async sendText(text, id) {

        const json = {
            recipient: { id },
            message: { text }
        }

        const res = await request({
            url: 'https://graph.facebook.com/v8.0/me/messages',
            qs: {
                access_token: this.ACCESS_TOKEN
            },
            json,
            method: 'POST'
        })

        console.log('Facebook says: ', res)
    }

    async sendImageAttachment(image, id) {

        const json = {
            recipient: { id },
            message: { 
                type:"image",
                payload:{
                    url:image, 
                    is_reusable:true
                }
             }
        }

        const res = await request({
            url: 'https://graph.facebook.com/v8.0/me/messages',
            qs: {
                access_token: this.ACCESS_TOKEN
            },
            json,
            method: 'POST'
        })

        console.log('Facebook says: ', res)
    }
        

    getMessageObject(json) {
        const message = json.entry[0].messaging[0].message.text
        const id = json.entry[0].messaging[0].sender.id
        return {message, id}
    }
}