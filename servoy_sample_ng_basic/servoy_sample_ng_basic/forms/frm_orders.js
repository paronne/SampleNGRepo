/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"AE78A47B-1F0E-4A15-9EC2-28D7B61769D2"}
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
 * @properties={typeid:24,uuid:"DE62AD5A-B5B7-4C57-8CB9-9F12371BB4DF"}
 */
function previousRecord(event) {
	_super.previousRecord(event, foundset, databaseManager.getFoundSetCount(foundset));
}

/**
 * Handle record selected.
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"6162F0ED-A9A6-47A5-8D9A-A0CDAAB4075B"}
 */
function onRecordSelection() {
	// get table count at record selection is expensive
	_super.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getFoundSetCount(foundset));
	
	//setup the special tooltips on the addresses
	var billTT = 'Click the EDIT button to set the billing address'
	var shipTT = 'Click the EDIT button to set the shipping address'

	if(bill_address_id)
	{
		billTT = orders_to_companies.company_name + '\n' + orders_to_addresses$bill_address.address_display_calc
		billTT = '<html>' + utils.stringReplace(billTT, '\n', '<br>') + '</html>'
	}
	if(ship_address_id)
	{
		shipTT = orders_to_companies.company_name + '\n' + orders_to_addresses$ship_address.address_display_calc
		shipTT = '<html>' + utils.stringReplace(shipTT, '\n', '<br>') + '</html>'
	}

	elements.cbBillingAddress.toolTipText = billTT
	elements.cbShipAddress.toolTipText = shipTT

	sub_slideLabels();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSFoundSet} curFoundset Replace the default foundset with the form foundset
 *
 * @properties={typeid:24,uuid:"053B3562-A96E-4603-9C1F-22BC26FBD547"}
 */
function loadRecords(curFoundset) {
	controller.loadRecords(curFoundset);
}
/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param {Number} curOrderID the id of the selected order in a related form
 *
 * @properties={typeid:24,uuid:"AC524B8F-6C55-44AD-9BD3-A31DDE7A1B84"}
 */
