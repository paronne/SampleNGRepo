/**
 * @properties={type:12,typeid:36,uuid:"A612C7E6-C61B-48FB-B03D-A2A97275B622"}
 */
function displayIconOnRecord()
{
	var top = '<html><img border=0 src="media:///icons_sample_NG_app/';

	if(product_id == globals.curID_product)
	{
		return top + 'orangenav_right.png"></html>'
	}
	else
	{
		return top + 'greynav_right.png"></html>'
	}
}

/**
 * @return {String} A calculation method to create the products listed in the product navigation menu tab
 * @properties={type:12,typeid:36,uuid:"405A3DDF-641C-4E19-B3CE-AA3189482D11"}
 */
function list_nav_products_display()
{
	/**
	 * @type {String} the returned variable which can be product code + product name or just one of each
	 */
	var txt_product = '';
	if(product_number && product_name){
		txt_product = product_number + "-" + product_name;
	}
	else if(product_number) {
		txt_product = product_number;
	}
	else if(product_name){
		txt_product = product_name;
	}
	return txt_product;
}
