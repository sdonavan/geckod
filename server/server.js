// server.js


/* ============= Base serup ============= */

var express         = require('express')
var compress        = require('compression')
var config          = require('./config')
var app             = express()

var swig            = require('swig')
var customSwig      = new swig.Swig({autoescape: false, varControls: ['{s{', '}s}'], tagControls: ['{s%', '%s}']});
app.engine('html', customSwig.renderFile)
app.set('view engine', 'html')
app.set('views', config.staticFolder)


var redirectRouter = require('./stream/redirect-router')
var renderRouter = require('./stream/render-router')
var apiRouter    = require('./stream/api-router')


/* ============= Set Response Queue ============== */

//app.use(compress({level: 1}))        // Use Gzip compression
app.use('', redirectRouter)          // Redirect www to canonial
app.use('/', renderRouter)           // Try to find a static site
app.use('/api/', apiRouter)
app.use(express.static(config.staticFolder))


/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 3000)
