/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"02479799-FCDD-4579-9F45-F99DD7A1FE1A"}
 */
var currentValueList = '';

/**
 * @type {Number}
 * 
 * @description The current record index from table companies
 *
 * @properties={typeid:35,uuid:"6DB01BC5-9933-470E-A30D-05BFF116E9DA",variableType:4}
 */
var curID_company;


/**
 * @type {Number}
 * 
 * @description The current record index from table orders
 *
 * @properties={typeid:35,uuid:"AC847937-30D0-405C-903A-D14E1C0C30EF",variableType:4}
 */
var curID_order;

/**
 * @type {Number}
 * 
 * @description The current record index from table products
 *
 * @properties={typeid:35,uuid:"A8DCBF10-BD86-4CAF-A8DB-97654B2A0C17",variableType:4}
 */
var curID_product;

/**
 * @type {Number}
 * 
 * @description The current record index from table contacts
 *
 * @properties={typeid:35,uuid:"B104CEC9-1AF0-40C7-873F-7BFB4D73B8D8",variableType:4}
 */
var curID_contact;

/** 
 * @description Check if field editing is enabled
 * @properties={typeid:24,uuid:"B279232A-F3CA-44CC-90F6-DF6DA89EE224"}
 */

var okToCommit = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E340BDD7-F20B-411F-A63B-3DC72F4ACC85",variableType:4}
 */
var smart_chg = 0;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8E3A7FE2-3418-4566-AD80-7A24CCE8C662"}
 */
var default_image_directory = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EADB9AB8-23DE-49EB-A8A9-8685FB70FC8B"}
 */
var tempHTML = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"649B8531-6396-4FD7-97C5-B8EC82091F4D"}
 */
var nav_search = '';
//global methods start here
/**
 * @properties={typeid:24,uuid:"9B935552-D646-41F0-800C-23F3B49A83D6"}
 */
function isEditing()
{
	return !databaseManager.getAutoSave();
}

/**
 * @description Disable automatic saving, that way you can start editing and save or cancel changes if needed
 * @properties={typeid:24,uuid:"0DAB87E5-A631-44D4-AD9F-6EC2959450A0"}
 */
function startEditing()
{
	databaseManager.setAutoSave(false);
}

/**
 * @description If changes are done, save them and turn on autosave
 * @properties={typeid:24,uuid:"5E479254-EC44-4518-A7D5-39DB1DC89C49"}
 */
function saveEdits()
{
	databaseManager.saveData();
	databaseManager.setAutoSave(true);
}

/**
 * @description Cancel changes by reverting to the old state and turn on autosave
 * @properties={typeid:24,uuid:"6FFCE28A-9FC9-47C4-A016-A65E6B488D7D"}
 */
function cancelEditing()
{
	databaseManager.revertEditedRecords()
	databaseManager.setAutoSave(true);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param arg0
 *
 * @properties={typeid:24,uuid:"86DA8E38-79BD-4E20-9D81-F380B5E7260B"}
 */
function setupWcValueList(arg0)
{
	//this routine will examine a value list for "-" items - and remove them
	var listName = arg0;
	if(!listName) return;

	var dataset = application.getValueListItems(listName);

	if(dataset)
	{
		var myArray = new Array();
		var max = dataset.getMaxRowIndex();
		var temp = '';

		for ( var i = 1 ; i <= max  ; i++ )
		{
			temp = dataset.getValue(i, 1);
			if(temp != '-') {
				myArray.push(temp);
			}
		}

		application.setValueListItems(listName, myArray);
	}
}
