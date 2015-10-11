
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"213A0625-835D-4275-ABC7-823E2FB938DC"}
 */
function btnSendContactEmail(event) {
	if(email){
		application.showURL('mailto:' + email);
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"61A52A8E-E50E-4867-AD42-24CB1C3509D1"}
 */
function btnOpenContact(event) {
		//load the record based on the current id in the contacts details form
		forms.frm_contacts.selectContactsRecord(contact_id);
		//change the selected solution type in the main navigation to 'Contacts'
		forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_CONTACTS_NAME);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"E057C139-F331-47CE-9739-CD6ADC0C8981"}
 */
function btnNewContact(event) {
	
	//change the selected solution type in the main navigation to 'Contacts'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_CONTACTS_NAME);

	//make a new contact and bind it to the correct company
	forms.frm_contacts.createNewRecord(globals.curID_company);

}

/**Remove this methods once disabling of a controller and a tabpanel works - bug in servoy
 * TODO generated, please specify type and doc for the params
 * @param {Boolean} flag
 * @public
 *
 * @properties={typeid:24,uuid:"60F9D10D-1CAC-450A-9C62-51CB2445332C"}
 */
function enableDisableElements(flag){
	//the elements.allNames does not work for elements in the header
	elements.btnAddCompanyContact.enabled = flag;
	elements.btnEmailContact.enabled = flag;
	elements.btnViewContact.enabled = flag;
	elements.txtMobile.enabled = flag;
	elements.txtName.enabled = flag;
	elements.txtPhone.enabled = flag;
	elements.txtTitle.enabled = flag;
}

