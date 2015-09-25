
/**

 Imports all of the articles in into a Node database

 **/



var fs        = require('fs')

var Datastore = require('nedb')

var filePath  = __dirname + '/geckod.nedb'





// Delete old database

try{fs.unlinkSync(filePath)} catch(e){}



// Create new database

var db = new Datastore({ filename: filePath })

db.loadDatabase()



// Read all of the files

fs.readdir(__dirname + '/items/', function(err, files)

{

    files.forEach(function(fileName)

    {

        var doc = require(__dirname + '/items/' + fileName + '/metadata.js')



        fs.readFile(__dirname + '/items/' + fileName + '/body.html', 'utf8', function (err,data)

        {

            doc.main = data

            db.insert(doc)

        })

    })

})
