var fs        = require('fs')
var Datastore = require('nedb')
var filePath  = __dirname + '/geckod.nedb'


var db = new Datastore({ filename: filePath })
db.loadDatabase()

module.exports = {}

module.exports.getAllArticles = function(callback)
{
    db.find({}, function(err, docs)
    {
        callback(docs)
    })
}
