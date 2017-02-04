// server.js


/* ============= Base serup ============= */

var express         = require('express')
var app             = express()
var compress        = require('compression')
var config          = require('./config')


app.set('view engine', 'html')
app.set('views', config.staticFolder)


/* ============= Routers ============= */
var RedirectRouter = express.Router()
RedirectRouter.get('/*', function(req, res, next)
{
    if (req.headers.host.match(/^www/) !== null )
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url)
    else
        next()
})

var StaticRouter = express.Router()
StaticRouter.get(['/', '/articles'], function(req, res)
{
    res.sendfile('index.html', {root: config.staticFolder})
})


var ApiRouter = express.Router()
ApiRouter.get('/articles/', function(req, res, next)
{
    res.sendfile('articles.json', {root: 'backend/'})
})


app.use(compress({level: 9}))        // Use Gzip compression
app.use('', RedirectRouter)          // Redirect www to canonial
app.use('/', StaticRouter)           // Try to find a static site
app.use('/api/', ApiRouter)
app.use(express.static(config.staticFolder))



/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 80)
