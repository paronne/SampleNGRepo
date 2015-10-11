/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"97109D98-5F78-4A9E-97AF-B402668422CB"}
 */
var retVal = '';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3B06D392-0811-453F-A67D-1E8070EA7434"}
 */
function handleButtonAction(event) {
	if (event.getElementName() == 'fldValue' || (elements[event.getElementName()] ? elements[event.getElementName()].text : '') == i18n.getI18NMessage('servoy.button.ok')) {
		returnValue = retVal;
	}
	// closing of the window is done by the inherited base form (dialogs_base)
}

/**
 * @param {Array<String>} aArguments
 * @param {String} sIconStyle
 * @param {String} initialValue
 * @param {Number} nDialogWidth
 * @param {Number} nDialogHeight
 *
 * @properties={typeid:24,uuid:"2693E5DA-09D0-4081-AB5E-4F4354D3CF6D"}
 */
function setupForm(aArguments, sIconStyle, initialValue, nDialogWidth, nDialogHeight) {
	var aBtn = aArguments.slice(1, aArguments.length),
		oForm = setupButtons(aBtn, false, nDialogWidth, nDialogHeight),
		oLabel = oForm.newLabel("", 15, 15, 60, 60);
	oLabel.styleClass = sIconStyle;
	oLabel.mediaOptions = SM_MEDIAOPTION.ENLARGE | SM_MEDIAOPTION.REDUCE
	
	oLabel = oForm.newLabel("", 90, 15, nDialogWidth - 100, 90);
	oLabel.styleClass = 'dialogs_message';
	oLabel.verticalAlignment = SM_ALIGNMENT.TOP;
	/** @type {String} */
	var args0 = aArguments[0]
	oLabel.text = '<html>' + utils.stringReplace(utils.stringReplace(utils.stringReplace(args0, "\r\n", "<br />"), "\n", "<br />"), "\r", "<br />") + '</html>';
	controller.recreateUI();
	elements.fldValue.setLocation(85, nDialogHeight - 71);
	elements.fldValue.setSize(nDialogWidth - 120, 20);
	retVal = initialValue;
	callbackMethod = handleButtonAction;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"337193E1-6AC6-44F6-B81D-47443EDC2283"}
 */
function onInputAction(event) {
	_super.onButtonAction(event);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A01D6297-D3B3-47C0-AAFA-23CAF1CAFF8E"}
 */
function onShow(firstShow, event) {
	elements.fldValue.requestFocus();
}
