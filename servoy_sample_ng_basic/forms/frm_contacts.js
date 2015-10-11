/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"965DF880-0610-48FF-B145-FA74F88EF78B"}
 */
function nextRecord(event) {
	_super.nextRecord(event, foundset, databaseManager.getFoundSetCount(foundset));
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"61D587C1-DAC3-47BD-86EF-AFAF4BC44E60"}
 */
function previousRecord(event) {
	_super.previousRecord(event, foundset, databaseManager.getFoundSetCount(foundset));
}

/**
 * Handle record selected.
 *
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E09BD800-92D2-4303-96B9-4A7388FE4040"}
 */
function onRecordSelection() {
	_super.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getFoundSetCount(foundset));
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} curContactID The selected id in a related form
 *
 * @properties={typeid:24,uuid:"AD235DDC-15CE-4C37-A5CC-DED0AB5A4B16"}
 * @AllowToRunInFind
 */
function selectContactsRecord(curContactID) {
	if(curContactID){
		foundset.selectRecord(curContactID);
	}
}

/**
 * @public
 * TODO generated, please specify type and doc for the params
 * @param {JSFoundSet} curFoundset Replace the default foundset with the form foundset
 *
 * @properties={typeid:24,uuid:"8DBDFEF5-B960-4187-8F93-98F79025A200"}
 */
function loadRecords(curFoundset) {
	controller.loadRecords(curFoundset);
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8885710C-9972-4822-9FA7-3404B4326CA5"}
 */
function btnSendEmail(event) {
	if(email){
		application.showURL('mailto:' + email);
	}
}

/**
 * Open the company view for the company in this contact record.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"F93438B7-459F-40F0-B5AE-F54DA6CB8C2A"}
 */
function btnOpenCompany(event) {
	//load the record based on the current id
	forms.frm_companies.selectCompanyRecord(company_id);
	//change the selected solution type in the main navigation to 'Contacts'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_COMPANIES_NAME);
}

/**
 * after done with editing enable and disable the fields
 * @properties={typeid:24,uuid:"57C1BE3C-F8A0-4AA6-B000-08D6AE6F5B25"}
 */
function hideBtnResetFields()
{
	_super.hideBtnResetFields();

	//disable the list of addresses
	//put this code instead of the for cycle once the bug of tabs is fixed
	//elements.tabs_availableAddresses.enabled = false;
	for(var tabIdx = 1; tabIdx<=elements.tabs_availableAddresses.getMaxTabIndex(); tabIdx++) {
		var frm = elements.tabs_availableAddresses.getTabFormNameAt(tabIdx);
		forms[frm].controller.enabled = false;
		forms[frm].controller.readOnly = true;
	}
	
	//disable the comboboxes
	elements.cbStatus.enabled = false;
	elements.cbContactType.enabled = false;
	elements.cbTitle.enabled = false;

	//show the buttons
	elements.btnSendEmail.visible = true;
	elements.btnShowCompany.visible = true;
	
	//disable record navigation when in edit mode
	forms.lst_contacts.disableEnableFields(true);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"AC9944D9-3C63-4EB8-A0D2-63E3151D067E"}
 */
function btnSave(event) {
	_super.btnSave(event);
	hideBtnResetFields();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"630DEC11-6CC6-4637-BC8C-6A96090451AE"}
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
 * @properties={typeid:24,uuid:"8A7DF4EC-FFD8-4197-AC6C-99C4B0896534"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow,event);
	//if we are editing a newly created contact, do not disable form fields
	if(!globals.isEditing()){
		hideBtnResetFields();
	}
}

/**
 * @properties={typeid:24,uuid:"3A21A862-4895-4181-8968-8274DFFFD8F9"}
 */
function doEdit()
{
	_super.doEdit();

	//enable the list of addresses so it can be changed
	//replace the for cycle with this line of code when the bug is fixed:
	//elements.tabs_availableAddresses.enabled = true;
	
	for(var tabIdx = 1; tabIdx<=elements.tabs_availableAddresses.getMaxTabIndex(); tabIdx++) {
		var frm = elements.tabs_availableAddresses.getTabFormNameAt(tabIdx);
		forms[frm].controller.enabled = true;
		forms[frm].controller.readOnly = false;
	}

	//enable the combobox fields
	elements.cbContactType.enabled = true;
	elements.cbStatus.enabled = true;
	elements.cbTitle.enabled = true;
	
	//hide the buttons that will screw things up
	elements.btnSendEmail.visible = false;
	elements.btnShowCompany.visible = false;
	
	forms.lst_contacts.disableEnableFields(false);
}

/**
 * Procedure that loads the related orders to the contact
 * @properties={typeid:24,uuid:"DEF2C969-303A-48DF-AFFB-58B75CCAA667"}
 */
function sub_showContactOrders()
{
	//load the records based on the companies to contacts relation
	forms.frm_orders.loadRecords(contacts_to_orders);
	forms.lst_orders.loadRecords(contacts_to_orders);
	
	//change the selected solution type in the main navigation to 'Orders'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_ORDERS_NAME);

	//change tabs in main navigation form
	forms.frm_nav_top.sub_showShowAll();
}

/**
 * Validate if the contact has outstanding orders. If so, you cannot delete it, have to delete the related orders first.
 * @properties={typeid:24,uuid:"96e23855-8d69-47e0-94e1-c9868c436131"}
 */
function validate_beforeDelete()
{
	var ord = contacts_to_orders.getSize();

	if(ord > 0)
	{
		//show dialog and return 1
		//show the tabpanel "dialog"
		globals.DIALOGS.showErrorDialog('Contact with orders',"You can't delete a contact is referenced on one or more orders.\n\nChange the contact on the orders first.","OK");
		sub_showContactOrders();
		return 1;
	}
	else
	{
		return 0;
	}
}

/**
 * Creates a new contact record and assigns it to the company
 * 
 * @param {Number} companyID
 *
 * @public
 * 
 * @properties={typeid:24,uuid:"C7B9AA4E-B994-460B-A7E8-DF60FF525AB2"}
 */
function createNewRecord(companyID) {
	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()) {
		globals.startEditing();
	}
	
	//create a new record
	foundset.newRecord(true);
	
	//bind the contact with the proper company
	foundset.company_id = companyID;
	
	//activate the edit
	doEdit();

	focusFirstField();
}

/**
 * @properties={typeid:24,uuid:"73D392C2-BF15-4BE4-BE6F-C24144F94441"}
 */
function focusFirstField() {
	controller.focusFirstField();
}