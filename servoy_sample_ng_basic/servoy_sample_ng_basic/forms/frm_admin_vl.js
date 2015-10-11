/**
 * @properties={typeid:24,uuid:"0C56607A-9164-44D2-BEC2-EB621055B7E8"}
 */
function doEdit() {
	controller.readOnly = false;
	elements.btnAdd.visible = true;
	elements.btnDelete.visible = true;
}

/**
 * @properties={typeid:24,uuid:"A2E365B9-6B1E-44ED-B4AF-06DEBCABC47E"}
 */
function endEdit() {
	controller.readOnly = true;
	elements.btnAdd.visible = false;
	elements.btnDelete.visible = false;
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"CAA6367B-1E4F-4046-992D-1270216D4C87"}
 */
function btnAdd(event) {
	/** @type Number*/
	var idx = elements.tabsValuelists.tabIndex;
	var frm = elements.tabsValuelists.getTabFormNameAt(idx);
	
	
	forms.frm_admin.doEdit();
	forms[frm].addNewRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5EE79297-97C7-4387-BE10-D23E3711EFCC"}
 */
function btnDelete(event) {
	//show delete warning dialog
	var answer = globals.DIALOGS.showErrorDialog("Delete value list item",'Are you sure you want to permanently delete this value list item?','Cancel', 'Delete');

	//if delete is pressed, remove that item
	if(answer.equalsIgnoreCase('Delete')){
		/** @type Number*/
		var idx = elements.tabsValuelists.tabIndex;
		var frm = elements.tabsValuelists.getTabFormNameAt(idx);
		
		forms[frm].deleteSelectedRecord();
	}
}

