/**
 * TODO generated, please specify type and doc for the params
 * @param {Boolean} flag Flag that shows or hides the small add button in the items list
 *
 * @properties={typeid:24,uuid:"BF8644CE-5B9E-44BD-B0B5-84CD66414306"}
 */
function showHideAddShowButton(flag){
	elements.btnAdd.visible = flag;
	elements.btnViewOrderItem.visible = flag;
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E6C52D7A-D0B0-4E05-ACF0-D6112A9177A9"}
 */
function btnNewOrderItem(event) {
	//start a transaction
	if(!globals.isEditing()) {
		globals.startEditing();
	}
	//create a new record
	forms.dlg_orderItem.createNewRecord();

	//add the PK of the current order to the new row
	forms.dlg_orderItem.setOrderId(forms.frm_orders.getOrderId());
	
	forms.dlg_orderItem.showDeleteItemBtn(false);
	//show the edit dialog
	globals.DIALOGS.showFormInModalDialog(forms.dlg_orderItem,50,50,600,300,"New Order Item",true);
}



/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"73ECF793-3C64-468F-A9C8-EF76D4AEF1AF"}
 */
function btnShowProductDetails(event) {
	
		//select the right row
		forms.dlg_orderItem.selectRecord(orderitem_id);

		//start a transaction
		if(!globals.isEditing()) 
		{
			globals.startEditing();
		}
		
		//show the delete item button
		forms.dlg_orderItem.showDeleteItemBtn(true);
		//go first field
		forms.dlg_orderItem.focusFirstField();
		//open the dialog with the address form
		globals.DIALOGS.showFormInModalDialog(forms.dlg_orderItem,50,50,600,260,"Edit Order Item",true);

}

/**
 * TODO generated, please specify type and doc for the params
 * @param flag
 *
 * @properties={typeid:24,uuid:"2889DE1B-83B2-491D-BB47-8D2CADF50030"}
 */
function enableDisableFormFields(flag){
	controller.enabled = flag;
	controller.readOnly = flag;
}