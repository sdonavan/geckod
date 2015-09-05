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
	    config.model.getAllArticles(function(articles)
	    {
	        articles.forEach(function(a)
	        {
	            if (a['date'])
	                a['date'] = moment(a['date']).format('MMMM Do YYYY')

	            // If the current article is being requested
              	if (req.params.id == a['_id'])
            		a['prerender'] = true
	        })

	        res.render( 'index', {articles: articles}, function(error, content)
	        {
	        	cache.put(req.originalUrl, content)
	        	res.send(content)
	        })
	    })
})

module.exports = StaticRouter
