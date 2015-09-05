Polymer({

    is: "effect-autotype",

    properties: {speed: {type: Number, value: 30}, pause: {type: Number, value: 1500}},

    ready: function()
    {
        this._strings =
            Array.prototype.slice.call(this.children) // Convert to Array
            .map(function(d){return d.innerHTML}) // Get HTML

        this._refresh()
        this._run()
    },

    _run: function()
    {
        this._refreshIntervalId =
            setInterval(this._writeLetter.bind(this), this.speed)
    },

    _pause: function(miliseconds)
    {
        clearInterval(this._refreshIntervalId)

        setTimeout(function()
        {
            this._run()
        }.bind(this), miliseconds)
    },

    _refresh: function()
    {
        this.innerHTML = ''
        this._workingCopy = this._strings.slice()
        this._workingString = this._workingCopy.shift().split('')
    },

    _writeLetter: function()
    {
        var lettersRemaining = this._workingString.length
        var letter = this._workingString.shift()

        if (typeof letter === 'undefined')
        {
            if (this.innerHTML !== '|')
                this._removeLetter()

            else
            {
                var newString = this._workingCopy.shift()

                if (typeof newString === 'undefined')
                    this._refresh()
                else
                    this._workingString = newString.split('')
            }
        }

        else
        {
            this.innerHTML = this.innerHTML.slice(0, - 1) + letter + '|'

            if (lettersRemaining === 1)
                this._pause(this.pause)
        }
    },

    _removeLetter: function()
    {
        this.innerHTML = this.innerHTML.slice(0, - 2) + '|'
    }
})