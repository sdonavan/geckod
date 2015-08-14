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



/* ============= Set Response Queue ============== */

app.use(compress({level: 1}))                     // Use Gzip compression
app.use('', require('./stream/redirect-router'))  // Redirect www to canonial

//app.use(setHeaders)                  // Set response headers
//app.use('/ajax/', APIRouter)         // Try to find a Rest
app.use('/', require('./stream/render-router'))           // Try to find a static site
app.use(express.static(config.staticFolder))
app.use(express.static(config.staticFolder))


/* ============= Initialize ============= */
// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 3000)
