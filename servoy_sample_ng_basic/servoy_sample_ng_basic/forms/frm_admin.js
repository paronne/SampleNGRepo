/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1B475CA2-AA24-4B01-A9A4-D893A6A68751"}
 */
var sqlQuery = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7BC3BABF-EE58-416D-8D44-8E7D626C8FEC"}
 */
var sqlQueryResult = '';
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CED3DBBA-186C-4DD3-BFEC-D4BD3D216D9C"}
 */
function btnPerformQuery(event) {
	
	if(!sqlQuery)
	{
		//no query entered
		globals.DIALOGS.showErrorDialog('Query field empty','No SQL query entered.','OK');
		return;
	}

	//there is a query - so try to run it
	//Get a dataset based on query
	var maxReturnedRows = 1000;//useful to limit number of rows
	var sourceName = foundset.getDataSource();
	var srvname = sourceName.split('/');
	var dataset = databaseManager.getDataSetByQuery(srvname[1], sqlQuery, null, maxReturnedRows);
	var err = dataset.getException();

	if(err != null && err.getMessage() != undefined)
	{
		globals.DIALOGS.showErrorDialog("Query error",'An error occurred with your query:\n\n' + err.getMessage(),"OK");
		return;
	}

	//HTML to display the query results
	var myHTML = '<html><body>';

	sqlQueryResult = myHTML + '<b>QUERY: </b>' + sqlQuery + '<br><br>' + dataset.getAsHTML() + '</body></html>';
}

/**
 * @properties={typeid:24,uuid:"8d9a59ef-b880-4e5b-a287-563a107c285d"}
 */
function doEdit()
{
	_super.doEdit()
	
	forms.lst_admin_preferences.doEdit();
	forms.frm_admin_vl.doEdit();	
	elements.btnQuery.enabled = true;
}

/**
 * @properties={typeid:24,uuid:"9e49caec-dd04-4386-8c98-60d96c32b3c0"}
 */
function hideBtnResetFields()
{
	_super.hideBtnResetFields();

	forms.lst_admin_preferences.endEdit();
	forms.frm_admin_vl.endEdit();
	elements.btnQuery.enabled = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"68F2824C-F1BD-46E9-B48E-32FBFB048664"}
 */
function nextRecord(event) {
	_super.nextRecord(event, foundset, databaseManager.getTableCount(foundset));
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"0DAF4BF1-137C-4BCD-8914-B1A450B4F8F5"}
 */
function previousRecord(event) {
	_super.previousRecord(event, foundset, databaseManager.getTableCount(foundset));
}

/**
 * Handle record selected.
 *
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"9765E0AF-FDE1-4781-B4B3-D8501E953C84"}
 */
function onRecordSelection() {
	_super.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getTableCount(foundset));
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"9B9F4FE4-E78F-4C3D-B528-67D3DA669526"}
 */
function btnSave(event) {
	_super.btnSave(event);
	hideBtnResetFields();
	//see if you need to do the add part
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"9CB69D12-9680-4FC4-8A3D-B8FE03A704AC"}
 */
function btnCancel(event) {
 	_super.btnCancel(event);
	hideBtnResetFields();

}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"560365F0-8EF9-41E3-AB66-221387AED83C"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow,event);
	//if we are editing a newly created contact, do not disable form fields
	if(!globals.isEditing()){
		hideBtnResetFields();
	}
}