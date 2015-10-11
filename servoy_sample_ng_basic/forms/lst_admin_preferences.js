/**
 * @properties={typeid:24,uuid:"E22269B1-9081-433E-90CE-1196DAD3145F"}
 */
function doEdit() {
	controller.readOnly = false;
	elements.txtPreferenceValue.enabled = true;
	elements.txtPreferenceValue.bgcolor = '#feffe4';
}

/**
 * @properties={typeid:24,uuid:"947353F3-1D11-4F1F-977D-3CEF1A147BA8"}
 */
function endEdit(){
	controller.readOnly = true;
	elements.txtPreferenceValue.enabled = false;
	elements.txtPreferenceValue.bgcolor = '#f0f0f0';
}