var fs        = require('fs')
var Datastore = require('nedb')
var config    = require('./config')


var db = new Datastore({ filename: config.database })
db.loadDatabase()

module.exports = {}

module.exports.getAllArticles = function(callback)
{
    db.find({}, function(err, docs)
    {
        callback(docs)
    })
}
