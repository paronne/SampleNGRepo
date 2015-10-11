
/**
 * Open the currently selected order in the main details overview form of orders (frm_orders)
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"EC93C46D-405A-4528-9142-959DE6360D49"}
 */
function btnOpenOrder(event) {
	//load the record based on the current id
	forms.frm_orders.selectOrdersRecord(order_id);
	//change the selected solution type in the main navigation to 'Orders'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_ORDERS_NAME);
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"A7501461-0946-4E4D-B5C1-D766AFF68542"}
 */
function onNewOrder(event) {

	//make sure the company has at least ONE address & ONE contact
	var addrCnt = forms.frm_companies.getNumberOfAddressesForSelectedCompany();
	var contCnt = forms.frm_companies.getNumberOfContactsForSelectedCompany();
	
	if( addrCnt > 0 && contCnt > 0)
	{
		
		//change the selected solution type in the main navigation to 'Orders'
		forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_ORDERS_NAME);
		
		//create a new orders record and bind it to the currently selected company
		forms.frm_orders.createNewRecord(globals.curID_company);
	}
	else if(addrCnt == 0)
	{
		//show error
		globals.DIALOGS.showErrorDialog("No addresses for this company",'There needs to be at least one address defined for this company before you can create an order.', "OK");
		
		//create a new address before creating an order
		sub_continueCreateAddr(event);
	}
	else if(contCnt == 0)
	{
		//show error
		globals.DIALOGS.showErrorDialog("No contacts for this company",'There needs to be at least one contact defined for this company before you can create an order.', "OK");
		
		//create a new address before creating an order
		sub_continueCreateContact(event);
	}
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"E8DB4210-5B80-4ED2-B8E3-4F3D84B0E3A4"}
 */
function sub_continueCreateAddr(event)
{
	//show address tab
	forms.frm_companies.setTabPanel(scopes.constants.TABS_COMPANIES_FORM_INDEXES.TAB_ADDRESSES);

	//perform the method to create a new address
	forms.lst_company_addresses.btnNewAddress(event);
}

/**
 * @param {JSEvent} event the event that triggered the action
 * 
 * @properties={typeid:24,uuid:"d8d93ddf-f221-42d5-9c83-68e5b2904d09"}
 */
function sub_continueCreateContact(event)
{
	//show contacts tab
	forms.frm_companies.setTabPanel(scopes.constants.TABS_COMPANIES_FORM_INDEXES.TAB_CONTACTS);

	//perform the method to create a new address
	forms.lst_company_contacts.btnNewContact(event);
}

/**Remove this methods once disabling of a controller and a tabpanel works - bug in servoy
 * TODO generated, please specify type and doc for the params
 * @param {Boolean} flag
 * @public
 *
 * @properties={typeid:24,uuid:"80D3E266-8D41-4682-BC33-BF33C74DB8B3"}
 */
function enableDisableElements(flag){
	elements.btnAddOrder.enabled = flag;
	elements.btnOpenOrder.enabled = flag;
	
	elements.txtAmount.enabled = flag;
	elements.txtDate.enabled = flag;
	elements.txtOrderNumber.enabled = flag;
	elements.txtPaid.enabled = flag;
	elements.txtPO.enabled = flag;
	elements.txtShipDate.enabled = flag;
	elements.txtShipVia.enabled = flag;
	elements.txtTerms.enabled = flag;
}