function selectOrdersRecord(curOrderID) {
	if(curOrderID) {
		foundset.selectRecord(curOrderID);
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"6354BC68-29B2-45C0-B2F8-C20EF0331CB6"}
 */
function btnOpenCompany(event) {
	//load the record based on the current id
	forms.frm_contacts.selectContactsRecord(contact_id);
	//change the selected solution type in the main navigation to 'Contacts'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_CONTACTS_NAME);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5EECC715-C1DA-45A2-9070-BDAF87596BFA"}
 */
function btnOpenContact(event) {
	//load the record based on the current id
	forms.frm_contacts.selectContactsRecord(contact_id);
	//change the selected solution type in the main navigation to 'Contacts'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_CONTACTS_NAME);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"B69F4EA3-9E4D-405F-8CEE-4111FF4DDEA7"}
 */
function btnSave(event) {
	//check to make sure all the fields are filled out
	var flag = 0;
	var msgTitle = '';
	var msgText = '';
	if(!bill_address_id){
		flag = 1;
		msgTitle = "Empty billing address";
		msgText = "You must choose a billing address.";
	}
	if(!ship_address_id) {
		flag = 1;
		msgTitle = "Empty shipping address";
		msgText = "You must choose a shipping address.";
	}
	if(!contact_id) {
		flag = 1;
		msgTitle = "Empty contact";
		msgText = "You must choose a contact.";
	}
	if(!company_id) {
		flag = 1;
		msgTitle = "Empty company";
		msgText = "You must choose a company.";
	}
	if(!order_number) {
		flag = 1;
		msgTitle = "Empty order number";
		msgText = "There must be an order number.";
	}
	if(!order_date) {
		flag = 1;
		msgTitle = "Empty order date";
		msgText = "There must be an order date.";
	}
	if(flag){
		globals.DIALOGS.showErrorDialog(msgTitle,msgText, "OK");
	 	_super.btnCancel(event);
	}
	else {
	_super.btnSave(event);
	}
	hideBtnResetFields();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D315C9F2-575E-4FD1-A7F6-FBB75B1C43B0"}
 */
function btnCancel(event) {
 	_super.btnCancel(event);
	hideBtnResetFields();

}

/**
 * @properties={typeid:24,uuid:"5e10a4b0-3efa-4903-98d3-151c8c80eec0"}
 */
function btnShowBillAddr()
{
	var title = "Order " + order_number + " Bill Address";
	var message = orders_to_companies.company_name + '\n' + orders_to_addresses$bill_address.address_display_calc + '\n (You can select the text and copy it to the clipboard)';
	globals.DIALOGS.showInfoDialog(title,message,'Done');
}

/**
 * @properties={typeid:24,uuid:"ae55cbd6-2caf-4895-b698-9dd9312ed56f"}
 */
function btnShowShipAddr()
{
	var title = "Order " + order_number + " Ship Address";
	var message = orders_to_companies.company_name + '\n' + orders_to_addresses$ship_address.address_display_calc + '\n (You can select the text and copy it to the clipboard)';
	globals.DIALOGS.showInfoDialog(title,message,'Done');
}

/**
 * @properties={typeid:24,uuid:"6B2844CE-ECE7-4807-9D27-5B6FAC4940BC"}
 */
function doEdit()
{
	_super.doEdit()

	//make sure that we set this to 0 or if they add an item - the dialog will commit the entire transaction
	globals.okToCommit = 0;

	//hide the 'jump' buttons
	elements.btnShowCompany.visible = false;
	elements.btnShowContact.visible = false;
	elements.btnShowBillAddr.visible = false;
	elements.btnShowShipAddr.visible = false;

	//enable the comboboxes, except for the company name
	elements.cbBillingAddress.enabled = true;
	elements.cbContact.enabled = true;
	elements.cbShipAddress.enabled = true;
	elements.cbShipVia.enabled = true;
	elements.cbStatus.enabled = true;
	
	//make the items editable
	sub_slideLabels();
	
	//disable record navigation when in edit mode
	forms.lst_orders.disableEnableFields(false);
	
	forms.lst_order_items.enableDisableFormFields(false);

}

/**
 * @properties={typeid:24,uuid:"07AFAD50-BCC8-412B-9F8E-EDB786317A79"}
 */
function evt_companyChange()
{
	contact_id = null
	bill_address_id = null
	ship_address_id = null
}

/**
 * @properties={typeid:24,uuid:"252d0576-3d54-4591-866c-402dcf81df07"}
 */
function hideBtnResetFields()
{
	_super.hideBtnResetFields();

	//enable the 'jump' buttons
	elements.btnShowCompany.visible = true;
	elements.btnShowContact.visible = true;
	elements.btnShowBillAddr.visible = true;
	elements.btnShowShipAddr.visible = true;

	//disable the comboboxes
	elements.cbBillingAddress.enabled = false;
	elements.cbCompany.enabled = false;
	elements.cbContact.enabled = false;
	elements.cbShipAddress.enabled = false;
	elements.cbShipVia.enabled = false;
	elements.cbStatus.enabled = false;

	sub_slideLabels();

	//make sure that we set this to 1 so the next call to the dialog will commit the entire transaction
	globals.okToCommit = 1;
	
	//disable record navigation when in edit mode
	forms.lst_orders.disableEnableFields(true);
	forms.lst_order_items.enableDisableFormFields(true);
}

/**
 * @properties={typeid:24,uuid:"9296d2ff-65b9-481e-8203-4e1aaa5c6f56"}
 */
function onLoad()
{
	//replace some valuelist "-" stuff if we're in the web client
		globals.setupWcValueList('order_shipVia');
}


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"71B36F4D-A643-49F0-9EC5-542EF6AA2FC6"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow,event);
	//if we are not in edit mode, disable fields that are editable
	if(!globals.isEditing()) {
		hideBtnResetFields();
	}
}

/**
 * @properties={typeid:24,uuid:"42A6BAE3-35BC-478F-8149-A1D8316B9B69"}
 */
function sub_setNewOrderNumber()
{
	//set the next order number
	if(databaseManager.getFoundSetCount(foundset) == 0)
	{
		//never been an order number
		order_number = 1000;
	}
	else
	{
		//sql query to get the highest invoice number = then add 1
		var query = 'select order_number from orders order by order_number desc';
		var ds = controller.getDataSource().split('/');
		var dataset = databaseManager.getDataSetByQuery(ds[1], query, null, 1);
		order_number = dataset.getValue(1, 1) + 1;
	}
}

/**
 * @properties={typeid:24,uuid:"ca2ec5ef-80b2-4512-88d7-6fc3db05b5c3"}
 */
function sub_slideLabels()
{
	//if the order is closed (is_active == 1) - don't show the add or edit buttons
	if(!globals.isEditing() || is_active == 0)
	{
		forms.lst_order_items.showHideAddShowButton(false);
	}
	else
	{
		forms.lst_order_items.showHideAddShowButton(true);
	}
}

/**
 * @properties={typeid:24,uuid:"18135df0-2a18-42ea-844f-e483c023e697"}
 */
function validate_autoEnter()
{
	sub_setNewOrderNumber();
	order_date = new Date();
}

/**
 * @properties={typeid:24,uuid:"fe82eb98-b3d7-4064-83e1-b499dd1a8d26"}
 */
function validate_beforeDelete()
{
	return '0';
}

/**
 * @properties={typeid:24,uuid:"BEC30A51-D157-47C4-82BC-F04948410FF7"}
 */
function getOrderId() {
	return order_id;
}

/**
 * Creates a new order record and assigns it to the company
 * 
 * @param {Number} companyID
 *
 * @public
 * 
 * @properties={typeid:24,uuid:"8365F71C-494C-4C67-AA24-2E9AE70201B5"}
 */
function createNewRecord(companyID) {
	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()) {
		globals.startEditing();
	}
	
	//create a new record
	foundset.newRecord(true);
	
	//bind the contact with the proper company
	//do the auto-enter stuff
	validate_autoEnter();
	foundset.company_id = companyID;
	
	//globals.saveEdits();
	//call the edit method so they can edit the record
	doEdit();

	controller.focusFirstField();
}
