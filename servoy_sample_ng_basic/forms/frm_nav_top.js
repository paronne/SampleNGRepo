
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {JSFoundset} curFoundset the foundset of the child form
 * @param {Number} maxIndex the size of the table
 * 
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"270E0893-6D24-44C6-BDED-991D5D106AA8"}
 */
function nextRecord(event, curFoundset, maxIndex) {	
		curFoundset.setSelectedIndex(curFoundset.getSelectedIndex()+1);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 * @param curFoundset
 * @param maxIndex
 *
 * @protected
 * @properties={typeid:24,uuid:"FCACA56A-6B76-4F2D-9B50-E371F139AE82"}
 */
function previousRecord(event, curFoundset, maxIndex) {
		curFoundset.setSelectedIndex(curFoundset.getSelectedIndex()-1);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} curIndex The currently selected index in the foundset
 * @param {Number} maxIndex The max index in the table
 *
 * @public
 * @properties={typeid:24,uuid:"28967D3A-D308-4BA9-859A-E19DF8DA7B0D"}
 */
function setLblRecordTextAndNavigation(curIndex, maxIndex) {
	//reset the text of the label when a new record is selected
	elements.lblRecord.text = "Record: "+ curIndex + " of "+maxIndex;
	
	//enable/disable the navigation buttons depending on the selected record index
	//This code handles all possible cases:
	//case 1: curIndex == 1
	//case 2: curIndex == maxIndex
	//case 3: curIndex == 1 && curIndex ==maxIndex;
	//case 4: curIndex!=1 && curIndex != maxIndex;
	elements.btnNavLeft.enabled = (curIndex !=1); 
	elements.btnNavRight.enabled = (curIndex !=maxIndex);
}


/**
 * Save the changes on button Save clicked
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"94D9641D-1BB3-417F-B220-FBA17098CD21"}
 */
function btnSave(event) {
	globals.saveEdits()
	hideBtnResetFields();
}

/**
 * @properties={typeid:24,uuid:"0E2F498E-A8F5-4FB1-8447-1246CF7C5D3A"}
 */
function hideBtnResetFields()
{
	//get the names of all elements
	var allNames = elements.allnames;

	for (var i=0; i<allNames.length; i++)
	{
		//disable all editable fields
		if(allNames[i].indexOf('txt') >= 0 || allNames[i].indexOf('chk') >= 0 || allNames[i].indexOf('cb') >= 0)
		{
			//if it's a field - then change color and make not editable
			elements[allNames[i]].bgcolor = '#f0f0f0';
			elements[allNames[i]]['readOnly'] = true;
			
		}
	}

	elements.btnSave.visible = false;
	elements.btnCancel.visible = false;
	elements.btnNavLeft.enabled = true;
	elements.btnNavRight.enabled = true;
	forms.lst_nav_main.disableForm(true);
}

/**
 * Cancel the changes on button Cancel clicked
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D82B11AD-34A7-4FC9-98CD-695C129A0A72"}
 */
function btnCancel(event)
{
	globals.cancelEditing();
	hideBtnResetFields();
}


/**
 * @properties={typeid:24,uuid:"585078DC-E42D-4A5B-B0D1-FF69AD72D765"}
 */
function doEdit()
{
	if(!globals.isEditing()) {
		globals.startEditing();
	}
	var allNames = elements.allnames;

	for ( var i = 0 ; i < allNames.length ; i++ )
	{
		//work on fields only - starting with name "txt"
		if(allNames[i].indexOf('txt') >= 0 || allNames[i].indexOf('chk') >= 0 || allNames[i].indexOf('cb') >= 0)
		{
			//if it's a field - then change color and make editable
			elements[allNames[i]].bgcolor = '#feffe4';
			elements[allNames[i]]['readOnly'] = false;
		}
	}

	elements.btnSave.visible = true;
	elements.btnCancel.visible = true;
	elements.btnNavLeft.enabled = false;
	elements.btnNavRight.enabled = false;
	forms.lst_nav_main.disableForm(false);

}

/**
 * @properties={typeid:24,uuid:"1D8FABF8-EC16-4EB8-B7D3-F26371586F86"}
 */
function sub_doDelete()
{
		controller.deleteRecord()

		//if there are no records showing - then show all
		if(controller.getMaxRecordIndex() == 0) {
			forms.frm_nav_top.sub_showShowAll();
		}
}
/**
 * Add a new record in the currently visible form in the main display tabs container 
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"81470A9C-AE51-4688-A300-13298B5324FD"}
 */
function btnAdd(event) {
	//see what form is front-most i.e. active in the main panel
	var frm = event.getFormName();
//	var selectedRecord = forms.lst_solution_navigation.getSelectedRecord().toLowerCase();
//	//to account for the form name for customers actually being companies
//	if(selectedRecord.equalsIgnoreCase('customers')){
//		selectedRecord = 'companies';
//	}
//	
//	var frm = 'frm_'+ selectedRecord;

	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()){
		globals.startEditing();
	}

	//make a new record
	forms[frm].controller.newRecord(true);

	//see if there is an auto-enter method to be performed on that form
	if(forms[frm].validate_autoEnter != undefined){ 
		forms[frm].validate_autoEnter();
	}

	//ALL forms must have a method "doEdit" for this to work
	forms[frm].doEdit();

	//tell the first field in the tab order to receive focus
	controller.focusFirstField();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"F33DEAE2-827F-4E7B-B25B-6F6D337614F2"}
 * @AllowToRunInFind
 */
