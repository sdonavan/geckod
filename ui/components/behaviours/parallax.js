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
            activeOnPage: String,
            scroller: String
        },

        attached: function()
        {
            if (typeof this.distance === 'undefined')
                this.distance = 1

            this.element = null
            if (typeof this.bindTo !== 'undefined' && this.bindTo == 'sibling')
                this.element = this.previousSibling
            else
                this.element = this.parentNode

            this.scrollTarget = this.closest(this.scroller)

            this.alreadyAttached = true
            if (this.triedToInitialize === true && this.triedToDestroy === false)
                this.on()
        },


        on: function()
        {
            if (this.alreadyAttached !== true)
            {
                this.triedToInitialize = true
                return
            }

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

            this.scrollTarget.addEventListener("scroll", this.parallaxAnimation, false)
        },

        off: function()
        {
            if (this.alreadyAttached !== true)
            {
                this.triedToDestroy = true
                return
            }

            this._on = false
            this.element.style.transform = ''
            this.scrollTarget.removeEventListener("scroll", this.parallaxAnimation)
            this.parallaxAnimation = null
        },

        _parallax: function(event)
        {
            if (this._on === false)
                console.warn("Warning in Parallax. Running aprallax althought it is turned off!")

            this.element.style.transform = 'translateY(' + this.scrollTarget.scrollTop * this.distance + 'px)'
        }
    })

})()
