/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8FDA4C2D-E92E-4FD5-990F-6D76442D2722"}
 */
function nextRecord(event) {
	_super.nextRecord(event, foundset, databaseManager.getFoundSetCount(foundset));
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"DA65E1AA-AF95-49A8-96CD-CE9134745F27"}
 */
function previousRecord(event) {
	_super.previousRecord(event, foundset, databaseManager.getFoundSetCount(foundset));
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"278D0388-6875-4594-92F2-81B423929089"}
 */
function onRecordSelection(event) {
	_super.setLblRecordTextAndNavigation(foundset.getSelectedIndex(),databaseManager.getFoundSetCount(foundset));
	sub_setPreviewLabels();
}

/**
 * @properties={typeid:24,uuid:"4DBE1006-5699-47C7-8F2C-91B32A46223B"}
 */
function hideBtnResetFields()
{
	_super.hideBtnResetFields();

	//hide the image buttons
	elements.btnAddImage.visible = false;
	elements.btnDeleteImage.visible = false;


	//disable the comboboxes
	elements.cbStatus.enabled = false;
	
	//disable record navigation when in edit mode
	forms.lst_products.disableEnableFields(true);
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"6163F02D-165C-4622-AFCC-B0A4AAB91223"}
 */
function btnSave(event) {
 	_super.btnSave(event);
 	hideBtnResetFields();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"779575AA-F585-447C-9191-7496E2C8C5E2"}
 */
function btnCancel(event) {
	_super.btnCancel(event);
	hideBtnResetFields();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"61768478-4196-48D2-BC0F-3FAE3F841C80"}
 */
function onShow(firstShow, event) {
	_super.onShow(firstShow,event);
	if(!globals.isEditing()) {
		hideBtnResetFields();
	}
}

/**
 * @properties={typeid:24,uuid:"31752504-068A-443B-92EE-25242B699504"}
 */
function doEdit()
{
	_super.doEdit();

	elements.btnAddImage.visible = true;

	if(product_image)
	{
			elements.btnDeleteImage.visible = true;
	}

	//enable the combobox
	elements.cbStatus.enabled = true;
	
	//disable record navigation when in edit mode
	forms.lst_products.disableEnableFields(false);
}

/**
 * @properties={typeid:24,uuid:"0D0683E0-B76D-4DE1-9F48-A425D2628FEC"}
 */
function btnAddImage()
{
	databaseManager.setAutoSave(false);
	
	//Shows a file open dialog, by default files and folders can be selected
	var file = plugins.file.showFileOpenDialog(0,globals.default_image_directory);

	//if they didn't "cancel" this dialog
	if(file)
	{
		//read in the file
		var rawData = plugins.file.readFile(file.getAbsolutePath());

		if(rawData)
		{
			var fileName = file.getName();
			var ext = utils.stringRight(fileName, 3);
			var type = plugins.images.getImage(rawData);
			var contentType = type.getContentType();
	
			if(utils.stringPatternCount(contentType, 'image') > 0)
			{
				//it's an image we can display
//				image_thumbnail = application.createJPGImage(rawData, 90, 90);
				
				var img_raw = plugins.images.getImage(rawData);
				image_thumbnail = img_raw.resize(90,90);
				globals.smart_chg = 1;
			}
			else
			{
				//there will be no display
				image_thumbnail = null;
				//show error message!
//				globals.svyCore_dlg_warning('<html>This is<b> NOT an image file!</b><br>Please select a different file.</html>','','OK') - the method is not defined
				return;
			}

			image_name = fileName;
			image_type = ext;
			image_mime_type = contentType;
			product_image = rawData;

			sub_setPreviewLabels();
		}
	}
}

/**
 * @properties={typeid:24,uuid:"64FA3E0F-0CEA-4904-AC11-44307F40DC74"}
 */
