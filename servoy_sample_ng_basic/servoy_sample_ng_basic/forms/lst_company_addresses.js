
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"E638A0B4-F62F-4FBE-9E8C-EC913297CE7E"}
 */
function btnNewAddress(event) {
	//get current company ID
	var companyID = forms.frm_companies.getCompanyId();

	//if there's no transaction, start one - so they can "cancel"
	if(!globals.isEditing()) {
		globals.startEditing();
	}

	//make a new record
	forms.dlg_addresses.createNewRecord();

	forms.dlg_addresses.setCompanyId(companyID);
	//hide the delete item button
	forms.dlg_addresses.showDeleteItemBtn(false);
	//go first field
	forms.dlg_addresses.focusFirstField();
	//open the dialog with the address form
	globals.DIALOGS.showFormInModalDialog(forms.dlg_addresses,50,50,600,260,"New address",true);

}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"45A11A3A-4786-4078-975D-4649BAAE2546"}
 */
function btnEditAddress(event) {

	//select the right row
	forms.dlg_addresses.selectRecord(address_id);

	//start a transaction
	if(!globals.isEditing()) {
		globals.startEditing();
	}

	//show the delete item button
	forms.dlg_addresses.showDeleteItemBtn(true);
	//go first field
	forms.dlg_addresses.focusFirstField();
	//open the dialog with the address form
	globals.DIALOGS.showFormInModalDialog(forms.dlg_addresses,50,50,600,260,"Edit address",true);

}

/**Remove this methods once disabling of a controller and a tabpanel works - bug in servoy
 * TODO generated, please specify type and doc for the params
 * @param {Boolean} flag
 * @public
 *
 * @properties={typeid:24,uuid:"0C396423-6DDB-4825-88F4-261AD28F2A27"}
 */
function enableDisableElements(flag){
	elements.btnAddAddress.enabled = flag;
	elements.btnOpenAddress.enabled = flag;
	
	elements.txtCity.enabled = flag;
	elements.txtLine1.enabled = flag;
	elements.txtLine2.enabled = flag;
	elements.txtState.enabled = flag;
	elements.txtType.enabled = flag;
	elements.txtZipcode.enabled = flag;
}
