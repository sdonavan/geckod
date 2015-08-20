Polymer({

    is: "application-gallery",

    ready: function()
    {
        this.addEventListener('zoomedin', function(e)
        {
            // Remove scrollbar
            this.classList.add('inactive-page')
        }.bind(this))


        this.addEventListener('zoomedout', function()
        {
            // Add the scrollbar
            this.classList.remove('inactive-page')
        }.bind(this))
    }
})
