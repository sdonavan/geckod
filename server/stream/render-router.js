/* ============= Render Router =========== */
var express         = require('express')
var config          = require('./../config')
var moment          = require('moment') // For date parsing

var StaticRouter = express.Router()
StaticRouter.get(['/'], function(req, res)
{
    config.model.getAllArticles(function(articles)
    {
        articles.forEach(function(a)
        {
            if (a['date'])
                a['date'] = moment(a['date']).format('MMMM Do YYYY')
        })
        res.render( 'index', {articles: articles})
    })
})

module.exports = StaticRouter
