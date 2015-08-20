// server.js


/* ============= Base serup ============= */

var express         = require('express')
var compress        = require('compression')
var config          = require('./config')
var app             = express()

var swig            = require('swig')
var customSwig      = new swig.Swig({varControls: ['{s{', '}s}'], tagControls: ['{s%', '%s}']});
app.engine('html', customSwig.renderFile)
app.set('view engine', 'html')
app.set('views', config.staticFolder)


var renderRouter = require('./stream/render-router')



/* ============= Set Response Queue ============== */

//app.use(compress({level: 1}))                     // Use Gzip compression
app.use('', require('./stream/redirect-router'))  // Redirect www to canonial
app.use('/', renderRouter)           // Try to find a static site

app.use(express.static(config.staticFolder))
app.use(express.static(config.staticFolder))


/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 3000)
