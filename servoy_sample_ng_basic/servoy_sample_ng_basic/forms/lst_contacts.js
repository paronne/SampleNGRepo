/**
 * Get the selected record index and set it in a global variable. Needed for icon setting in contacts table calculation displayIconOnRecord()
 *
 * @protected
 * 
 * @properties={typeid:24,uuid:"A9F2C002-656B-4E2B-A99E-EF02CFC7586A"}
 */
function getSelectedRecordIndex() {
	globals.curID_contact = contact_id;
	forms.frm_nav_top.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getTableCount(foundset));
}
/**
 * @public
 * TODO generated, please specify type and doc for the params
 * @param {JSFoundSet} curFoundset Replace the default foundset with the form foundset
 *
 * @properties={typeid:24,uuid:"07BE709C-2BE1-4A3C-AE3C-CDCE0ADDB044"}
 */
function loadRecords(curFoundset) {
	controller.loadRecords(curFoundset);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"77143B0E-9EC3-41F4-8C0B-752C02CC678B"}
 */
function btn_sortAsc(event) {
	_super.btn_sortAsc(event);
	
	if(name_last && name_first){
		foundset.sort('name_last asc, name_first asc');
	}
	else if(name_last){
		foundset.sort('name_last asc');
	}
	else if(name_first){
		foundset.sort('name_first asc');
	}
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"92DF0B1C-5DAB-41E4-8DAA-C88A398BD0F2"}
 */
function btn_sortDesc(event) {
	_super.btn_sortDesc(event);
	
	if(name_last && name_first){
		foundset.sort('name_last desc, name_first desc');
	}
	if(name_last){
		foundset.sort('name_last desc');
	}
	else if(name_first){
		foundset.sort('name_first desc');
	}
}

/**
 * @param {Boolean} flag
 *
 * @properties={typeid:24,uuid:"2DB5AAA4-070E-49E7-B4EA-1FA432528344"}
 */
function disableEnableFields(flag){
	elements.lblContact.enabled = flag;
	elements.lblContactBtn.enabled = flag;
}