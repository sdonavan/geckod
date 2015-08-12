// server.js


/* ============= Base serup ============= */

var express         = require('express')
var cache           = require('apicache').options({ debug: true }).middleware
var compress        = require('compression')
var swig            = require('swig')
var moment          = require('moment') // For date parsing
var model           = require('./backend/model')

var app             = express()

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/ui/')



/* ============= Redirect www to canonial version ========= */
var RedirectRouter = express.Router()
RedirectRouter.get('/*', function(req, res, next)
{
    if (req.headers.host.match(/^www/) !== null )
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url)
    else
        next()
})


/* ============= Cache Headers ============ */
var setHeaders = function (req, res, next)
{
    res.setHeader('Cache-Control', 'public, max-age=31557600')
    next()
}



/* ============= Rest Router ============= */
var APIRouter = express.Router()

APIRouter.get('/work/',function (req, res)
{
    //
})


/* ============= Static Router =========== */
var StaticRouter = express.Router()
StaticRouter.get(['/', '/articles/', '/articles/*'], function(req, res)
{
    model.getAllArticles(function(articles)
    {
        articles.forEach(function(a)
        {
            if (a['date'])
                a['date'] = moment(a['date']).format('MMMM Do YYYY')
        })
        res.render( 'index', {articles: articles})

    })
})


/* ============= Set Response Queue ============== */

app.use('', RedirectRouter)          // Redirect www to canonial
app.use(compress({level: 9}))        // Use Gzip compression
app.use(setHeaders)                  // Set response headers
app.use('/ajax/', APIRouter)         // Try to find a Rest
app.use('/', StaticRouter)           // Try to find a static site
app.use(express.static('ui'))


/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 3000)
