{"name": "angularuibootstrap-buttons-radio",
"displayName": "Group Buttons",
"definition": "angularuibootstrap/buttonsRadio/buttonsRadio.js",
"libraries": [],
"version": 1,
	"model":
	{
	   "dataProvider": {"type": "dataprovider", "pushToServer": "allow", "tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	   "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :["btn-default", "btn-primary"], "default" : "btn-default"}, 
	   "valuelist" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataProvider"}   
	},
	"handlers": {
		"onDataChangeMethodID" : {
	          "returns": "Boolean", 
	         	
	        	"parameters":[
								{
						          "name":"oldValue",
								  "type":"${dataproviderType}"
								}, 
								{
						          "name":"newValue",
								  "type":"${dataproviderType}"
								}, 
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
		}
	},
	"api": {

	}
}
