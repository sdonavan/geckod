/* ============= Render Router =========== */
var express         = require('express')
var config          = require('../config')
var moment          = require('moment') // For date parsing


var StaticRouter = express.Router()
StaticRouter.get(['/', '/articles'], function(req, res)
{
    config.model.getAllItems(function(items)
    {
        items.forEach(function(item)
        {
            if (item['date'])
                item['date'] = moment(item['date']).format('MMMM Do YYYY')
        })

        res.render( 'index', {items: items}, function(error, content)
        {
            res.send(content)
        })
    })
})

StaticRouter.get(['/articles/:id'], function(req, res)
{
    config.model.getArticle(req.params.id, function(items)
    {
        var article = items[0]

        if (article === undefined)
            res.status(404).send('Not found')

        else
        {
            if (article['date'])
                article['date'] = moment(article['date']).format('MMMM Do YYYY')

            res.render( 'article', {item: article}, function(error, content)
            {
                res.send(content)
            })
        }
    })
})

module.exports = StaticRouter
