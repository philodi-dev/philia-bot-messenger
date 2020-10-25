const Restify = require('restify')
const methods = require('./methods')

const app = Restify.createServer({
    name: 'philia recipe engine'
})

const token = 'abc12345'
const bot = new methods('EAANz0eBh2w8BANf1PMdNdruoYmHScelZCDkpDCFMoZAdcvgaa7pHeOKsxLDEIN9vDaDoEZAHfK9GcsQdjFe2GTG32z1oCw7FxWZA9AFW34H2LQp1Opx9b7fQZBC3cyntPfriqDUmEYBm1VG2i60tZBHtBZABN6Wl5RTuw7TGlm7p33Gv20W5zCKwLsBYW9ljysZD')

app.use(Restify.plugins.jsonp())
app.use(Restify.plugins.bodyParser())

app.get('/', (req, res, next) => {
    console.log(req.query['hub.mode'])
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token) {
        res.end(req.query['hub.challenge'])
    } else {
        next()
    }
})

app.post('/', (req, res, next) => {
    const response = req.body
    if(response.object === "page") {
        const messageObj = bot.getMessageObject(response)
        bot.sendText(`You said: ${messageObj.message}`, messageObj.id)
    }
    res.send(200)
})

app.listen(8081)
