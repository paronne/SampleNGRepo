
/**
 * @param event
 *
 * @properties={typeid:24,uuid:"08816B1F-1B74-4198-9ECE-7ADB013FB1F4"}
 */
function onLoad(event) {
	testElement = 'dropdown_main'
	varString = "dataprovider";
	_super.onLoad(event)
}

/**
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"183A57D2-2265-4208-A826-AA5E33F4AC22"}
 */
function onDataChange(oldValue,newValue,event) {
	_super.onDataChange(oldValue,newValue,event)
	if (newValue == -1) {
		return false
	}
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"B759A8BC-7396-4871-9AFF-BBC37C199F1C"}
 */
function onAction(event) {
	return _super.onAction(event)
}
/**
 *
 * @param {object} realValue
 * @param {object} displayValue
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"D021B075-E969-48DC-9F38-FE682535DF73"}
 */
function onMenuItemSelected(realValue, displayValue, event) {
	// TODO Auto-generated method stub
	log("Item selected element:" + event.getElementName() +  " realValue:" + realValue + " displayValue:" + displayValue);
	varString = realValue;
}
