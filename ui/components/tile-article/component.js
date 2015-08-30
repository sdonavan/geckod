Polymer
({

    is: "tile-article",

    properties: {link: String},

    ready: function()
    {
        this.realLink = '/articles/' + this.link
        this.apiLink = '/api/article/' + this.link
    },

    loadBody: function(event)
    {
        var content = this.querySelector('main')

        var response = this.querySelector('iron-ajax').lastResponse

        if (response)
            content.innerHTML = response[0].main
    }
})
