
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2F83E369-DF11-4824-8A21-BCC78B594B50"}
 */
function evtChangeItem(event) {
	description = order_items_to_products.order_description;
	price_each = order_items_to_products.price_each;
	cost_each = order_items_to_products.cost_each;
	
	if(!quantity) {
		quantity = 1;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"56FEFACE-7B3F-4A75-92FB-B030CF779EF5"}
 */
function btnOK(event) {
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
 * @properties={typeid:24,uuid:"09072383-5269-406B-8350-A965C04EF502"}
 */
function btnCancel(event) {
	globals.cancelEditing();
	application.getActiveWindow().destroy();
}

/**
 * @properties={typeid:24,uuid:"289A5122-6EC6-42C1-A283-6ED13FBCAE8F"}
 */
function createNewRecord(){
	controller.newRecord();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} orderID The order id of the current order in the main orders form
 *
 * @properties={typeid:24,uuid:"4908A9BE-1C77-456D-93F3-1487011A1745"}
 */
function setOrderId(orderID) {
	order_id = orderID;
}

/**
 * @param {Number} orderItemID
 *
 * @properties={typeid:24,uuid:"874B200A-AA3E-493B-AD2E-40FDB3549771"}
 */
function selectRecord(orderItemID){
	foundset.selectRecord(orderItemID);
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"15FD38B0-7641-48F8-A7F6-8C39FDAABD36"}
 */
function btnDeleteItem(event) {
	
		controller.deleteRecord();
		globals.saveEdits();
		application.getActiveWindow().destroy();
}
/**
 * TODO generated, please specify type and doc for the params
 * @param disabled
 *
 * @properties={typeid:24,uuid:"A01D7148-9F28-4EEA-A839-94727963DEA0"}
 */
function showDeleteItemBtn(disabled){
	elements.btnDeleteItem.visible = disabled;
}

/**
 * @properties={typeid:24,uuid:"E9D072B5-D3FC-4817-B3B2-14A6E3265C3D"}
 */
function focusFirstField(){
	controller.focusFirstField();
}
