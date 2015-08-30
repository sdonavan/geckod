Polymer
({
    is: "application-gallery",

    addInactiveClass: function()
    {
        this.classList.add('inactive-page')
    },

    removeInactiveClass: function()
    {
        this.classList.remove('inactive-page')
    }
})
