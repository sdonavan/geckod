(function()
{

    var parallaxEngine = null

    Polymer({

        is: "behaviour-parallax",

        _on: false,

        properties:
        {
            distance: Number,
            bindTo: String,
            activeOnPage: String
        },

        ready: function()
        {
            if (typeof this.distance === 'undefined')
                this.distance = 1

            this.element = null
            if (typeof this.bindTo !== 'undefined' && this.bindTo == 'sibling')
                this.element = this.previousSibling
            else
                this.element = this.parentNode


        },

        
        on: function()
        {
            if (this._on === true)
            {
                console.warn("Attempting to turn on a parallax effect that was already on!")
                return
            }

            this._on = true

            this.parallaxAnimation = function()
            {
                window.requestAnimationFrame(this._parallax.bind(this))
            }.bind(this)
            document.addEventListener("scroll", this.parallaxAnimation)
        },

        off: function()
        {
            this._on = false
            this.element.style.transform = ''
            document.removeEventListener("scroll", this.parallaxAnimation)
            this.parallaxAnimation = null
        },

        _parallax: function(event)
        {
            if (this._on === false)
                console.warn("Warning in Parallax. Running aprallax althought it is turned off!")

            this.element.style.transform = 'translateY(' + window.scrollY * this.distance + 'px)'
        }
    })

})()
