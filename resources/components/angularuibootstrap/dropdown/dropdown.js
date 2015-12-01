angular.module('angularuibootstrapDropdown', ['servoy']).directive('angularuibootstrapDropdown', function() {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi"
			},
			link: function($scope, $element, $attrs) {
				/**
				 * Sets the display/real values to the custom valuelist of the element (if element has custom valuelist). This does not effect the value list with same name list on other elements or value lists at application level. Should receive a dataset parameter, first column is for display values, second column (optional) is for real values. NOTE: if you modify values for checkbox/radio field, note that having one value in valuelist is a special case, so switching between one value and 0/multiple values after form is created may have side effects
				 *
				 * var dataset = databaseManager.createEmptyDataSet(0,new Array('display_values','real_values'));
				 * dataset.addRow(['aa',1]);
				 * dataset.addRow(['bb',2]);
				 * dataset.addRow(['cc',3]);
				 * // elements.elem should have a valuelist attached
				 * elements.elem.setValueListItems(dataset);
				 *
				 * @param {Object} dataset first column is display value, second column is real value
				 * 
				 */
				$scope.api.setValueListItems = function(dataset) {
					var valuelistItems = [];
					for (var i = 1; i < dataset.length; i++) {
						var item = { };
						item['displayValue'] = dataset[i][0];
						if (dataset[i][1] !== undefined) {
							item['realValue'] = dataset[i][1];
						}
						valuelistItems.push(item);
					}
					$scope.model.valuelist = valuelistItems;
				}
				
				$scope.model.buttonDropDownToggle = (!$scope.model.split ? " dropdown-toggle" : "");
				$scope.model.noDropDown = "btn " + $scope.model.buttonStyle + $scope.model.buttonDropDownToggle;
			},
			controller: function($scope, $element, $attrs) {
				$scope.style = {};
				
				$scope.getWidth = function () {
					$element
				}
				
				/* TODO Switch in bootstrap */
				$scope.style.main = {
					"width": '100%',
					"height": '100%'
				}
				
				$scope.style.single = {
					"width":"100%",
					"overflow": "hidden",
					"height": '100%'
				}
				
				$scope.style.button = {
					"width":"100%",
					"overflow": "hidden",
					"height": '100%',
					"margin-right": "-26px"
				}
				
				$scope.style.drop = {
					"width": "auto",
					"position": "absolute",
					"right": "0px",
					"height": '100%'
				}

				$scope.itemSelected = function(realValue, displayValue, event) {
					$scope.handlers.onMenuItemSelected(realValue, displayValue, event);
				}

			},
			templateUrl: 'angularuibootstrap/dropdown/dropdown.html'
		}
	})
