Polymer({

    is: "application-menu",

    attached: function()
    {
    },

    on: function()
    {
        this.querySelector('span').classList.add('gallery')
        this.querySelector('span').classList.remove('home')
        this.classList.remove('left')
        this.classList.add('right')
        this.querySelector('a').href = '/articles/'
    },

    off: function()
    {
        this.querySelector('span').classList.add('home')
        this.querySelector('span').classList.remove('gallery')
        this.classList.remove('right')
        this.classList.add('left')
        this.querySelector('a').href = '/'
    }
})
