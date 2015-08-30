Polymer({

    is: "behaviour-zoom",

    properties: 
    {
        zoomInClass: String, 
        zoomed: {type: Boolean, value: false}
    },

    zoomOut: function()
    {
        if (this.zoomed === false)
            return

        var target = this.parentNode
        this._restoreMetricsToStyle(target)

        // When ready
        target.classList.remove(this.zoomInClass)

        var instance = this
        target.addEventListener(this._transitionEndEventName(), function(e)
        {
            if (e.srcElement == target)
            {
                target.removeEventListener(e.type, arguments.callee, false)
                instance._clearMetricsFromStyle(target)
            }
        }, false)

        instance.zoomed = false
    },

    zoomIn: function()
    {
        if (this.zoomed === true)
            return
        
        var target = this.parentNode

        target.style.transition = '0s'

        this._saveMetricsFromClass(target)
        this._restoreMetricsToStyle(target)

        target.style.transition = ''
        target.classList.add(this.zoomInClass)
        window.getComputedStyle(target).width

        this._clearMetricsFromStyle(target)

        // Setup work
        this.zoomed = true
    },

    _saveMetricsFromClass: function(target)
    {
        this.saved = {}
        this.saved.width = target.offsetWidth + 'px'
        this.saved.height = target.offsetHeight + 'px'
        this.saved.left =  target.offsetLeft + 'px'
        this.saved.top = target.offsetTop + 'px'
    },

    _restoreMetricsToStyle: function(target)
    {
        target.style.width = this.saved.width
        target.style.height = this.saved.height
        target.style.left = this.saved.left
        target.style.top = this.saved.top
        target.style.position = 'absolute'
        window.getComputedStyle(target).width
    },

    _clearMetricsFromStyle: function(target)
    {
        target.style.width = ''
        target.style.height = ''
        target.style.left = ''
        target.style.top = ''
        target.style.position = ''
    },

    _transitionEndEventName: function()
    {
        var i,
        undefined,
        el = document.createElement('div'),
        transitions =
        {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

        for (i in transitions)
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined)
                return transitions[i]

        //TODO: throw 'TransitionEnd event is not supported in this browser';
    }
})