function product_image_dataChange() {
	databaseManager.setAutoSave(false);
	
	if (globals.smart_chg == 0) {
		var rawData = product_image;

		if(rawData)
		{
			var fileName = product_image_filename;
			var ext = utils.stringRight(fileName, 3);
			var type = plugins.images.getImage(rawData);
			var contentType = type.getContentType();

			if(utils.stringPatternCount(contentType, 'image') > 0)
			{
				//it's an image we can display
				//image_thumbnail = application.createJPGImage(rawData, 90, 90);  - depricated method

				var img_raw = plugins.images.getImage(rawData);
				image_thumbnail = img_raw.resize(90,90);
			}
			else
			{
				//there will be no display
				image_thumbnail = null;
				//show error message!
//				globals.svyCore_dlg_warning('<html>This is<b> NOT an image file!</b><br>Please select a different file.</html>','','OK') - the method is not defined
				return;
			}
			image_type = ext;
			image_name = product_image_filename;
			image_mime_type = product_image_mimetype;

			sub_setPreviewLabels();
		}
	}
	else {
		globals.smart_chg = 0;
	}
	if (product_image_mimetype == null)
	{
		image_mime_type = null
		image_name = null
		image_thumbnail = null
		image_type = null
		product_image = null;
		product_image_filename = null;
		product_image_mimetype = null;
		sub_setPreviewLabels();
	}
}

/**
 * @properties={typeid:24,uuid:"E5915138-DA24-4264-B193-AAAA34EAB3F7"}
 */
function btnDeleteImage()
{
	if(product_image)
	{
		//show a warning dialog
		var answer = globals.DIALOGS.showWarningDialog('Delete image','Are you sure you want to delete this image?','Cancel','Delete');
		if(answer.equalsIgnoreCase("Delete")) {
			sub_clearImage();
		}
	}
}

/**
 * @properties={typeid:24,uuid:"8FCDA9B6-2EBD-426D-87E0-35C864C7349D"}
 */
function sub_clearImage()
{
		image_mime_type = null
		image_name = null
		image_thumbnail = null
		image_type = null
		product_image = null;
		product_image_filename = null;
}

/**
 * @properties={typeid:24,uuid:"C72128BB-EF53-48DB-8AD7-F022F72B68EF"}
 */
function sub_setPreviewLabels()
{
	if(product_image && (utils.stringPatternCount(image_mime_type, 'image') == 0 || !image_mime_type))
	{
		//show that there is no preview for this item
		elements.lblImagePreview.text = '<html><body><center>No Preview for .' + image_type + ' files</center></body></html>';
		elements.lblImagePreview.visible = true;
	}
	else if(!product_image)
	{
		elements.lblImagePreview.text = 'No Image';
		elements.lblImagePreview.visible = true;
	}
	else
	{
		elements.lblImagePreview.text = '';
		elements.lblImagePreview.visible = false;
	}
}

/**
 * @properties={typeid:24,uuid:"739FF0F6-AD4F-41E3-9CB8-6293E772B557"}
 */
function sub_showProductOrders()
{
	//go to related order records with this contact on it

	//write a query to find all the unique orders that have this product on it
	var query = 'select distinct order_id from order_items where product_id = ' + product_id +
	' order by order_id'

	//Get a dataset based on query
	var maxReturnedRows = 500;//useful to limit number of rows
	var ds = controller.getDataSource().split('/');
	var dataset = databaseManager.getDataSetByQuery(ds[1], query, null, maxReturnedRows);
	
	if(dataset.getMaxRowIndex() > 0)
	{
		forms.lst_orders.loadRecords(dataset);

		//navigate to the orders tab
		forms.lst_solution_navigation.setSelectedIndex(scopes.constants.CONST_ORDERS_NAME);

		//change tabs in main navigation form
		forms.lst_solution_navigation.onRecordSelection();
		//show the 'Show all' button
		forms.frm_nav_top.sub_showShowAll();
		//set the navigation to fit the new query resukt dataset count
		_super.setLblRecordTextAndNavigation(1,databaseManager.getTableCount(dataset));

	}
}

/**
 * @properties={typeid:24,uuid:"FB6E2FD2-139C-49E2-A34A-8F01DEE39F7D"}
 */
function validate_beforeDelete()
{
	//see if it's used on any orders
	var cnt = products_to_order_items.getSize();

	if(cnt > 0)
	{
		//there are orders that use this item - so don't allow the delete
		//show dialog and return 1
		globals.DIALOGS.showErrorDialog("Product in orders","You can't delete a product that has orders.\n\nDelete all the order items on the orders first.","OK")
		sub_showProductOrders();
		return true;
	}
	else
	{
		return false;
	}
}
