/**
 * @properties={typeid:35,uuid:"C6CD3342-2F22-47EB-839F-6988192782D6",variableType:-4}
 */
var MAIN_TABS = {
	TAB_COMPANIES:{TAB_NAME:"Customers", TAB_INDEX:1},
	TAB_CONTACTS: {TAB_NAME:"Contacts",TAB_INDEX:2},
	TAB_ORDERS: {TAB_NAME:"Orders",TAB_INDEX:3},
	TAB_PRODUCTS: {TAB_NAME:"Products", TAB_INDEX:4},
	TAB_ADMIN: {TAB_NAME:"Admin", TAB_INDEX:5}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} itemName name of a 
 * @public
 * @properties={typeid:24,uuid:"853F113D-53C5-4A70-B72C-4BEF4A960378"}
 */
function enableTab(itemName){
	switch(itemName){
	case MAIN_TABS.TAB_COMPANIES.TAB_NAME :
		elements.tabs_selected_solution.tabIndex = MAIN_TABS.TAB_COMPANIES.TAB_INDEX;
		break;
	case MAIN_TABS.TAB_CONTACTS.TAB_NAME :
		elements.tabs_selected_solution.tabIndex = MAIN_TABS.TAB_CONTACTS.TAB_INDEX;
		break;
	case MAIN_TABS.TAB_ORDERS.TAB_NAME :
		elements.tabs_selected_solution.tabIndex = MAIN_TABS.TAB_ORDERS.TAB_INDEX;
		break;
	case MAIN_TABS.TAB_PRODUCTS.TAB_NAME :
		elements.tabs_selected_solution.tabIndex = MAIN_TABS.TAB_PRODUCTS.TAB_INDEX;
		break;
	case MAIN_TABS.TAB_ADMIN.TAB_NAME :
		elements.tabs_selected_solution.tabIndex = MAIN_TABS.TAB_ADMIN.TAB_INDEX;
		break;
	default: return;
}

//	for(var i=0; i<=elements.tabs_selected_solution.getMaxTabIndex(); i++){
//		var tabName = elements.tabs_selected_solution.getTabNameAt(i);
//		if(tabName.equalsIgnoreCase('tab'+itemName)) {
//			elements.tabs_selected_solution.tabIndex = i;
//		}
//	}
	
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {Boolean} disabled
 * @public
 * @properties={typeid:24,uuid:"1B934ECF-AF48-4EF7-A944-7CE079646FCC"}
 */
function disableForm(flag) {
	controller.enabled = flag;
	//this has to be forced because the disabling of the controller does not work properly
	forms.lst_solution_navigation.disableRecordSelection(flag);
	elements.fldSearch.enabled = flag;
}

/**
 * @param {JSEvent} event the event that triggered the action
 * @properties={typeid:24,uuid:"a0c21699-fea8-4445-81e4-8494edb62c56"}
 * @AllowToRunInFind
 */
function btn_search(event)
{
	//see what form is front-most i.e. active in the main panel
	var frm = event.getFormName();
	
	
	/** @type String */
	var search = globals.nav_search;

	if(search)
	{
		var dataType = 'str'
		var searchStr = '%' + search + '%'
		var op = ""

		//see if there are any operators (< > = !=) entered
		if(search.indexOf('!=') != -1)
		{
			op = '!='
		}
		else if(search.indexOf('>=') != -1)
		{
			op = '>='
		}
		else if(search.indexOf('>') != -1)
		{
			op = '>'
		}
		else if(search.indexOf('<=') != -1)
		{
			op = '<='
		}
		else if(search.indexOf('<') != -1)
		{
			op = '<'
		}
		else if(search.indexOf('=') != -1)
		{
			op = '='
		}

		if(op) search = utils.stringReplace(search, op, '') //take off the operator to see if date or num

		//try to guess what type of data is entered in the search
		if(search.indexOf('/') != -1 || search.indexOf('-') != -1)
		{
			dataType = 'date' //probably a date
			search = new Date(search)
			searchStr = op + search
		}
		else if(search.indexOf('.') != -1 && !isNaN(parseFloat(search)))
		{
			dataType = 'number' //probably a number
			search = parseFloat(search);
			searchStr = op + search
		}
		else if(!isNaN(parseInt(search)) && search.indexOf('.') == -1)
		{
			dataType = 'int' //probably an integer
			search = parseInt(search, 10);
			searchStr = op + search
		}

		//COMPANY FIND
		if(frm.indexOf('company') >= 0)
		{
			//there is no numeric or date data - so show dialog
			if(dataType != 'str')
			{
				globals.DIALOGS.showErrorDialog('No numeric data in customers','There is no numeric or date data to find in customers.','OK')
				elements.fldSearch.selectAll();
				return
			}
			else
			{
				if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?
			}

			//on the companies form
			forms[frm]['company_name'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_industry'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_email'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_description'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_category'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['company_id'] = search
		}
		//CONTACTS FIND
		else if(frm.indexOf('contacts') >= 0)
		{
			//there is no numeric or date data - so show dialog
			if(dataType != 'str')
			{
				globals.DIALOGS.showErrorDialog('No numeric data in contacts','There is no numeric or date data to find in contacts.','OK')
				elements.fldSearch.selectAll();
				return
			}
			else
			{
				if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?
			}

			forms[frm]['name_first'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['name_last'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['name_middle'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['phone_cell'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['phone_direct'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['fax_direct'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['job_title'] = searchStr
			forms[frm].controller.newRecord()
			forms[frm]['contacts_to_companies'].company_name = searchStr

		}
		//ORDERS FIND
		else if(frm.indexOf('orders') >= 0)
		{
			if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?

			if(dataType == 'int')
			{
				forms[frm]['order_number'] = searchStr
			}
			else if(dataType == 'number')
			{
				forms[frm]['order_total'] = searchStr
			}
			else if(dataType == 'date')
			{
				forms[frm]['order_date'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['shippeddate'] = searchStr
			}
			else //string
			{
				forms[frm].controller.newRecord()
				forms[frm]['notes'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['notes_internal'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['paid_number'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['terms'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['orders_to_companies'].company_name = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['po_number'] = searchStr
			}
		}
		//PRODUCTS FIND
		if(frm.indexOf('products') >= 0)
		{
			if (!forms[frm].controller.find()) return; //cannot enter find, previous edits can't be saved?

			if(dataType == 'int')
			{
				forms[frm]['product_id'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['product_number'] = searchStr
			}
			else if(dataType == 'number' && (search.indexOf("cost ") != -1 || search.indexOf("cost ea") != -1))
			{
				forms[frm]['cost_each'] = search
			}
			else if(dataType == 'number' && (search.indexOf("price ") != -1 || search.indexOf("price ea") != -1))
			{
				forms[frm]['price_each'] = search
			}
			else if(dataType == 'number')
			{
				forms[frm]['cost_each'] = search
				forms[frm].controller.newRecord()
				forms[frm]['price_each'] = search
			}
			else
			{
				forms[frm]['product_name'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['description'] = searchStr
				forms[frm].controller.newRecord()
				forms[frm]['order_description'] = searchStr
			}
		}

		//perform the search
		var found = forms[frm].controller.search()

		//see if anything was found
		if(found == 0)
		{
			forms[frm].controller.loadAllRecords()
			globals.DIALOGS.showErrorDialog('No records','No records were found matching your search request.','OK')
		}
		else
		{
			//show the "show all" button
			forms.frm_nav_top.sub_showShowAll();
		}
	}
	else
	{
		//empty search - so show all
		forms.frm_nav_top.btnShowAll(event);
		elements.fldSearch.requestFocus(false);
	}
}