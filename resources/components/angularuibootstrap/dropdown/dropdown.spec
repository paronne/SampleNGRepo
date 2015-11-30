{
	"name": "angularuibootstrap-dropdown",
	"displayName": "Dropdown Button",
	"definition": "angularuibootstrap/dropdown/dropdown.js",
	"libraries": [],
	"version": 1,
	"model":
	{
		"dataProviderID" : { "type":"dataprovider", "pushToServer" : "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}}, 
		"enabled" : {"type":"boolean", "default":true}, 
		"fontType" : {"type":"font", "tags":{"scope" : "private"}}, 
		"format" : {"for":"dataProviderID" , "type" :"format", "tags":{"scope":"private"}}, 
		"location" : "point", 
		"size" : {"type" :"dimension",  "default" : {"width": 150, "height": 34}}, 
		"buttonStyle" : { "type" :"string", "tags": { "scope" :"design" }, "values" : [{"PRIMARY": "btn-primary"}, {"SECONDARY": "btn-secondary"}, {"TERTIARY": "btn-tertiary"}, {"SUCCESS": "btn-success"}, {"INFO": "btn-info"}, {"WARNING": "btn-warning"}, {"DANGER": "btn-danger"}, {"TRANSPARENT": "btn-transparent"}], "default" : "btn-default"}, 
		"buttonSize" : { "type" : "string", "tags": { "scope" :"design" }, "values" : [{"LARGE": "btn-lg"}, {"SMALL": "btn-sm"}, {"EXTRA-SMALL": "btn-xs" }],  "default" : ""},
		"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"private" }}, 
		"text" : {"type":"tagstring"}, 
		"toolTipText" : {"type":"tagstring"}, 
		"visible" : {"type":"boolean", "default":true} ,
		"valuelist": {"type":"valuelist", "tags":{"scope":"design"}},
		"split": {"type":"boolean", "default":false, "tags":{"scope":"design"}}
	},
	"handlers": {
		"onActionMethodID": "function",
		"onMenuItemSelected": {
				"parameters" : [								{
						          "name":"realValue",
								  "type":"object"
								}, 
								{
						          "name":"displayValue",
								  "type":"object"
								}, 
								{
						          "name":"event",
								  "type":"JSEvent"
								}]
		}
	},
	"api": {
		"setValueListItems": {
			"parameters": [
				{                                                                 
					"name":"value",
					"type":"dataset"
				}             
			]
		}
	}
}
