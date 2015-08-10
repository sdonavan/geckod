// server.js


/* ============= Base serup ============= */

var express         = require('express')
var cache           = require('memory-cache');
var compress        = require('compression')
var mustacheExpress = require('mustache-express');

var app             = express()
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
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


/* ============= Snapshot Router ============= */
<!--
var SnapshotRouter = express.Router()
SnapshotRouter.get('/',function (req, res)
{
    res.render('article', {})
})




/* ============= Rest Router ============= */
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


var dummyArticles =
[
    {'title': 'test1', 'date': '02-03-2012', tags: ['Teea', 'dawwz']}
]

/* ============= Static Router ================ */
var StaticRouter = express.Router()
StaticRouter.get('/', function(req, res)
{
    res.render( 'index', {articles: dummyArticles, test: [3, 4, 5, 6]})
})

StaticRouter.get('/articles/*', function(req, res)
{
    res.render( 'index', {articles: dummyArticles})
})

StaticRouter.get('/articles/', function(req, res)
{
    res.render( 'index', {articles: dummyArticles})
})



/* ============= Error Router ================ */



/* ============= Set Response Queue ============== */

app.use('', RedirectRouter)          // Redirect www to canonial
app.use(compress({level: 9}))        // Use Gzip compression
app.use(setHeaders)                  // Set response headers
app.use(MemoryCache)                 // Try to retrieve a response from memory

app.use('/ajax/', APIRouter)          // Try to find a Rest response
app.use('/snapshot/', SnapshotRouter) // Serve a static snapshot
app.use('/', StaticRouter)         // Try to find a static site
app.use(express.static('ui'))


/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 3000)
