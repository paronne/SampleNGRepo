/**
 * @param event
 *
 * @properties={typeid:24,uuid:"C0AA869F-C2D4-4CC2-9731-8C9614161830"}
 */
function onLoad(event) {
	testElement = 'buttons_radio_1'
	varNumber = null
	_super.onLoad(event)
}

/**
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"72324F51-ED70-48D4-A49F-A1EF16E25237"}
 */
function onDataChange(oldValue,newValue,event) {
	_super.onDataChange(oldValue,newValue,event)
	if (newValue == -1) {
		return false
	}
	return true
}