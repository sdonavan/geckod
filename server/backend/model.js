/**
 * Created by Sly on 9/25/2015.
 */

var fs        = require('fs')

var Datastore = require('nedb')



var db = new Datastore({ filename: __dirname + '/geckod.nedb' })

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
