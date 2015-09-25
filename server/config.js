var config =
{
    staticFolder: __dirname + '/../ui/',
    database    : __dirname + '/backend/geckod.nedb',
    model       : require('./backend/model')
}

module.exports = config
