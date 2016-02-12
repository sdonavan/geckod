var config =
{
    staticFolder: __dirname + '/../build/',
    database    : __dirname + '/backend/geckod.nedb',
    model       : require('./backend/model')
}

module.exports = config
