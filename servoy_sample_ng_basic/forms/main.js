/**
 * @properties={typeid:35,uuid:"C8D8947E-FBD2-4EC6-AB13-0D8407D065B7",variableType:-4}
 */
var MAIN_TABS = {
	TAB_COMPANIES:{TAB_NAME:"Customers", TAB_INDEX:1},
	TAB_CONTACTS: {TAB_NAME:"Contacts",TAB_INDEX:2},
	TAB_ORDERS: {TAB_NAME:"Orders",TAB_INDEX:3},
	TAB_PRODUCTS: {TAB_NAME:"Products", TAB_INDEX:4},
	TAB_ADMIN: {TAB_NAME:"Admin", TAB_INDEX:5}
}

/**
 * @param {String} selectedItemName
 * @public
 * @doc Sets the tab in the main Tabs panel based on the selected Project in the main navigation
 * @properties={typeid:24,uuid:"BC030D9C-1C93-46D7-ACFD-398AADC28955"}
 */
function setSelectedTabDetailsOverviewSolution(selectedItemName)
{
	switch(selectedItemName){
		case MAIN_TABS.TAB_COMPANIES.TAB_NAME :
			elements.tabsDetailsOverviewSolution.tabIndex = MAIN_TABS.TAB_COMPANIES.TAB_INDEX;
			break;
		case MAIN_TABS.TAB_CONTACTS.TAB_NAME :
			elements.tabsDetailsOverviewSolution.tabIndex = MAIN_TABS.TAB_CONTACTS.TAB_INDEX;
			break;
		case MAIN_TABS.TAB_ORDERS.TAB_NAME :
			elements.tabsDetailsOverviewSolution.tabIndex = MAIN_TABS.TAB_ORDERS.TAB_INDEX;
			break;
		case MAIN_TABS.TAB_PRODUCTS.TAB_NAME :
			elements.tabsDetailsOverviewSolution.tabIndex = MAIN_TABS.TAB_PRODUCTS.TAB_INDEX;
			break;
		case MAIN_TABS.TAB_ADMIN.TAB_NAME :
			elements.tabsDetailsOverviewSolution.tabIndex = MAIN_TABS.TAB_ADMIN.TAB_INDEX;
			break;
		default: return;
	}
	
//	for(var i=0; i<=elements.tabsDetailsOverviewSolution.getMaxTabIndex(); i++){
//		var tabName = elements.tabsDetailsOverviewSolution.getTabNameAt(i);
//		if(tabName.equalsIgnoreCase('tab'+selectedItemName)) {
//			elements.tabsDetailsOverviewSolution.tabIndex = i;
//		}
//	}
}
