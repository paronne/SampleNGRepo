/**
 * @properties={type:12,typeid:36,uuid:"37390CE3-50A7-4E17-8675-925C0132B2D2"}
 * @return {String} Create a mailing address from existing city, state and zipcode
 * @author Anastasija
 */
function address_csz(){
	var address = '';

	if(city || state || zipcode)
	{
		if(city && state)
		{
			address += city + ', ' + state;
		}
		else if(city && !state)
		{
			address += city;
		}
		else if(state && !city)
		{
			address += state;
		}
		
		if(zipcode)
		{
			address += ' ' + zipcode;
		}
	}

	return address;
}

/**
 * @properties={typeid:36,uuid:"B9FDEA4A-0840-4FE7-BE41-91723FC9280F"}
 * @return {String} Return a full mailing address for a contact from all address lines and zip code
 * @author Anastasija
 */
function address_display_calc() {
	
	var address = '';
	
	if(line_1) 
	{
		address = line_1;
	}

	if(line_2 && address)
	{
		address += '\n' + line_2;
	}
	else if(line_2 && !address)
	{
		address = line_2;
	}

	if(line_3 && address)
	{
		address += '\n' + line_3;
	}
	else if(line_3 && !address)
	{
		address = line_3;
	}

	if(line_4 && address)
	{
		address += '\n' + line_4;
	}
	else if(line_4 && !address)
	{
		address = line_4;
	}

	if(line_5 && address)
	{
		address += '\n' + line_5;
	}
	else if(line_5 && !address) 
	{
		address = line_5;
	}

	var address_city_state_zip = address_csz;
	
	if(address_city_state_zip) 
	{
		address += '\n' + address_city_state_zip;
	}

	return address;
}