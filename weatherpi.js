Module.register("weatherpi",{

	defaults: {
		prependString: ''
	},

	start: function() {
		this.temperature = 'fetching ...';
		this.pressure = 'fetching ...';
		this.humidity = 'fetching ...';
		this.sendSocketNotification('CONNECT');
	},

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'WEATHERTEMP') {
			this.temperature = payload;
	    	this.updateDom();
	    }
		else if (notification === 'WEATHERPRESSURE') {
	    	this.pressure = payload;
	    	this.updateDom();
	    }
		else if (notification === 'WEATHERHUMIDITY') {
	    	this.humidity = payload;
	    	this.updateDom();
	    }
	}, 

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div"); 
		var weather = document.createElement("div");
		var weather2 = document.createElement("div");
		wrapper.className = "small normal";
		if(this.temperature == 'no weatherpi') {
			
		}
		else {
			weather.innerHTML = "Luftdruck " + this.pressure + " hPa";	
			weather2.innerHTML = "Luftfeuchtigkeit " + this.humidity + "%";
			wrapper.innerHTML = "Außen " + this.temperature + " °C";
			wrapper.appendChild(weather);
			wrapper.appendChild(weather2);
		}
					
		return wrapper;
	}
});
