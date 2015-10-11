
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E40E416D-264B-43BF-A2EC-30FED80C7616"}
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
 * @properties={typeid:24,uuid:"86C67271-7F2F-4104-BFFE-CEABD3F0D8B2"}
 */
function previousRecord(event) {
	_super.previousRecord(event, foundset, databaseManager.getFoundSetCount(foundset));
}

/**
 * Handle record selected.
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"7A1B14C8-FAE6-4D07-8235-50A188F0540D"}
 */
function onRecordSelection() {
	_super.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getFoundSetCount(foundset));

	//setup or dim the buttons on the form based on field contents
	company_url ? elements.btnOpenURL.enabled = true : elements.btnOpenURL.enabled = false;
	company_email ? elements.btnSendEmail.enabled = true : elements.btnSendEmail.enabled = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5B7EC4EB-A7D5-4F07-9871-1DF182C728E2"}
 */
function btnOpenWebsite(event) {
	//if company url is not empty
	if(company_url) 
	{
		var url = company_url;

		//if url does not have 'http://' in it, append it at the beginning
		if(url.indexOf('http://') < 0){ 
			url = 'http://' + url;
		}
		application.showURL(url);
	}
}

/**
 * Send an email to the email address in the email field
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"638BF1E6-E3DE-4007-A964-5D9564D076A7"}
 */
function btnSendEmail(event) {
	//if company_email field is not empty, send email
	if(company_email) {
		application.showURL('mailto:' + company_email, '_blank');
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Number} curCompanyID The company id of the currently selected record
 *
 * @properties={typeid:24,uuid:"377A6D56-5E68-4EFB-91BD-841EDE15E123"}
 */
function selectCompanyRecord(curCompanyID){
	if(curCompanyID){
		foundset.selectRecord(curCompanyID);
	}
}


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"C7A1EC48-CF75-44B8-94FF-87968111E1E8"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow,event);
	hideBtnResetFields();
}

/**
 * @public
 * @properties={typeid:24,uuid:"7AA8ACA5-76AB-44EE-970C-F63067DC7992"}
 */
function doEdit()
{
	_super.doEdit();
	
	//hide the buttons that will mess things up
	elements.btnOpenURL.visible = false;
	elements.btnSendEmail.visible = false;

	//disable the navpanel at the bottom and the form shown in the tabpanel
	/*
	Replace this code when the tab panel can be disabled bug with:
	elements.tabsCompanyRelatedInfo.enabled = false;
	var tabIndex = elements.tabsCompanyRelatedInfo.tabIndex;
	var frm = elements.tabsCompanyRelatedInfo.getTabFormNameAt(tabIndex);
	forms[frm].controller.enabled = false;
	forms[frm].controller.readOnly = true;

	 */
	for(var tabIdx = 1; tabIdx<=elements.tabsCompanyRelatedInfo.getMaxTabIndex(); tabIdx++) {
		var frm = elements.tabsCompanyRelatedInfo.getTabFormNameAt(tabIdx);
		forms[frm].controller.enabled = false;
		forms[frm].enableDisableElements(false);
//		var allFormElements = forms[frm].elements.allnames;
//		for(var i=0;i<allFormElements.length;i++) {
//			forms[frm].elements[allFormElements[i]].enabled = false;
//
//		}
	}
	
	forms.lst_companies.disableEnableFields(false);
}

/**
 * @properties={typeid:24,uuid:"628CC040-E127-4D31-8FBE-834A313D1A3E"}
 */
