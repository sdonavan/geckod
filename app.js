// server.js


/* ============= Base serup ============= */

var express    = require('express')
var app        = express()
var sqlite3    = require('sqlite3').verbose()
var db         = new sqlite3.Database('main.db')
var cache      = require('memory-cache');
var compress   = require('compression')





/* ============= Redirect www to canonial version ========= */
var RedirectRouter = express.Router()
RedirectRouter.get('/*', function(req, res, next)
{
    if (req.headers.host.match(/^www/) !== null )
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url)
    else
        next()
})


/* ============= Headers ============ */
var setHeaders = function (req, res, next)
{
    res.setHeader('Cache-Control', 'public, max-age=31557600')
    next()
}


/* ============= Cache setup ============= */
var MemoryCache = function(req, res, next)
{

    next() // Passing the request to the next handler in the stack.
}


/* ============= Rest API ============= */
var APIRouter = express.Router()

APIRouter.get('/',function (req, res)
{

    res.json({"About": "Geckod API",
              "Routes": {"Portfolio items": "/work/", "Blog posts": "/posts/?page=1"}})
})

APIRouter.get('/work/',function (req, res)
{
    db.all("SELECT * FROM portfolio_item", function(err, result)
    {
        // Parse the results a little
        var parsedResults = result.map(function(r)
        {
            //r.links = JSON.parse(r.links)
            ['technologies', 'tags', 'links'].forEach(function(field)
            {
                try {r[field] = JSON.parse(r[field])}
                catch (e){ /* ignore all JSON unserializable fields */ }
            })

            return r
        })

        res.json(parsedResults)
    })
})


/* ============= Set Response Queue ============== */

app.use('', RedirectRouter)      // Redirect www to canonial
app.use(compress({level: 9}))    // Use Gzip compression
app.use(setHeaders)              // Set response headers
app.use(MemoryCache)             // Try to retrieve a response from memory
app.use(express.static('gui'))   // Try to find a static site
app.use('/api/', APIRouter)      // Try to find a Rest response





/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 3000)
