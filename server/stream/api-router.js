/**
 * Created by Sly on 9/25/2015.
 */
/* ============= Render Router =========== */
var express         = require('express')
var config          = require('../config')


var ApiRouter = express.Router()
ApiRouter.get('/article/:id', function(req, res, next)
{
    var id = req.params.id

    config.model.getArticle(id, function(article)
    {
        if (article.length === 0)
            res.status(404).send('Not found')
        else
            res.send(article)
    })
})

module.exports = ApiRouter
