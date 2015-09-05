var fs        = require('fs')
var Datastore = require('nedb')
var config    = require('./config')


var db = new Datastore({ filename: config.database })
db.loadDatabase()

module.exports = {}

module.exports.getAllItems = function(callback)
{
    db.find({}, function(err, docs)
    {
        callback(docs)
    })
}

module.exports.getArticle = function(id, callback)
{
    db.find({_id: id}, function(err, docs)
    {
        callback(docs)
    })
}
