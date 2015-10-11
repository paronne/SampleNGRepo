
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"111CAF7C-AB18-4708-B3E3-CD9E75E61345"}
 */
function btnOpenOrders(event) {
	//load the record based on the current id
	forms.frm_orders.selectOrdersRecord(order_id);
	//change the selected solution type in the main navigation to 'Contacts'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_ORDERS_NAME);

	//change tabs in main navigation form
	forms.lst_solution_navigation.onRecordSelection();
}
