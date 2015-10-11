/**
 * @public 
 * @properties={typeid:24,uuid:"6AAFB816-08D7-455A-9140-BB7760F83C8B"}
 */
function createNewRecord(){
	controller.newRecord(true);
}

/**
 * @param {Number} companyID
 *
 * @properties={typeid:24,uuid:"5BD3B60D-A901-4997-8A87-EF42A321D207"}
 */
function setCompanyId(companyID){
	company_id = companyID;
}

/**
 * @properties={typeid:24,uuid:"55B1AEF8-D8E3-4AE3-B322-EA569020E880"}
 */
function focusFirstField(){
	controller.focusFirstField();
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"14076187-EDB6-4D18-9BB5-4C1900CD95B9"}
 */
function btnSave(event) {
	globals.saveEdits();
	application.getActiveWindow().destroy();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"88D0E8F4-699E-42ED-9B96-52449E1BE8E3"}
 */
function btnCancel(event) {
	globals.cancelEditing();
	application.getActiveWindow().destroy();
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"69DF7932-77A0-4ACC-9BE0-B39CC2CEFF6F"}
 */
function btnDelete(event) {
			//check to make sure that the address in question isn't used on any orders
		var bAdrCnt = addresses_to_orders$billing.getSize();
		var sAdrCnt = addresses_to_orders$shipping.getSize();

		if(bAdrCnt == 0 && sAdrCnt == 0)
		{
			controller.deleteRecord();
			globals.saveEdits();
		}
		else
		{
			//there are orders that use this address
			var msg = 'There are orders that use this address as a shipping or billing address.' +
			' Change the orders to a new address, then you can delete this address.'
			globals.DIALOGS.showErrorDialog("Address is in use",msg,"OK");
			globals.cancelEditing();
			forms.frm_companies.sub_showCompanyOrders();
		}
		application.getActiveWindow().destroy();
}
/**
 * @param {Boolean} disabled
 *
 * @properties={typeid:24,uuid:"66E80771-3AEF-4352-A0C3-392DC64A73E7"}
 */
function showDeleteItemBtn(disabled){
	elements.btnDeleteItem.visible = disabled;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} addressID The address ID of the address to be edited
 *
 * @properties={typeid:24,uuid:"056D1EE5-BDC9-47A7-A621-CAD3D0410CED"}
 */
function selectRecord(addressID){
	foundset.selectRecord(addressID);
}