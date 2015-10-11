/**
 * @constructor
 *
 * @description Dialog module - https://www.servoyforge.net/projects/mod-dialog
 * @version 1.1.5
 *
 * Written by Robert J.C. Ivens and Paul Bakker
 * OS dependent button-reverse patch by Harjo Kompagnie
 *
 * @properties={typeid:35,uuid:"EFF9564C-DBDB-4087-A9DF-A56826FE2CC7",variableType:-4}
 */
var DIALOGS = new function() {
	/**
	 * @type String
	 */
	var sStyleSheet = 'dialogs_default'; // forms.dialogs_stylesheet is there to make sure any export of the module will bring along this stylesheet

	/**
	 * @type Number
	 */
	var nDialogWidth = 500;

	/**
	 * @type Number
	 */
	var nDialogHeight = 200 // MINOX: original value: 150;

	/*
	 * For every dialog shown a solutionModel clone of a dialogs_xxxx form is created, in order to be able to stack multiple dialogs
	 * In order to prevent a memory leak, the clones need to be cleaned up after use.
	 *
	 * Previous logic tried to accomplish this in the onHide event of the dialog i.c.w. the scheduler plugin,
	 * but this had it's flaws and required application.sleep(100) to work correctly, while also reducing the UX
	 *
	 * With the new logic the dialog calls back to markBluePrintsForCleanup() in it's onHide event.
	 * The markBluePrintsForCleanup() method stored the formName in the bluePrintStack
	 * When getting a new blueprint is requested, all clones are removed by looping through the bluePrintStack
	 */
	var bluePrintStack = []

	function markBluePrintsForCleanup(formName) {
		application.output('Marking form "' + formName + '" for cleanup', LOGGINGLEVEL.DEBUG);
		bluePrintStack.push(formName);
	}
	
	var terminator = (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT ? new Continuation() : null);

	/**
	 * Method to terminate the current method execution after capturing a Continuation.
	 */
	function terminateCurrentMethodExecution() {
		terminator();
	}

	/**
	 * @private
	 *
	 * @param {String} sFormName
	 * @param {String} sBaseFormName
	 * @param {Number} nWidth
	 * @param {Number} nHeight
	 */
	function newFormBluePrint(sFormName, sBaseFormName, nWidth, nHeight) {
		//Cleanup of previously used blueprints
		/** @type {String} */
		var formName;
		for (var i = 0; i < bluePrintStack.length; i++) {
			formName = bluePrintStack[i];
			application.output('Cleaning up form "' + formName + '"', LOGGINGLEVEL.DEBUG);
			if (history.removeForm(formName)) {
				bluePrintStack.splice(i, 1);
				i--;	// reduce i since the bluePrintStack has been reduced
				if (!solutionModel.removeForm(formName)) {
					application.output("Can't remove dialog form '" + formName + "'", LOGGINGLEVEL.ERROR);
				}
			} else {
				application.output("Can't remove dialog form '" + formName + "' from history", LOGGINGLEVEL.ERROR);
			}
		}

		//Create requested blueprint
		if (!forms[sFormName]) {
			var oForm = solutionModel.newForm(sFormName, forms[sBaseFormName].controller.getDataSource(), sStyleSheet, false, nWidth, nHeight);
			oForm.extendsForm = sBaseFormName;

			//Store pointer to otherwise private method on the form, to be used when hiding the form
			forms[sFormName]['bluePrintCleanupCallback'] = markBluePrintsForCleanup;
		} else {
			application.output("Form '" + sFormName + "' already exists.", LOGGINGLEVEL.ERROR);
		}
	}

	/**
	 * @private
	 *
	 * @param {String} sFormName
	 * @param {String} sDlgType
	 * @param {Array|Object} aArguments
	 * @param {String} [sIconStyle]
	 *
	 * @return {String}
	 */
	function showDialog(sFormName, sDlgType, aArguments, sIconStyle) {
		
		/** @type {Object} */
		var aArgs = Array.prototype.slice.call(aArguments),
			nWidthPadding = 0 ,// MINOX: original value: 22,
			dialogWindow;
		
		/** @type {String} */
		var sUniqueName = aArgs[8] || utils.stringReplace(application.getUUID().toString(), "-", "");

		if(aArgs[0] instanceof  RuntimeForm) aArgs[0] = aArgs[0].controller.getName()
		
		/** @type {String} */
		var formName = aArgs[0]
		
		if (sDlgType == 'FIMD') {
			dialogWindow = application.createWindow("W_" + sUniqueName, JSWindow.MODAL_DIALOG);
			/** @type {Number} */
			var xLocation;
			/** @type {Number} */
			var yLocation;
			
			// get xLocation
			if (aArgs[1] || aArgs[1] == 0) {
				xLocation = aArgs[1]
			} else {
				xLocation = JSWindow.DEFAULT
			}
			// get yLocation
			if (aArgs[2] || aArgs[2] == 0) {
				yLocation = aArgs[2]
			} else {
				yLocation = JSWindow.DEFAULT
			}
			
			dialogWindow.setLocation(xLocation, yLocation);
			dialogWindow.title = aArgs[5]||solutionModel.getForm(formName).titleText||formName
			
			dialogWindow.resizable = (aArgs[6] == null ? true : aArgs[6]);
			dialogWindow.undecorated = (aArgs[9] && aArgs[9] != undefined ? aArgs[9]: false) //false : true); // MINOX
			
			/** @type {Boolean} */
			var showTextToolbar = aArgs[7]
			
			dialogWindow.showTextToolbar(showTextToolbar == null ? false : showTextToolbar);
			forms[formName]['windowName'] = "W_" + sUniqueName;

			/** @type {Number} */
			var nWidth = (aArgs[3] == null || aArgs[3] == JSWindow.DEFAULT) ? solutionModel.getForm(formName).width : aArgs[3];
			/** @type {Number} */
			var nHeight = (aArgs[4] == null || aArgs[4] == JSWindow.DEFAULT) ? solutionModel.getForm(formName).getBodyPart().height : aArgs[4];
			if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
				
				newFormBluePrint(sUniqueName, 'dialogs_fimd', nWidth, nHeight);
				// TODO MINOX why in Servoy 7 is this used ?
				// newFormBluePrint(_sUniqueName, 'dialogs_fimd', 100, 40); 

				/** @type {RuntimeForm<dialogs_fimd>}*/
				var form = forms[sUniqueName];
				form.continuation = new Continuation(); // saves the current methodStack into variable x, so it can be continued later on
				form.windowName = "W_" + sUniqueName;
				
				//	Why is this breaking ? (sean)
				if(form.setupForm)
					form.setupForm(formName, nWidth, nHeight);

				// Need to add 22 pixels to the width with the original (built-in) servoy stylesheet or else you get scrollbars. You may want to adjust this value when you use a custom (override) stylesheet
				dialogWindow.setSize(nWidth + nWidthPadding, nHeight);
				dialogWindow.show(form);
				terminateCurrentMethodExecution()
			} else {
				/** @type {Number} */
				var argWidth = aArgs[3]
				/** @type {Number} */
				var argHeight =  aArgs[4]
				dialogWindow.setSize(argWidth || JSWindow.DEFAULT, argHeight || JSWindow.DEFAULT);
				dialogWindow.show(forms[formName]);
			}

		} else {
			if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {

				dialogWindow = application.createWindow(sUniqueName, JSWindow.MODAL_DIALOG);
				dialogWindow.setInitialBounds(JSWindow.DEFAULT, JSWindow.DEFAULT, JSWindow.DEFAULT, JSWindow.DEFAULT);
				dialogWindow.title = formName;

				dialogWindow.resizable = false;
                dialogWindow.undecorated = true; // MINOX edit
				dialogWindow.showTextToolbar(false);

				newFormBluePrint(sUniqueName, sFormName, nDialogWidth, nDialogHeight);
				/** @type {RuntimeForm<dialogs_base>}*/
				var dialog = forms[sUniqueName];
				dialog.continuation = new Continuation(); // saves the current methodStack into variable x, so it can be continued later on
				dialog.windowName = sUniqueName;

				switch (sDlgType) {
				case 'input':
					// TODO: MINOX uses different argument for the setupForm. WHY ?
					/** @type {Number} */
					var top = aArgs[2]
					dialog.setupForm([aArgs[1], i18n.getI18NMessage('servoy.button.ok'), i18n.getI18NMessage('servoy.button.cancel')], sIconStyle, top, nDialogWidth, nDialogHeight + 30);
					break;
				case 'select':
					dialog.setupForm([aArgs[1], aArgs[2], i18n.getI18NMessage('servoy.button.ok'), i18n.getI18NMessage('servoy.button.cancel')], sIconStyle, nDialogWidth, nDialogHeight + 30);
					break;
				default:
					dialog.setupForm(aArgs, sIconStyle, nDialogWidth, nDialogHeight);
				}
				dialogWindow.show(dialog);

				terminateCurrentMethodExecution();

			} else if (application.getApplicationType() === APPLICATION_TYPES.SMART_CLIENT || application.getApplicationType() === APPLICATION_TYPES.NG_CLIENT || application.getApplicationType() === APPLICATION_TYPES.RUNTIME_CLIENT) {

				// Turn the Arguments into a real Array
				/** @type {Array} */
				var aArgArray = [].slice.call(aArgs),
					sReturnValue;

				// Process the array and make it in a string we can use in eval
				aArgArray.forEach(parseArgumentList);

				switch (sDlgType) {
				case 'warning':
					eval('sReturnValue = plugins.dialogs.showWarningDialog(' + aArgArray.join(",") + ' )');
					break;
				case 'error':
					eval('sReturnValue = plugins.dialogs.showErrorDialog(' + aArgArray.join(",") + ' )');
					break;
				case 'info':
					eval('sReturnValue = plugins.dialogs.showInfoDialog(' + aArgArray.join(",") + ' )');
					break;
				case 'question':
					// TODO MINOX changes: 
					if (aArgArray.length<3) {
		 	 	 	 	 aArgArray.push("'"+i18n.getI18NMessage('svy.fr.lbl.yes')+"'");
		 	 	 	 	 aArgArray.push("'"+i18n.getI18NMessage('svy.fr.lbl.no')+"'");	 	
					}
					eval('sReturnValue = plugins.dialogs.showQuestionDialog(' + aArgArray.join(",") + ' )');
					break;
				case 'input':
					eval('sReturnValue = plugins.dialogs.showInputDialog(' + aArgArray.join(",") + ' )');
					break;
				case 'select':
					eval('sReturnValue = plugins.dialogs.showSelectDialog(' + aArgArray.join(",") + ' )');
					break;
				}
				return sReturnValue;

			}
		}

		/**
		 * @private
		 * @param {Array|String} oValue
		 * @param {Number} nIndex
		 * @param {Array} aArray
		 */
		function parseArgumentList(oValue, nIndex, aArray) {
			if (oValue instanceof String) {
				aArray[nIndex] = "'" + oValue.replace(/\'/g, "\\'").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
			} else if (oValue instanceof Array) {
				aArray[nIndex] = "['" + oValue.join("','") + "']";
			}
		}

		return null;
	}

	/**
	 * Set the stylesheet of the next dialog window
	 *
	 * @param {String} stylesheetName
	 */
	this.setStylesheet = function(stylesheetName) {
		sStyleSheet = stylesheetName;
	}

	/**
	 * Set the width of the next dialog window
	 *
	 * @param {Number} width
	 */
	this.setDialogWidth = function(width) {
		// width may not be smaller than 100
		nDialogWidth = (width < 100 ? 500 : width);
	}

	/**
	 * Set the height of the next dialog window
	 *
	 * @param {Number} height
	 */
	this.setDialogHeight = function(height) {
		// height may not be smaller than 100
		nDialogHeight = (height < 100 ? 100 : height);
	}

	/**
	 * Reset the width/height of the next dialog window to the default values
	 */
	this.resetDialogSize = function() {
		nDialogWidth = 500;
		nDialogHeight = 150;
	}

	/**
	 * Get the version of the dialogs module
	 *
	 * @return {String}
	 */
	this.getVersion = function() {
		return '1.1.5';
	}

	/**
	 * Show an error dialog
	 *
	 * @param {String} title
	 * @param {String} message
	 * @param {...String} buttons
	 * @return {String}
	 */
	this.showErrorDialog = function(title, message, buttons) {
		return showDialog('dialogs_message', 'error', arguments, 'dialogs_icon_error');
	}

	/**
	 * Show a warning dialog
	 *
	 * @param {String} title
	 * @param {String} message
	 * @param {...String} buttons
	 * @return {String}
	 */
	this.showWarningDialog = function(title, message, buttons) {
		return showDialog('dialogs_message', 'warning', arguments, 'dialogs_icon_warning');
	}

	/**
	 * Show an info dialog
	 *
	 * @param {String} title
	 * @param {String} message
	 * @param {...String} buttons
	 * @return {String}
	 */
	this.showInfoDialog = function(title, message, buttons) {
		return showDialog('dialogs_message', 'info', arguments, 'dialogs_icon_info');
	}

	/**
	 * Show a question dialog
	 *
	 * @param {String} title
	 * @param {String} message
	 * @param {...String} buttons
	 * @return {String}
	 */
	this.showQuestionDialog = function(title, message, buttons) {
		return showDialog('dialogs_message', 'question', arguments, 'dialogs_icon_question');	// MINOX change
	}

	/**
	 * Show an input dialog
	 *
	 * @param {String} title
	 * @param {String} message
	 * @param {String} [initialValue]
	 * @return {String}
	 */
	this.showInputDialog = function(title, message, initialValue) {
		return showDialog('dialogs_input', 'input', arguments, 'dialogs_icon_generic');
	}

	/**
	 * Show a select dialog
	 *
	 * @param {String} title
	 * @param {String} message
	 * @param {...String|Array<String>} optionArray
	 * @return {String}
	 */
	this.showSelectDialog = function(title, message, optionArray) {
		return showDialog('dialogs_select', 'select', arguments, 'dialogs_icon_generic');
	}

	/**
	 * Show a Form In Modal Dialog
	 *
	 * @param {String|RuntimeForm} formName
	 * @param {Number} [left]
	 * @param {Number} [top]
	 * @param {Number} [width]
	 * @param {Number} [height]
	 * @param {String} [title]
	 * @param {Boolean} [resizable]
	 * @param {Boolean} [showTextToolbar]
	 * @param {String} [windowName]
	 * @param {Boolean} [decorated]
	 * 
	 */
	this.showFormInModalDialog = function(formName, left, top, width, height, title, resizable, showTextToolbar, windowName, decorated) {
		showDialog(null, 'FIMD', arguments);
	}
};
