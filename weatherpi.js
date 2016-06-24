Module.register("MMM-weatherpi",{

	defaults: {
		prependString: ''
	},

	start: function() {
		this.temperature = 'fetching ...';
		this.pressure = 'fetching ...';
		this.sendSocketNotification('CONNECT');
	},

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'WEATHERTEMP') {
			this.temperature = payload;
	    	this.updateDom();
	    }
		if (notification === 'WEATHERPRESSURE') {
	    	this.pressure = payload;
	    	this.updateDom();
	    }
	}, 

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var weather = document.createElement("div");
		wrapper.className = "small normal";
		if(this.temperature == 'no weatherpi') {
			
		}
		else {
			weather.innerHTML = "Luftdruck " + this.pressure + " hPa";	
			wrapper.innerHTML = "Außen " + this.temperature + " °C";
			wrapper.appendChild(weather);
		}
					
		return wrapper;
	}
});
