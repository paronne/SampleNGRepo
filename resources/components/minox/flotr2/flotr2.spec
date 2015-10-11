{
	"name": "minox-flotr2",
	"displayName": "Flotr2",
	"version": 1,
	"definition": "minox/flotr2/flotr2.js",
	"libraries": [{"name":"flotr2.min.js", "version":"1", "url":"minox/flotr2/js/flotr2.min.js", "mimetype":"text/javascript"}],
	"model":
	{
		"jsonData" : "object",
		"location" : "point",
		"size" : {"type" :"dimension",  "default" : {"width":200, "height":200}},
		"visible" : "visible"
	}, 
	"api" : 
	{
		"drawFlotr2": {
				"parameters":[
								{                                                                 
 								"name":"data",
 								"type" : "object"
			            		}             
							 ]
	        }
	}
}