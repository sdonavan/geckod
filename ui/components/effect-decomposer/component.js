Polymer({

    is: "effect-decomposer",

    attached: function()
    {
        var parent = this.parentNode
        var text = parent.textContent.trim()

        var letters = text.split('')

        parent.innerHTML = ''
        var spans = letters.map(function(letter, index)
        {
            var letterSpan = document.createElement("SPAN")
            letterSpan.innerHTML = letter

            letterSpan.style['transition-delay'] = Math.random() / 2 + 's'
            parent.appendChild(letterSpan)
        })
    }
})
