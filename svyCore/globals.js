/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"d6f71666-3c3d-4392-a383-e0eb9d30bc03",variableType:4}
 */
var core_appTypeInt;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1e926109-e6f5-464c-a4a8-b943b404d699"}
 */
var core_appTypeWords = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"76206c5e-0cf1-4910-8dfb-e2f1eed5f594"}
 */
var core_color_bgRowColor = '#f0f0f0';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"66c65bd1-79b4-452e-a9a8-d48e5fa1e290"}
 */
var core_color_defaultBgColor = '#ffffff';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"b17ce7d9-319c-4f9d-8081-fabf143909ec",variableType:4}
 */
var core_const_1 = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4c05d7df-68d3-4e54-ace8-f3ff8268563d",variableType:4}
 */
var core_const_2 = 2;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"b1270d55-e693-43ae-9b15-2eeb6429e55a",variableType:4}
 */
var core_const_3 = 3;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3bf82ed8-910f-4271-b5ec-0a85b28a29dd",variableType:4}
 */
var core_const_4 = 4;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"e0eb4220-bb73-4bb9-b8db-1d14b51a01cd",variableType:4}
 */
var core_const_5 = 5;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"e32771a5-4650-42cf-a343-190b3f16f1be"}
 */
var core_dlg_buttonPressed = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6edaec9b-7ec0-4383-8278-77b882995719",variableType:4}
 */
var core_dlg_didAlter = 0;

/**
 * @properties={typeid:35,uuid:"66c4148e-b0d7-44a0-9876-924e757be66b",variableType:-4}
 */
var core_dlg_elementDisableEnable;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"70e5ac48-5a94-4865-9994-7924f3b54ee6"}
 */
var core_dlg_elementName = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7953218c-3dc2-4237-9203-b191e4da4ae6"}
 */
var core_dlg_formName = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2d8c16ef-0cc6-42dc-bfa4-db108a7cfbbc"}
 */
var core_dlg_methodToExecute = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"abc2a97e-2db5-4464-a810-52c907383b5f",variableType:4}
 */
var core_dlg_origHeight;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"469b8157-2143-47ae-8cb6-3e84d9d69f8c",variableType:4}
 */
var core_dlg_origVisible;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2ff5b60d-e83f-4220-a59f-b9acea160251",variableType:4}
 */
var core_dlg_origWidth;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"95e2bd50-f013-4e4e-a91a-5514628bbfa9",variableType:4}
 */
var core_dlg_origX;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"51043485-8974-4cca-a9b5-0f1000dc911c",variableType:4}
 */
var core_dlg_origY;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"97ac0771-aeb2-4635-af70-386164dd901a"}
 */
var core_dlg_text = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0688908d-42fd-4e39-9388-bc1aab1ea1fd"}
 */
var core_dlg_title = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"bb951e4f-5f33-41d8-9531-c43a13b7faf4"}
 */
var core_sql_sqlQuery = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"a4b74fef-6e13-4b91-87bf-49b9ee141985"}
 */
var core_sql_sqlResult = '';

/**
 * @properties={typeid:35,uuid:"13016a3d-2b81-4f3a-af86-87c63c988148",variableType:-4}
 */
var core_sql_sqlResultSet;

/**
 * @type {Function}
 * 
 * @properties={typeid:35,uuid:"C7183094-E0CA-4CDD-BF35-E1B01F03FF25",variableType:-4}
 */
var callback = null;

/**
 * @properties={typeid:24,uuid:"34f62467-b721-40cf-8a5d-dbf4ce868e75"}
 */
