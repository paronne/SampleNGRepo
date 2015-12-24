{
	"name": "jquery3partylibs-select2autotokenizer",
	"displayName": "select2tokenizer",
	"definition": "jquery3partylibs/select2AutoTokenizer/select2Autotokenizer.js",
	"version": 1,
	"libraries": [
		{
			"name": "select2.js",
			"version": "1",
			"url": "jquery3partylibs/select2AutoTokenizer/js/select2.js",
			"mimetype": "text/javascript"
		},
		{
			"name": "select2.css",
			"version": "1",
			"url": "jquery3partylibs/select2AutoTokenizer/css/select2.css",
			"mimetype": "text/css"
		},
		{
			"name": "j3pl-select2-autotokenizer.css",
			"version": "1",
			"url": "jquery3partylibs/select2AutoTokenizer/css/j3pl-select2-autotokenizer.css",
			"mimetype": "text/css"
		}
	],
	"model":
	{
		"dataprovider": { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID" }},
		"valuelist": { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataprovider"}, 
		"visible" : {"type":"boolean", "default":true},
        "allowNewEntries": {"type": "boolean"}, 
        "noMatchesFoundText": {"type": "tagstring", "default": "No matches found"},
        "size" : {"type" :"dimension",  "default" : {"width":140, "height":20}}, 
        "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
        "placeholderText" : {"type": "tagstring", "default" : "Select..."}, 
        "toolTipText" : "tagstring", 
        "styleClass" : {"type": "styleclass"},
           
           
        "valueSeparator" : {"type" :"string", "tags" : {"scope" :"private"}, "values" : [{"NEW_LINE":"new_line"}, {"COMMA": "comma"}], "default" : "new_line"},    
        "maximumSelectionSize": {"type": "int", "tags": { "scope" :"private" }},
		"transparent" : {"type" :"boolean", "tags": { "scope" :"private" }},
		"background" : {"type" :"color", "tags": { "scope" :"private" }}, 
	    "borderType" : {"type" :"border", "tags": { "scope" :"private" }}, 
        "fontType" : {"type" :"font", "tags": { "scope" :"private" }}, 
        "foreground" : {"type" :"color", "tags": { "scope" :"private" }}, 
        "location" : "point", 
        "margin" : {"type" :"insets", "tags": { "scope" :"private" }},
       	"editable" : {"type":"boolean", "default":true, "tags": { "scope" :"private" }}, 
        "enabled" : {"type":"boolean", "default":true, "tags": { "scope" :"private" }}

	},
	"handlers":
	{
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
	"api": 
	{
	}
}