/**
 * @param event
 *
 * @properties={typeid:24,uuid:"D91FC963-4C17-4885-8115-F2FFD8A01D41"}
 */
function updateUI(event) {
	if (!testElementHasProperty("enabled")) elements.btnEnabled.visible = false;
	if (!testElementHasProperty("readOnly")) elements.btnReadOnly.visible = false;	
}