{
	"name": "minox-just-Gage",
	"displayName": "JustGage",
	"version": 1,
	"definition": "minox/justGage/justGage.js",
	"libraries": [{
		"name": "justgage.js",
		"version": "1.0.1",
		"url": "minox/justGage/js/justgage.1.0.1.min.js",
		"mimetype": "text/javascript"
	}, {
		"name": "raphael.2.1.0.min.js",
		"version": "2.1.0",
		"url": "minox/justGage/js/raphael.2.1.0.min.js",
		"mimetype": "text/javascript"
	}],
	"model": {
		"jsonData" : "object",
		"value": {
			"type": "float"
		}, 
		"tempId" : "string",
		"min": {
			"type": "int", 
			"default": 0
		},
		"max": {
			"type": "int", 
			"default": 12
		},
		"title": {
			"type": "string", 
			"default": ""
		},
		"label": {
			"type": "string", 
			"default": ""
		},
		"startAnimationTime": {
			"type": "int", 
			"default": 1000
		},
		"gaugeWidthScale": {
			"type": "float", 
			"default": 0.7
		},
		"size": {
			"type": "dimension",
			"default": {
				"width": 200,
				"height": 200
			}
		},
		"location" : "point",
		"visible"  : "visible"
	},
	"handlers": {},
	"api": {
		"drawGage": {
				"parameters":[
								{                                                                 
 								"name":"data",
 								"type" : "object"
			            		}             
							 ]
	        }
	}
}