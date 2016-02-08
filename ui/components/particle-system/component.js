  Polymer({

    is: "particle-system",

    properties:
    {
        size: Number,
        speed: Number,
        color: String,
        opacity: Number,
        number: Number,
        link: String
    },


    created: function()
    {
        var id = this._generateId()

        this.script = null
        this.setAttribute('id', id)
    },

    _generateId: function()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var i = 0

        for(i; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return 'id' + (new Date()).getTime() + text
    },

    on: function()
    {
        if (this.script !== null)
            return

        this.script = new particlesJS(this.id,
            {
              "particles": {
                "number": {
                  "value": this.number || 30,
                  "density": {
                    "enable": false,
                    "value_area": 800
                  }
                },
                "color": {
                  "value": this.color || white
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 0,
                    "color": "#000000"
                  },
                  "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                  }
                },
                "opacity": {
                  "value": this.opacity,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 0.5,
                    "opacity_min": 0.05,
                    "sync": true
                  }
                },
                "size": {
                  "value": this.size,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": false
                },
                "move": {
                  "enable": true,
                  "speed": this.speed,
                  "direction": "top",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": false,
                    "mode": "repulse"
                  },
                  "onclick": {
                    "enable": true,
                    "mode": "repulse"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 400,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 80.73394766657411,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": true
            }
        )
    },

    off: function()
    {
        if (this.script === null)
            return

        this.script.pJS.fn.vendors.destroypJS()
        this.script = null
    }
  })
