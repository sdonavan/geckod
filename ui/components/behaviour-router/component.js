Polymer({

    is: "behaviour-router",

    properties: 
    {
        page: String,
        active: String,
        inactive: String
    },

    attached: function()
    {
        this._toggle({detail: window.location.pathname})
        window.addEventListener("urlchange", this._toggle.bind(this), false)
    },

    _toggle: function(event)
    {
        var host = this.parentNode

        if (this._isSubRoute(this.page, event.detail))
            host[this.active].call(host)

        else 
            host[this.inactive].call(host)
    },

    _isSubRoute: function(childPath, parentPath)
    {
        return parentPath.match(new RegExp('^' + childPath + '$')) !== null
        //(parentPath.substring(0, childPath.length) === childPath && childPath !=='/')
    }
})