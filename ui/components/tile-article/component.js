Polymer({

    is: "tile-article",

    attached: function()
    {
        var title = this.querySelector('#main-header h2').innerHTML
        this.realLink = '/articles/' + this._stringToHash(title)
    },

    _stringToHash: function(Text)
    {
        return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
    }
})
