Polymer({

    is: "behaviour-history-api",

    created: function()
    {
        var link = this.parentNode

        this.parentNode.addEventListener('click', function(e)
        {
            e.path.some(function(element)
            {
                if (element.tagName === 'A')
                {
                    e.preventDefault()

                    // Get human friendly link if it's there
                    var refference = element.getAttribute('href')

                    // If already on this page, scip
                    if (window.location.pathname === refference)
                        return

                    history.pushState('', '', refference)
                    window.dispatchEvent(new CustomEvent('urlchange', {'detail': window.location.pathname}))
                }

            })
        })

        window.onpopstate = function(e)
        {
            window.dispatchEvent(new CustomEvent('urlchange', {'detail': window.location.pathname}))
        }

        window.addEventListener("DOMContentLoaded", function(event) 
        {
            window.dispatchEvent(new CustomEvent('urlchange', {'detail': window.location.pathname}))
        })
    }
})
