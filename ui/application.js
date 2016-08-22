Vue.component('typewritter',
{
    template: '<span class = "typewritter"><slot></slot></span>',

    props: {speed: {type: Number, default: 30}, pauseInterval: {type: Number, default: 1500}},

    activate: function(done)
    {
        this.keywords =
            Array.prototype.slice.call(this.$el.children) // Convert to Array
            .map(e => e.innerHTML) // Get HTML


        this.refresh()
        this.run()
        done()
    },

    methods:
    {
        refresh: function()
        {
            this.$el.innerHTML = ''
            this.workingCopy = this.keywords.slice()
            this.workingString = this.workingCopy.shift().split('')
        },

        run: function()
        {
            this.refreshIntervalId =
                setInterval(this.writeLetter.bind(this), this.speed)
        },

        removeLetter: function()
        {
            this.$el.innerHTML = this.$el.innerHTML.slice(0, - 2) + '|'
        },

        writeLetter: function()
        {
            var lettersRemaining = this.workingString.length
            var letter = this.workingString.shift()

            if (typeof letter === 'undefined')
            {
                if (this.$el.innerHTML !== '|')
                    this.removeLetter()

                else
                {
                    var newString = this.workingCopy.shift()

                    if (typeof newString === 'undefined')
                        this.refresh()
                    else
                        this.workingString = newString.split('')
                }
            }

            else
            {
                this.$el.innerHTML = this.$el.innerHTML.slice(0, - 1) + letter + '|'

                if (lettersRemaining === 1)
                    this.pause(this.pauseInterval)
            }
        },

        pause: function(miliseconds)
        {
            clearInterval(this.refreshIntervalId)

            setTimeout(function()
            {
                this.run()
            }.bind(this), miliseconds)
        },
    }
})



Vue.directive('decomposed',
{
    update: function(values)
    {
        var element = this.el
        var text = element.textContent.trim()
        var letters = text.split('')

        element.innerHTML = ''
        letters.map((letter, index) =>
        {
            var letterSpan = document.createElement("SPAN")
            var delayWeight = values.ordered ? index / 80 : Math.random() / 2

            letterSpan.innerHTML = letter //=== ' ' ? '&nbsp' : letter
            letterSpan.style['transition-delay'] = (values.baseDelay + delayWeight) + 's'
            element.appendChild(letterSpan)
        })
    }
})


Vue.directive('internal',
{
    update: function(value)
    {
        this.el.addEventListener('click', e =>
        {
            // If the link is iternal, block it
            // and do history API magic
            e.preventDefault()

            // Get human friendly link if it's there
            var refference = this.el.getAttribute('href')

            // If already on this page, scip
            if (window.location.pathname === refference)
                return

            history.pushState('', '', refference)

            this.set(refference)
            value = refference
        })
    },

    twoWay: true
})


Vue.directive('ddawwd',
{
    update: function(value)
    {
    },

    twoWay: true
})

var Application = new Vue(
{
    el: 'body',

    data:
    {
        'path': window.location.pathname,
        'pageLoaded': false
    },

    computed:
    {
        'menuPath': self => (self.path == '/') ? '/articles' :
                            (self.path == '/articles') ? '/' :
                            '/articles'
    },

    created: function()
    {
        window.onpopstate = e => {console.log("Cccc"); this.path = window.location.pathname;}
        window.onload = e => this.pageLoaded = true
    }
})