function core_enableDisableElements()
{
	if(globals.core_dlg_elementDisableEnable)
	{
		/** @type {Array} */
		var myArray = globals.core_dlg_elementDisableEnable
		if(myArray.length > 0)
		{
			//there is something in there in array form
			for ( var i = 0 ; i < myArray.length ; i++ )
			{
				if(eval(myArray[i] + '.enabled == true'))
				{
					eval(myArray[i] + '.enabled = false')
				}
				else
				{
					eval(myArray[i] + '.enabled = true')
				}
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"661d5c12-ebc3-4c0c-93a2-af65f6ab89bf"}
 */
function core_setupAppType()
{
	var appName = 'Servoy '
	var appType = application.getApplicationType()

	if(appType != 1 && appType != 6 && appType != 3)
	{
		appName += 'Server'
	}
	else if(appType == 3)
	{
		appName += 'Developer'
	}
	else if(appType == 1)
	{
		appName += 'Server (1)'
	}
	else if(appType == 6)
	{
		appName += 'Runtime'
	}

	globals.core_appTypeInt = appType
	globals.core_appTypeWords = appName
}

/**
 * @param {String} arg0 // TODO generated, please specify type and doc
 * @param {String} arg1 // TODO generated, please specify type and doc
 * @param {String} arg2 // TODO generated, please specify type and doc
 * @param {String} arg3 // TODO generated, please specify type and doc
 * @param {String} arg4 // TODO generated, please specify type and doc
 * @param {String} arg5 // TODO generated, please specify type and doc
 * @param {String} arg6 // TODO generated, please specify type and doc
 * @param {String} arg7 // TODO generated, please specify type and doc
 *
 * @properties={typeid:24,uuid:"5137D3CC-20F4-4348-BD2C-88152BA5048B"}
 */
function core_showWcGenericDialog(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7)
{
	var title = arg0;
	var msg = arg1
	var mthd = arg2 //method to execute after the dialog closes
	var icon = arg3 //can be 'error, info, question, warning, forbidden'
	var btn1 = arg4 //btn1
	var btn2 = arg5 //btn2
	var btn3 = arg6 //btn3
	var btn4 = arg7 //btn4
	
	if(!btn1) btn1 = 'OK'
	if(!btn2) btn2 = null
	if(!btn3) btn3 = null
	if(!btn4) btn4 = null
	
	//method to execute after dismissal of dialog
	globals.core_dlg_methodToExecute = mthd
	
	
	//NOTE: Change "-1" to "3" if you want to use the built-in dialog
	if(application.getApplicationType() <= -1)  //smart client/developer/server
	{
		//show the "real" dialog type
		switch( icon )
		{
			case 'error': plugins.dialogs.showErrorDialog( title,  msg, btn1, btn2, btn3, btn4); break;
			case 'info': plugins.dialogs.showInfoDialog( title,  msg, btn1, btn2, btn3, btn4); break;
			case 'question': plugins.dialogs.showQuestionDialog( title,  msg, btn1, btn2, btn3, btn4); break;
			case 'warning': plugins.dialogs.showWarningDialog( title,  msg, btn1, btn2, btn3, btn4); break;
			default: plugins.dialogs.showInfoDialog( title,  msg, btn1, btn2, btn3, btn4);
		}
	}
	else
	{
		
		//setup buttons
		forms.core_dlg_generic.setup_buttons(btn1, btn2, btn3, btn4)
		
		if(!title || title == undefined) title = ''
		if(!msg || msg == undefined) msg = ''
		
		
		forms.core_dlg_generic.hide_allIcons();
		globals.core_dlg_title = title
		globals.core_dlg_text = msg
		
		//show the right message box - either HTML or text based on message
		if(msg.indexOf('<html>') >= 0)
		{
			forms.core_dlg_generic.elements.fld_dlgHTML.visible = true
			forms.core_dlg_generic.elements.fld_dlgText.visible = false
		}
		else
		{
			forms.core_dlg_generic.elements.fld_dlgHTML.visible = false
			forms.core_dlg_generic.elements.fld_dlgText.visible = true
		}
		
		switch( icon )
		{
			case 'error': forms.core_dlg_generic.show_iconError(); break;
			case 'info': forms.core_dlg_generic.show_iconInfo(); break;
			case 'question': forms.core_dlg_generic.show_iconQuestion(); break;
			case 'warning': forms.core_dlg_generic.show_iconWarning(); break;
			case 'forbidden': forms.core_dlg_generic.show_iconForbidden(); break;
			default: forms.core_dlg_generic.show_iconInfo();
		}
		
		//disable any elements behind the dialog
		globals.core_enableDisableElements();
		
//		application.showFormInDialog(forms.core_dlg_generic, -1,-1,-1,-1,  title,  false, false, "Dialog", true)
		var win = application.createWindow("Dialog", JSWindow.MODAL_DIALOG);
		win.setInitialBounds(-1, -1, -1, -1);
		win.title= title;
		win.show(forms.core_dlg_generic);
	}
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Function} funct
 *
 * @properties={typeid:24,uuid:"434F78BB-DE9A-432F-9859-73A7B488350D"}
 */
function callback_BgElements(funct) {
	if (funct != null)
		callback = funct();
}
