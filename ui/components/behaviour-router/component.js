Polymer({

    is: "behaviour-router",

    properties:
    {
        page: String,
        active: String,
        inactive: String
    },

    created: function()
    {
        window.addEventListener("urlchange", this._toggle.bind(this), false)
    },

    attached: function()
    {
        this._toggle({detail: window.location.pathname})
    },

    _toggle: function(event)
    {
        var host = this.parentNode

        if (typeof this.active !== 'undefined' && this._isSubRoute(this.page, event.detail))
            host[this.active].call(host)

        else if (typeof this.inactive !== 'undefined')
            host[this.inactive].call(host)
    },

    _isSubRoute: function(childPath, parentPath)
    {
        return parentPath.match(new RegExp('^' + childPath + '$')) !== null
    }
})
