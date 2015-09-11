
Polymer({

    is: "behaviour-motion",

    properties: {factor: Number, link: String},

    on: function()
    {
        this
        this.parentNode.style.transform = ""
    },

    off: function()
    {
        this.parentNode.style.transform = 'translate(' + -screen.width * this.factor + 'px)'
    }
})
