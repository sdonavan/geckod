var express         = require('express')

/* ============= Redirect www to canonial version ========= */
var RedirectRouter = express.Router()
RedirectRouter.get('/*', function(req, res, next)
{
    if (req.headers.host.match(/^www/) !== null )
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url)
    else
        next()
})

module.exports = RedirectRouter