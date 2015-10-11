/**
 * Get the selected record index and set it in a global variable. Needed for icon setting in products table calculation displayIconOnRecord()
 *
 * @protected
 * 
 * @properties={typeid:24,uuid:"174B357D-2F78-40EF-88C1-4AC88DC92DDF"}
 */
function getSelectedRecordIndex() {
	globals.curID_product = product_id;
	forms.frm_nav_top.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getTableCount(foundset));
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"31858952-F6B7-408A-992B-25FC2ED2EADB"}
 */
function btn_sortAsc(event) {
	_super.btn_sortAsc(event);
	if(product_number) {
		foundset.sort('product_number asc');
	}
	else if(product_name){
		foundset.sort('product_name asc');
	}
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @public
 *
 * @properties={typeid:24,uuid:"4B0D47E9-D651-466D-8873-5D86ED541738"}
 */
function btn_sortDesc(event) {
	_super.btn_sortDesc(event);
	if(product_number) {
		foundset.sort('product_number desc');
	}
	else if(product_name){
		foundset.sort('product_name desc');
	}
	
}

/**
 * @param {Boolean} flag
 *
 * @properties={typeid:24,uuid:"D94FEEAD-8856-4FA6-9830-08ADA23A3B27"}
 */
function disableEnableFields(flag){
	elements.lblProductName.enabled = flag;
	elements.lblProductBtn.enabled = flag;
	controller.readOnly = flag;
	controller.enabled = flag;
}