function hideBtnResetFields()
{
	_super.hideBtnResetFields();

	/*//disable the comboboxes
	elements.cbAccountManagers.enabled = false;
	elements.cbCompanyCategory.enabled = false;
	elements.cbCompanyIndustry.enabled = false;
	elements.cbCompanyType.enabled = false;
	elements.cbStatus.enabled = false;*/
	
	//show the email and website buttons 
	elements.btnOpenURL.visible = true;
	elements.btnSendEmail.visible = true;

	//enable the navpanel at the bottom and the form shown in the tabpanel
	/*
	Replace this code when the tab panel can be disabled bug with:
	elements.tabsCompanyRelatedInfo.enabled = false;
	var tabIndex = elements.tabsCompanyRelatedInfo.tabIndex;
	var frm = elements.tabsCompanyRelatedInfo.getTabFormNameAt(tabIndex);
	forms[frm].controller.enabled = true;
	 */
	for(var tabIdx = 1; tabIdx<=elements.tabsCompanyRelatedInfo.getMaxTabIndex(); tabIdx++) {
		var frm = elements.tabsCompanyRelatedInfo.getTabFormNameAt(tabIdx);
		forms[frm].controller.enabled = true;
		//forms[frm].controller.readOnly = false;
		//disable all elements in a form, they should be disabled during editing of the main form
		forms[frm].enableDisableElements(true);
//		var allFormElements = forms[frm].elements.allnames;
//		for(var i=0;i<allFormElements.length;i++) {
//			forms[frm].elements[allFormElements[i]].enabled = true;
//		}
	}
	
	//this code should be removed when the controller.enabled property works
	forms.lst_companies.disableEnableFields(true);
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1CBD9471-D582-4631-9B9B-7C9A81C73DD2"}
 */
function btnSave(event) {
	hideBtnResetFields();
	_super.btnSave(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E4786E4C-C66B-4390-ABE9-6CE3E81CFA6E"}
 */
function btnCancel(event) {
	hideBtnResetFields();
 	_super.btnCancel(event);
}

/**
 * @properties={typeid:24,uuid:"EE269983-8279-4264-A9B3-E1E3EAACC135"}
 */
function validate_beforeDelete()
{
	var ord = companies_to_orders.getSize()
	var cont = companies_to_contacts.getSize()

	if(ord > 0 || cont > 0)
	{
		//there are contacts and/or orders - so don't allow the delete
		if(ord > 0)
		{
			//show dialog and return 1
			globals.DIALOGS.showErrorDialog('Company with orders',"You can't delete a company that has orders. Delete all the related orders first.","OK")
			sub_showCompanyOrders();
			return 1;
		}

		if(cont > 0)
		{
			//show dialog
			globals.DIALOGS.showErrorDialog('Company with contacts',"You can't delete a company that has contacts related to it. Delete all the related contacts first.","OK")
			sub_showCompanyContacts();
			return 1;
		}
	}
	else
	{
		return 0;
	}
	return null;
}

/**
 * @public
 * @properties={typeid:24,uuid:"10B7EC9F-3606-4467-A0CA-7FAFC93BAD01"}
 */
function sub_showCompanyOrders()
{
	//load the records based on the companies to contacts relation
	forms.frm_orders.loadRecords(companies_to_orders);
	forms.lst_orders.loadRecords(companies_to_orders);
	
	//change the selected solution type in the main navigation to 'Orders'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_ORDERS_NAME);

	//change tabs in main navigation form
	forms.lst_solution_navigation.onRecordSelection();
	forms.frm_nav_top.sub_showShowAll();
}

/**
 * @properties={typeid:24,uuid:"EC7DA113-2093-4D75-9550-74F5ABB61DD5"}
 */
function sub_showCompanyContacts()
{
	//load the records based on the companies to contacts relation
	forms.frm_contacts.loadRecords(companies_to_contacts);
	forms.lst_contacts.loadRecords(companies_to_contacts);
	
	//change the selected solution type in the main navigation to 'Companies'
	forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_CONTACTS_NAME);

	//change tabs in main navigation form
	forms.lst_solution_navigation.onRecordSelection();
	forms.frm_nav_top.sub_showShowAll();
}

/**
 * @public
 * @properties={typeid:24,uuid:"EF2F2FB2-69E1-44FF-AE7A-1308CC7674EB"}
 */
function getCompanyId() {
	return company_id;
}

/**
 * @return {Number} The number of contacts in the currently selected company
 * 
 * @properties={typeid:24,uuid:"D3513462-050A-4A7A-BE7F-E0D24939E4AF"}
 */
function getNumberOfContactsForSelectedCompany(){
	return foundset.getSelectedRecord().companies_to_contacts.getSize();
}

/**
 * @return {Number} The number of addresses for the currently selected company
 * 
 * @properties={typeid:24,uuid:"F5A4BD69-BF03-4BFC-ADC3-EAF7E6CFBE35"}
 */
function getNumberOfAddressesForSelectedCompany(){
	return foundset.getSelectedRecord().companies_to_addresses.getSize();
}

/**
 * Set the active tab in the tabs panel
 * @param {Number} tabIndex
 *
 * @properties={typeid:24,uuid:"B38ED86E-11BC-45A1-9350-5CC14D190127"}
 */
function setTabPanel(tabIndex){
	elements.tabsCompanyRelatedInfo.tabIndex = tabIndex;
}
