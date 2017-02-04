var ITEMS =
[
    {
        _id: 'hurm-photos',
        title: 'Hurm Photos: a photographers portfolio',
        date: new Date('08/12/2015'),
        tags: ['Website', 'Design', 'HTML5'],
        thumbnail: '/media/thumbnails/hurm.jpg',
        link: 'http://www.hurmphotos.com'
    },

    {

        _id: 'europe-for-investors',
        title: 'Europe for investors',
        date: new Date('01/01/2016'),
        tags: ['Experiment', 'D3.js'],
        thumbnail: '/media/thumbnails/eufi.jpg',
        link: 'https://sdonavan.github.io/europe-for-investors/#valuations:gdp_ppp_per_capita'
    },

    {
        _id: 'the-center',
        title: 'The center: website',
        date: new Date('08/12/2013'),
        tags: ['Website', 'Design', 'Flash'],
        link: 'http://thecenterbg.com/',
        thumbnail: '/media/thumbnails/center.jpg'
    },

    {
        _id: 'memories',
        title: 'Memories',
        date: new Date('04/06/2014'),
        tags: ['Experiment', 'WebGL'],
        thumbnail: 'http://p1.pichost.me/i/33/1564937.jpg',
        link: 'https://sdonavan.github.io/memories/'
    }
]

Vue.component('typewritter',
{
    template: '<span class = "typewritter"><slot></slot></span>',

    props: {speed: {type: Number, default: 30}, pauseInterval: {type: Number, default: 1500}},

    mounted: function(done)
    {
        this.keywords =
            Array.prototype
            .slice.call(this.$el.children) // Convert to Array
            .map(e => e.innerHTML) // Get HTML


        this.refresh()
        this.run()
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
    bind: function(element, params)
    {
        var text = element.textContent.trim()
        var letters = text.split('')
        var values = params.value

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
    bind: function(element, params)
    {
        var value = params.value

        element.addEventListener('click', e =>
        {
            // If the link is iternal, block it
            // and do history API magic
            e.preventDefault()

            // Get human friendly link if it's there
            var refference = element.getAttribute('href')

            // If already on this page, scip
            if (window.location.pathname === refference)
                return

            history.pushState('', '', refference)

            element.dispatchEvent(new CustomEvent('routed', {bubbles: true, detail: refference}))
        })
    },

    twoWay: true
})

var Application = new Vue(
{
    el: '#content',

    data:
    {
        'path': window.location.pathname,
        'pageLoaded': false,
        'items': ITEMS.map(i => {i.date = moment(i.date).format('MMMM Do YYYY'); return i}),
    },

    computed:
    {
        'menuPath': self => (self.path == '/') ? '/articles' :
                            (self.path == '/articles') ? '/' :
                            '/articles'
    },

    created: function()
    {
        window.onpopstate = e => {this.path = window.location.pathname;}
        window.onload = e => this.pageLoaded = true
        window.addEventListener('routed', e => this.path = e.detail)
    }
})
