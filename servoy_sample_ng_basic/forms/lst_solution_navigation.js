
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"A3EF7426-8C62-4AA8-8CA0-59906BBCEA07"}
 */
function onShow(firstShow, event) {
		foundset.setSelectedIndex(1);
}

/**
 * Handle record selected.
 *
 * @public
 *
 * @properties={typeid:24,uuid:"C3C948FF-CF1E-4184-90A9-E2638B8B7B6A"}
 */
function onRecordSelection() {
	//the if check should not be here if controller.enabled = false works
	if(elements.lblIcon.enabled){
		forms.lst_nav_main.enableTab(foundset.item_name);
		forms.main.setSelectedTabDetailsOverviewSolution(foundset.item_name);
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} resourceName The name of the selected record
 * @public
 * @properties={typeid:24,uuid:"2D8DCB3F-82BD-4EF4-81C0-6EBD87F9C039"}
 * @AllowToRunInFind
 */
function setSelectedIndex(resourceName){
	//find the record with item_name = resourceName
	for(var i = 1; i<=foundset.getSize(); i++){
		if(foundset.getRecord(i).item_name.equalsIgnoreCase(resourceName)){
			foundset.setSelectedIndex(i);
			break;
		}
	}
}

/**
 * @return {String} the name of the resource shown in the navigation menu
 * @public
 * @properties={typeid:24,uuid:"C8739D51-E29E-4DDF-9B16-F8F8428C6582"}
 */
function getSelectedRecord(){
	return foundset.item_name;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param disabled
 *
 * @properties={typeid:24,uuid:"6FE685FF-1838-414B-AEFB-778B7C3EDE15"}
 */
function disableRecordSelection(flag){
	//controller.enabled = flag;
	elements.lblIcon.enabled = flag;
	elements.lblItemName.enabled = flag;
}