
/**
 * Sort company names in ascending order
 * @param {JSEvent} event the event that triggered the action
 * @public
 * @properties={typeid:24,uuid:"74BBCFD4-AAAA-42F2-900A-1F30E1C2F6BA"}
 */
function btn_sortAsc(event) {
	_super.btn_sortAsc(event);
	foundset.sort('company_name asc');
}


/**
 * Sort company names in descending order
 * @param {JSEvent} event the event that triggered the action
 * @public
 * @properties={typeid:24,uuid:"79A1C98C-D54D-4D91-8F90-E8501183D865"}
 */
function btn_sortDesc(event) {
	_super.btn_sortDesc(event);
	foundset.sort('company_name desc');
}
/**
 * Get the selected record index and set it in a global variable. Needed for icon setting in companies table calculation displayIconOnRecord()
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D0C60ACE-7FA2-48B7-A9B8-186CFE0A9CDC"}
 */
function getSelectedRecordIndex() {
	globals.curID_company = company_id;
	forms.frm_nav_top.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getTableCount(foundset));
}

/**
 * @param {Boolean} flag
 *
 * @properties={typeid:24,uuid:"F07906F3-0F7F-4E20-AE35-ED6035BF7D39"}
 */
function disableEnableFields(flag){
	elements.lblCompanyName.enabled = flag;
	elements.lblSelectedCompany.enabled = flag;
}

