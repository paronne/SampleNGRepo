/**
 * @properties={type:8,typeid:36,uuid:"B4606B76-9309-47AF-BAEA-703694F8CBAF"}
 */
function extended_price()
{
	if(quantity && price_each) {
		return quantity * price_each;
	}
	else {
		return 0;
	}
}
