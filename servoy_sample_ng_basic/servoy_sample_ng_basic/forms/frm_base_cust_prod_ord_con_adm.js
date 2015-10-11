
/**
 * Change the icon based on click - when clicked the asc sort button is disabled and the sort desc button is enabled.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"E96CD802-973A-45CB-8305-6B2220EDC94C"}
 */
function btn_sortAsc(event) {
	elements.btnAsc.enabled = false;
	elements.btnDesc.enabled = true;
}

/**
 * Change the icon based on click - when clicked the desc sort button is disabled and the sort asc button is enabled.
 *  Reverse of function btn_sortAsc
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2D16DDC8-CE6C-47CA-ADD6-D29EB902CADE"}
 */
function btn_sortDesc(event) {
	elements.btnDesc.enabled = false;
	elements.btnAsc.enabled = true;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"9A02077C-E8D6-40D6-BB7C-A3678D66E021"}
 */
function onShow(firstShow, event) {
	btn_sortAsc(event);
}
