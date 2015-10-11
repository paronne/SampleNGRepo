/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A5ACB396-0C2A-4180-8E56-D989A828259E"}
 */
function handleButtonAction(event) {
	returnValue = elements[event.getElementName()] ? elements[event.getElementName()].text : ''; // button clicked (if any)
	// closing of the window is done by the inherited base form (dialogs_base)
}

/**
 * @param {Array<String>} aArguments
 * @param {String} sIconStyle
 * @param {Number} nDialogWidth
 * @param {Number} nDialogHeight
 *
 * @properties={typeid:24,uuid:"A5DBD403-02D5-4764-8330-D885B4C3DFAA"}
 */
function setupForm(aArguments, sIconStyle, nDialogWidth, nDialogHeight) {
	var aBtn = aArguments.slice(2, aArguments.length),
		oForm = setupButtons(aBtn, false, nDialogWidth, nDialogHeight),
		oLabel = oForm.newLabel("", 15, 15, 60, 60);

	oLabel.styleClass = sIconStyle;
	oLabel.mediaOptions = SM_MEDIAOPTION.ENLARGE |SM_MEDIAOPTION.REDUCE;
	
	oLabel = oForm.newLabel("", 90, 15, nDialogWidth - 100, 90);
	oLabel.styleClass = 'dialogs_message';
	oLabel.verticalAlignment = SM_ALIGNMENT.TOP;	
	/** @type {String} */
	var args1 = aArguments[1]
	if (args1.slice(0,5) === "i18n:") {			// is a i18n message
		args1 = i18n.getI18NMessage(args1)		// should check if message exists ?
	}
	
	oLabel.text = '<html>' + utils.stringReplace(utils.stringReplace(utils.stringReplace(args1, "\r\n", "<br />"), "\n", "<br />"), "\r", "<br />") + '</html>';

	controller.recreateUI();
	callbackMethod = handleButtonAction;
}
