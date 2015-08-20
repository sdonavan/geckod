
Polymer({

    is: "behaviour-motion",

    properties: {factor: Number, link: String, inactiveClass: String},

    on: function()
    {
        this.parentNode.style.transform = ""
        if (typeof this.inactiveClass !== 'undefined')
            this.parentNode.classList.remove(this.inactiveClass)    
    },

    off: function()
    {
        this.parentNode.style.transform = 'translate(' + -screen.width * this.factor + 'px)'
        if (typeof this.inactiveClass !== 'undefined')
            this.parentNode.classList.add(this.inactiveClass)   
    }
})
