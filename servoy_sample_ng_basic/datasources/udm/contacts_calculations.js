/**
 * @properties={type:12,typeid:36,uuid:"FC4AE4C8-29E7-48F5-B575-F3F699877AD6"}
 */
function displayIconOnRecord()
{
	var top = '<html><img border=0 src="media:///icons_sample_NG_app/';

	if(contact_id == globals.curID_contact)
	{
		return top + 'orangenav_right.png"></html>'
	}
	else
	{
		return top + 'greynav_right.png"></html>'
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"0C86CC97-68EC-446D-912E-EF6957159F6A"}
 * @return {String} Return a mailing address of a contact if there is one in the database
 */
function mailing_address_label()
{
	if(mail_address_id)
	{
		var address = "";
		
		application.output(contacts_to_companies + "/" + contacts_to_companies.company_name + "/" + (mail_use_company == 1));
		if(contacts_to_companies && (mail_use_company == 1)) 
		{
			address = contacts_to_companies.company_name;
			application.output("address: "+address);

		}
		
		address ? address += ('\n' + list_nav_contacts_display) : address = list_nav_contacts_display;
				
		if(contacts_to_addresses)
		{
			address += '\n' + contacts_to_addresses.address_display_calc;
			
			if(contacts_to_addresses.country && mail_use_country == 1) address += '\n' + contacts_to_addresses.country
		}
		
		
		return address;
	}
	else
	{
		return '';
	}
}

/**
 * @return {String} A calculation method to create the full contact names listed in the contacts navigation menu tab
 * @properties={type:12,typeid:36,uuid:"07053DF0-CAC2-4300-BA61-D615E1398917"}
 */
function list_nav_contacts_display()
{
	/**
	 * @type {String} full name = last,name, first_name
	 */	
	var full_name = "";
	
	if(name_first && name_last){
		full_name = name_last + ", " + name_first;
	}
	else if(name_last){
		full_name = name_last + ", ?";
	}
	else if(name_first){
		full_name = "?, " + name_first;
	}
	
	return full_name;
}
