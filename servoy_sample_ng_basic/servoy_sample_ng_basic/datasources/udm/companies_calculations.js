/**
 * @properties={type:12,typeid:36,uuid:"BC2A55C7-DEE1-4753-806D-79C5E62E20D2"}
 */
function displayIconOnRecord()
{
	var top = '<html><img border=0 src="media:///icons_sample_NG_app/'

	if(company_id == globals.curID_company)
	{
		return top + 'orangenav_right.png"></html>'
	}
	else
	{
		return top + 'greynav_right.png"></html>'
	}
}
