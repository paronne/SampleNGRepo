/**
 * @properties={typeid:24,uuid:"0EA62AF8-BE47-45EE-A926-25CCCA6BCF64"}
 */
function createPieChart(){
	
	//split the html string in order to get the values from the table
	var str = html_sales.split(/class="body">|<.td>/)
	
	//the total price of the top 5 products is at the split sting - 2 position
	var total = utils.stringToNumber(str[str.length-2].split(/\$|<.b>/)[1]);

	//after the splitting, the product titles start from position 3 and are encountered at every odd position
	//the product prices are at the even positions, starting from position 4
	var index = 3;
	
	//the json object to hold the data for the pie chart
	var chartJSONData = [];

	while(index < str.length-2){
		//pie chart displays percentages, so calculate product_price/total_price to get percentage
		var dataVal = utils.stringToNumber(str[index+2].substr(1))/total;
		chartJSONData.push({label:''+str[index]+'', data:[[0, dataVal]]});
		index+=4;
	}

	//specify chart options
	var optionsObj = {
	     htmlText: false,
	     radiateLabel: true,
	        grid: {
	            verticalLines: false,
	            horizontalLines: false
	        },
	        xaxis: {
	            showLabels: false
	        },
	        yaxis: {
	            showLabels: false
	        },
	        pie: {
	            show: true,
	            explode: 10
	        },
	        mouse: {
	            track: true
	        },
	        legend: {
	        	position: 'sw', 
	            labelBoxBorderColor: 'none'
	            	
	        }
    };
	var node = {data:chartJSONData, options:optionsObj};
	elements.flotr2_1.drawFlotr2(node);
}

/**Remove this methods once disabling of a controller and a tabpanel works - bug in servoy
 * TODO generated, please specify type and doc for the params
 * @param {Boolean} flag
 * @public
 *
 * @properties={typeid:24,uuid:"A1AC8464-866F-4CD7-91E4-F67563B0AA03"}
 */
function enableDisableElements(flag){
	//nothing to disable here
}
