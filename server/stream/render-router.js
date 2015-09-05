/* ============= Render Router =========== */
var express         = require('express')
var config          = require('./../config')
var moment          = require('moment') // For date parsing
var cache           = require('memory-cache')


var StaticRouter = express.Router()
StaticRouter.get(['/', '/articles', '/articles/:id'], function(req, res)
{
	// Look in the cache
	var cachedVersion = cache.get(req.originalUrl)

	if (cachedVersion !== null)
		res.send(cachedVersion)
	else
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
	        	cache.put(req.originalUrl, content)
	        	res.send(content)
	        })
	    })
})

module.exports = StaticRouter
