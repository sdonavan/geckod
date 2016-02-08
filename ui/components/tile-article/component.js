Polymer
({

    is: "tile-article",

    properties: {link: String, cover: String},

    ready: function()
    {
        this.realLink = '/articles/' + this.link
        this.apiLink = '/api/article/' + this.link
    },

    attached: function()
    {
        this.highlight()

        // Set the background
        this.querySelector('.cover').style['background-image'] = 'url("' + this.cover + '")'
    },

    loadBody: function(event)
    {
        var content = this.querySelector('main')

        if (content.innerHTML !== '')
            return

        var response = this.querySelector('iron-ajax').lastResponse

        if (response)
            content.innerHTML = response[0].main

        this.highlight()
    },

    highlight: function()
    {
        var codeBlocks = this.querySelectorAll('code')

        for (var i = 0; i < codeBlocks.length; i++)
            hljs.highlightBlock(codeBlocks[i])
    }
})
