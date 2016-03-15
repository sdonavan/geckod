/**
 Imports all of the articles in into a Node database
 **/

var fs        = require('fs')

var Datastore = require('nedb')

var filePath  = __dirname + '/geckod.nedb'


// Delete old database
try{fs.unlinkSync(filePath)} catch(e){console.log("No old database found..")}

// Create new database
var db = new Datastore({ filename: filePath })
db.loadDatabase()



// Read all of the files
function updateDatabase(callback)
{
    console.log(__dirname + '/items/')
    fs.readdir(__dirname + '/items/', function(err, files)
    {
        if (err)
            console.info("Error reading the database: " + err)

        console.info("Reading files " + files)

        files.forEach(function(fileName, index)
        {
            var doc = require(__dirname + '/items/' + fileName + '/metadata.js')
            fs.readFile(__dirname + '/items/' + fileName + '/body.html', 'utf8', function (err,data)
            {
                if (err)
                    console.info("Error reading a file " + err)

                doc.main = data
                db.insert(doc)

                if ((index >= files.length - 1) && typeof callback === '')
                    callback()
            })
        })

    })
}

updateDatabase()

module.exports = updateDatabase
