Polymer({

	is: "application-background",

	ready: function()
	{
		var motionBehaviour = this.querySelector('behaviour-motion')
		window.location.pathname
	},

	_turnParticlesOn: function()
	{
		console.log("Turning particles on")
		var particles       = this.querySelectorAll('effect-particle-system')

		for (var i = 0; i < particles.length; i++)
			particles[i].on()
	},

	_turnParticlesOff: function()
	{
		console.log("Turning particles off")
		var particles       = this.querySelectorAll('effect-particle-system')
		console.log(particles)
		for (var i = 0; i < particles.length; i++)
			particles[i].off()
	}
})
