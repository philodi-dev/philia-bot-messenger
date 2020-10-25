const Restify = require('restify')
const methods = require('./methods')

let PORT = process.env.PORT || 8001;

const app = Restify.createServer({
    name: 'philia recipe engine'
})

const token = 'abc12345'
const bot = new methods('EAANz0eBh2w8BANf1PMdNdruoYmHScelZCDkpDCFMoZAdcvgaa7pHeOKsxLDEIN9vDaDoEZAHfK9GcsQdjFe2GTG32z1oCw7FxWZA9AFW34H2LQp1Opx9b7fQZBC3cyntPfriqDUmEYBm1VG2i60tZBHtBZABN6Wl5RTuw7TGlm7p33Gv20W5zCKwLsBYW9ljysZD')

app.use(Restify.plugins.bodyParser({ limit: '50mb' }))
app.use(Restify.plugins.jsonp())

app.get('/', (req, res, next) => {
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token) {
        res.end(req.query['hub.challenge'])
    } else {
        next()
    }
})


app.post('/', (req, res, next) => {
    const response = req.body
    const welcomeMessage = ['Welcome to philia, your personal food recommendation assistant. you can search for a special diet meal planning by saying, Can I get a high-protein  meal, please ?  or just say , Can you search for a burger recipe ? or ask for help',]
    if(response.object === "page") {
        const messageObj = bot.getMessageObject(response)
        bot.sendText(`You said: ${messageObj.message}`, messageObj.id)
    }
    res.send(200)
})

app.listen(PORT, () =>
    console.log('Server en écoute sur:' + PORT)
);