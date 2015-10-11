/**
 * The title of the dialog
 * 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2C14A028-D368-439F-8BA4-D1FFFEC113A4"}
 */
var vTitle = '';

/**
 * @type {Function}
 *
 * @properties={typeid:35,uuid:"CEA81BE6-E579-4222-92A2-2518659CC26C",variableType:-4}
 */
var bluePrintCleanupCallback;

/**
 * @type {Number}
 *
 * @private
 *
 * @properties={typeid:35,uuid:"DCD5FB3A-5CE9-49A9-B7AD-282D0A1B4069",variableType:4}
 */
var buttonCount = 0;

/**
 * @type {Function}
 * @protected
 * @properties={typeid:35,uuid:"EF3FD099-485C-4015-9592-3DF936D89721",variableType:-4}
 */
var callbackMethod = null;

/**
 * @type {Continuation}
 *
 * @properties={typeid:35,uuid:"7791D0F4-E210-4FE6-B137-8359E6BB3152",variableType:-4}
 */
var continuation;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"6F681452-1E7D-4320-AC85-9CFBB4B12030"}
 */
var returnValue = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EC0A188F-684C-4DCC-817B-AA573B9DD8FA"}
 */
var windowName = '';

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"ADA45A14-2D8B-4589-B22B-D1F22C28727E"}
 */
function onHide(event) {
	bluePrintCleanupCallback(controller.getName())
	
	//Handling continuation here only when dismissing the dialog
	//continuation variable is already set to null if a button was clicked
	if (continuation) { 
		continuation(returnValue)
	}
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"103B0923-620F-408A-BB23-ECA2B4E245B9"}
 */
function onButtonAction(event) {
	if (callbackMethod) {
		callbackMethod(event);
	}
	
	//Get Continuation object and store it locally, before closing the dialog, to prevent the execution of the continuation from within the onHide event
	var c = continuation;
	continuation = null;
	var win = application.getWindow(windowName);
	if (win) {
		win.destroy();
	}
	c(returnValue);
}

/**
 * @param {Array<String>} buttonArray
 * @param {Boolean} redraw
 * @param {Number} dialogWidth
 * @param {Number} dialogHeight
 *
 * @return {JSForm}
 * @properties={typeid:24,uuid:"F6D04F75-657A-4F47-B03A-97401A195681"}
 */
function setupButtons(buttonArray, redraw, dialogWidth, dialogHeight) {
	var oForm = solutionModel.getForm(controller.getName()),
		oMethod = solutionModel.getForm("dialogs_base").getMethod('onButtonAction'),
		oBtn,
		nBtnMinWidth = 80,
		nBtnWidth, // = _nBtnMinWidth,
		nBtnHeight = 20,
		xOffset = dialogWidth - 20,
		yOffset = dialogHeight - nBtnHeight - 20,
		aElement = elements.allnames,
		nDefaultCharWidth = 5,
		i, j, k;
	
	/** @type {Array<Array<RegExp>>} */
	var aGuesstimator = [[/[!il:;,\.]/, 3], [/\w/, 10]];

	oForm.newPart(JSPart.BODY, dialogHeight);

	for (i = 0; i < aElement.length; i++) {
		if (utils.stringLeft(aElement[i], 4) == 'btn_') {
			oForm.removeButton(aElement[i]);
		}
	}

	if (!application.getOSName() || !application.getOSName().match("Mac")) {
		buttonArray = buttonArray.reverse()
	}

	for (i = 0; i < buttonArray.length; i++) {

		// The Great Guesstimator! See if we can figure out how wide this text really is
		nBtnWidth = 0;
		for (j = 0; j < buttonArray[i].length; j++) {
			for (k = 0; k < aGuesstimator.length; k++) {
				if (aGuesstimator[k][0].test(buttonArray[i][j])) {
					nBtnWidth += aGuesstimator[k][1];
				} else if (k == aGuesstimator.length - 1) {
					nBtnWidth += nDefaultCharWidth;
				}
			}
		}
		// Add some padding and round up to the nearest 10 pixels
		nBtnWidth = Math.ceil( ( (nBtnWidth + 10) / 10)) * 10;
		// If the button is less than the minimum width use the minimum width instead
		nBtnWidth = (nBtnWidth < nBtnMinWidth ? nBtnMinWidth : nBtnWidth)

		oBtn = oForm.newButton(buttonArray[i], (xOffset - nBtnWidth), yOffset, nBtnWidth, nBtnHeight, oMethod);
		oBtn.name = "btn_" + (i + 1);
		xOffset = xOffset - nBtnWidth - 16;
	}

	if (! (redraw == false)) {
		controller.recreateUI();
	}
	buttonCount = buttonArray.length;
	return oForm;
}

/**
 * Abstract method, to be overridden by childforms
 * @param {Array|Object} aArguments
 * @param {String} sIconStyle
 * @param {Number} [par3]
 * @param {Number} [par4]
 * @param {Number} [par5]
 * 
 * @SuppressWarnings('wrongparameters')
 *
 * @properties={typeid:24,uuid:"74DE135A-C68C-4CA4-B889-E77359CD9700"}
 */
function setupForm(aArguments, sIconStyle, par3, par4, par5) { }

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B4DE3491-DFAF-4B5E-9E72-082991D5F107"}
 */
function onShow(firstShow, event) {
	if (buttonCount) {
		elements["btn_" + (application.getOSName().match("Mac") ? 1 : buttonCount)].requestFocus();
	}
}
