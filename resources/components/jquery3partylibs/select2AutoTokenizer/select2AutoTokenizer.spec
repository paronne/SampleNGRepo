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
			"name": "app.css",
			"version": "1",
			"url": "jquery3partylibs/select2AutoTokenizer/css/app.css",
			"mimetype": "text/css"
		}
	],
	"model":
	{
		"dataprovider": { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID" }},
		"valueSeparator" : {"type" :"string", "tags" : {"scope" :"design"}, "values" : [{"NEW_LINE":"new_line"}, {"COMMA": "comma"}], "default" : "new_line"},
		"transparent" : "boolean",
		"valuelist": { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataprovider"}, 
		"background" : "color", 
	    "borderType" : "border", 
        "editable" : {"type":"boolean", "default":true}, 
        "enabled" : {"type":"boolean", "default":true}, 
        "fontType" : "font", 
        "foreground" : "color", 
        "location" : "point", 
        "margin" : {"type" :"insets", "tags": { "scope" :"design" }}, 
        "placeholderText" : "tagstring", 
        "size" : {"type" :"dimension",  "default" : {"width":140, "height":20}}, 
        "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
        "toolTipText" : "tagstring", 
        "visible" : {"type":"boolean", "default":true},
        "maximumSelectionSize": {"type": "int"},
        "allowNewEntries": {"type": "boolean"}, 
        "noMatchesFoundText": {"type": "tagstring", "default": "No matches found"}
	},
	"handlers":
	{
		"onActionMethodID" : "function", 
		"onDataChangeMethodID" : "function", 
		"onFocusGainedMethodID" : "function", 
		"onFocusLostMethodID" : "function", 
		"onRenderMethodID" : "function", 
		"onRightClickMethodID" : "function" 
	},
	"api": 
	{
	}
}