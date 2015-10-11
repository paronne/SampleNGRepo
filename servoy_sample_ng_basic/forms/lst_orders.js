/**
 * Get the selected record index and set it in a global variable. Needed for icon setting in orders table calculation displayIconOnRecord()
 *
 * @protected
 * 
 * @properties={typeid:24,uuid:"8F901638-C3C9-4962-924D-2C3DCD4B59FE"}
 */
function getSelectedRecordIndex() {
	globals.curID_order = order_id;
	forms.frm_nav_top.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getFoundSetCount(foundset));
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSFoundSet|JSDataSet} curFoundset Replace the default foundset with the form foundset
 *
 * @properties={typeid:24,uuid:"86ECAFB2-5BB2-496E-ACAA-DF2CCCD561E2"}
 */
function loadRecords(curFoundset) {
	controller.loadRecords(curFoundset);
	forms.frm_nav_top.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getFoundSetCount(foundset));
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"D1D80578-51FC-4E1E-B632-9C1A6F9B772B"}
 */
function btn_sortAsc(event) {
	_super.btn_sortAsc(event);
	if(order_number) {
		foundset.sort('order_number asc');
	}
	else {
		foundset.sort('order_id asc');
	}
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"D75603D2-9431-42F3-B944-4BC202CCED7D"}
 */
function btn_sortDesc(event) {
	_super.btn_sortDesc(event);
	if(order_number) {
		foundset.sort('order_number desc');
	}
	else {
		foundset.sort('order_id desc');
	}
	
}

/**
 * @param {Boolean} flag
 *
 * @properties={typeid:24,uuid:"B25E452A-D6D5-4B84-9C8C-B2CCDA513D0C"}
 */
function disableEnableFields(flag){
	elements.lblOrderName.enabled = flag;
	elements.lblOrderBtn.enabled = flag;
}