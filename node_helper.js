var NodeHelper = require("node_helper");
var exec = require('child_process').exec;


module.exports = NodeHelper.create({
	start: function function_name () {
		var self = this;
		setInterval(function() {
			self.sendTemperature();
		}, 15000);
	},

	sendTemperature: function() {
		var self = this;
		child = exec("ssh -t pi@weatherpi \"python pywork/Adafruit/examples/simpletest.py\"", function (error, stdout, stderr) {
			if (error) {
				//console.log(error);
				self.sendSocketNotification('WEATHERTEMP', 'no weatherpi');
				self.sendSocketNotification('WEATHERPRESSURE', 'no weatherpi');
				return;
			}
			
			var temppos1 = stdout.indexOf("Temp = ");
			var temppos2 = stdout.indexOf("*C");
			var tempraw = stdout.slice(temppos1+7, temppos2-2);
			var pressurepos1 = stdout.indexOf("Pressure = ");
			var pressurepos2 = stdout.indexOf("Pa");
			var pressureraw = stdout.slice(pressurepos1+11, pressurepos2-1);
			pressureraw = pressureraw / 100;
			
	  		self.sendSocketNotification('WEATHERTEMP', tempraw);
			self.sendSocketNotification('WEATHERPRESSURE', pressureraw);
		});
	}
});
