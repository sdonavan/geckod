/* ============= Render Router =========== */
var express         = require('express')
var config          = require('../config')
var moment          = require('moment') // For date parsing


var StaticRouter = express.Router()
StaticRouter.get(['/', '/articles', '/articles/:id'], function(req, res)
{
    config.model.getAllItems(function(items)
    {
        items.forEach(function(item)
        {
            if (item['date'])
                item['date'] = moment(item['date']).format('MMMM Do YYYY')

            // If the current article is being requested
            if (req.params.id === item['_id'])
                item['prerender'] = true
        })

        res.render( 'index', {items: items}, function(error, content)
        {
            res.send(content)
        })
    })
})

module.exports = StaticRouter