function btnShowAll(event) {
	//see what form is front-most
	//var frm = event.getFormName();
//	var selectedRecord = forms.lst_solution_navigation.getSelectedRecord().toLowerCase();
//	//to account for the form name for customers actually being companies
//	if(selectedRecord.equalsIgnoreCase('customers')){
//		selectedRecord = 'companies';
//	}
//	
//	var frm = 'frm_'+ selectedRecord;
//	var frm2 = utils.stringReplace(frm, 'frm', 'lst');

	//load all records
	//forms[frm].
	foundset.loadAllRecords();
	//forms[frm2].controller.loadAllRecords();
	//forms[frm2].btn_sortAsc();

	//hide the "show all" button
	sub_hideShowAll();
}



/**
 * Hides the "Show all" button and label
 * @properties={typeid:24,uuid:"D3427046-616F-4AA0-B175-45F6F216ED5E"}
 */
function sub_hideShowAll()
{
	elements.btnShowAll.visible = false;
	elements.lblShowAll.visible = false;
}

/**
 * Shows the "Show all" button and label
 * @public
 * @properties={typeid:24,uuid:"5FAB0178-7B7B-4679-976C-C32BB8CD0C93"}
 */
function sub_showShowAll()
{
	elements.btnShowAll.visible = true;
	elements.lblShowAll.visible = true;
}
/**
 * Action executed when Edit button is pressed.
 * Enters edit mode if we are not editing and executes the doEdit() method of the currently active form in the main tabs container.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5758A369-9B1E-4010-AB54-9D8D2A4629E0"}
 */
function btnEdit(event) {
	//only do edit if there is no existing transaction
	if(!globals.isEditing())
	{
		//see what form is front-most
		var frm = event.getFormName();
		forms[frm].doEdit();

		//tell the first field in the tab order to receive focus
		forms[frm].controller.focusFirstField();
	}
}

/**
 * Action triggered when the Delete button is pressed.
 * Checks if there are any dependencies that prevent the selected record from the front-most form to be deleted.
 * If there are, it opens the form where these dependencies can be edited/removed.
 * Otherwise it calls the sub_doDelete() method of the front-most form.
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"12B90F52-90F4-466F-A8D9-0D981CBA9BB8"}
 */
function btnDelete(event) {
	//see what form is front-most
	var frm = event.getFormName();
//	var selectedRecord = forms.lst_solution_navigation.getSelectedRecord().toLowerCase();
//	//to account for the form name for customers actually being companies
//	if(selectedRecord.equalsIgnoreCase('customers')){
//		selectedRecord = 'companies';
//	}
//	
//	var frm = 'frm_'+ selectedRecord;
	
	if(forms[frm].validate_beforeDelete() != 0){
		return;
	}

	var msg = forms[frm].delete_text;

	if(!msg) {
		msg = 'Are you sure you want to delete this record?';
	}

	//show a warning dialog
	var answer = globals.DIALOGS.showWarningDialog('Delete record',msg,'Cancel', 'Delete');
	//if the answer is 'Delete', delete the record
	if(answer.equalsIgnoreCase('Delete')) {
		forms[frm].sub_doDelete();
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"43B09C7A-B5A3-4BF4-91DA-ED4892A36175"}
 */
function onShow(firstShow, event) {
	//see what form is front-most
	var frm = event.getFormName();

	//See if the foundset contains all the records from the table. 
	//If so, no need to show all records everything is already there - hide the show all button.
	//Otherwise there are records that are not loaded in the foundset - show the ShowAll button.
	if(databaseManager.getTableCount(forms[frm].foundset) > databaseManager.getFoundSetCount(forms[frm].foundset))
	{
		sub_showShowAll();
	}
	else
	{
		sub_hideShowAll();
	}
}
