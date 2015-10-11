
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"7859F09E-397B-48C3-858F-C2D6C81316D5"}
 */
function onBtnSetAddress(event) {
	contacts$cur_contactid.mail_address_id = address_id;
	databaseManager.saveData();
}
