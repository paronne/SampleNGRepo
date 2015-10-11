/**
 * Replace the flag paid=1 with ""PAID" and paid=0 with "PENDING"
 * @properties={type:12,typeid:36,uuid:"20B13BC7-AABC-4DC3-BCAF-37743B74C55B"}
 */
function paid_display()
 {
	 if(is_paid == 1)
	 {
	 	return "<HTML><font color='#009900'>&nbsp;&nbsp;PAID</font></HTML>"
	 }
	 else
	 {
	 	return "<HTML><font color='#cc0000'>&nbsp;&nbsp;PENDING</font></HTML>"
	 }
 }

/**
 * @properties={type:12,typeid:36,uuid:"F785BBA2-3AAC-451B-82A7-B5F9A5D3F1ED"}
 */
function displayIconOnRecord()
{
	var top = '<html><img border=0 src="media:///icons_sample_NG_app/';

	if(order_id == globals.curID_order)
	{
		return top + 'orangenav_right.png"></html>'
	}
	else
	{
		return top + 'greynav_right.png"></html>'
	}
}

/**
 * @return {String} A calculation method to create the orders names listed in the orders navigation menu tab
 * @properties={type:12,typeid:36,uuid:"4521286D-8BAE-4B59-905E-207E4F041FFF"}
 */
function list_nav_orders_display()
{
	/** 
	 * @type {String} the order display name in the navigation list
	 */
	var str = '';

	if(order_number)
	{
		str = order_number + '';
	}
	else
	{
		str = "ID: " + order_id;
	}

	if(orders_to_companies && orders_to_companies.company_name)
	{
		str += ' - ' + orders_to_companies.company_name
	}
	
	return str;	
}

/**
 * @return {Number}
 * @properties={type:8,typeid:36,uuid:"A96E17CE-F7FE-4398-AD4F-51861B3FB8D2"}
 */
function subtotal_after_discount()
{
	if(amt_discount > 0 && orders_to_order_items.sum_extended > 0)
	{
		return orders_to_order_items.sum_extended - amt_discount;
	}
	else
	{
		return orders_to_order_items.sum_extended;
	}
}

/**
 * @return {Number}
 * @description Calculate the total sum to be paid for the order
 * @properties={type:6,typeid:36,uuid:"fab95b71-ea94-4dd6-aa26-68b38396ae40"}
 */
function order_total()
{
	if(orders_to_order_items)
	{
		return (orders_to_order_items.sum_extended - amt_discount) + amt_shipping + amt_tax;
	}
	else
	{
		return 0;
	}
}

/**
 * @return {Number}
 * @description Calculate the amount of tax paid on the whole order sum
 * @properties={type:8,typeid:36,uuid:"1A0C4974-0854-4CD9-BAFD-94E76E0CA296"}
 */
function amt_tax()
{
	if(orders_to_order_items && pct_tax)
	{
		return orders_to_order_items.sum_extended * pct_tax;
	}
	else
	{
		return 0;
	}
}
