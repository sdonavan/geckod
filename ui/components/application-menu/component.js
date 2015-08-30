Polymer({

    is: "application-menu",

    home: function()
    {
        this.querySelector('span').classList.add('gallery')
        this.querySelector('span').classList.remove('home')
        this.classList.remove('left')
        this.classList.add('right')
        this.querySelector('a').href = '/articles/'
    },

    gallery: function()
    {
        this.querySelector('span').classList.add('home')
        this.querySelector('span').classList.remove('gallery')
        this.querySelector('span').classList.remove('colored')
        this.classList.remove('right')
        this.classList.add('left')
        this.querySelector('a').href = '/'
    },

    article: function()
    {
        this.querySelector('span').classList.add('gallery')
        this.querySelector('span').classList.add('colored')
        this.querySelector('span').classList.remove('home')
        this.querySelector('a').href = '/articles/'
    }
})
