{
	"name": "minox-gauge",
	"displayName": "Gauge",
	"version": 1,
	"definition": "minox/gauge/gauge.js",
	"libraries": [{"name": "gauge.js","version": "1","url": "minox/gauge/js/gauge.js","mimetype": "text/javascript"},
					{"name": "minox-gauge.css","version": "1","url": "minox/gauge/css/minox-gauge.css","mimetype": "text/css"}],
	"model":
	{
		"jsonData" 			: {"type":"object"},
		"min" 				: {"type":"int", "default":0},
		"max" 				: {"type":"int", "default":12},
		"value" 			: {"type":"float", "default":0},
		"startAnimationTime": {"type":"int", "default":60},
		"gaugeWidthScale"	: {"type":"float", "default":0.27},
		"size"				: {"type": "dimension","default": {"width": 150,"height": 140}},
		"location" 			: {"type":"point"},
		"visible"  			: {"type":"visible"}
	}
}