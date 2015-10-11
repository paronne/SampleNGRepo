/**
 * @description Display the icon for each seolution i.e. customers, products, orders etc.
 * @author Anastasija
 * @properties={type:12,typeid:36,uuid:"6E749282-377C-4B22-A929-636A83A6A9F8"}
 */
 function displayIcon()
 {
 	if(icon_name)
 	{
 		application.output(icon_name);
 		return '<html><div align="center"><img src="media:///icons_sample_NG_app/' + icon_name + '" border=0></div></html>'
 	}
 	else
 	{
 		return '<html>&nbsp;</html>'
 	}
 }