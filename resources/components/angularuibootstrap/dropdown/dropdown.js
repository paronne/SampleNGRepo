angular.module('angularuibootstrapDropdown', ['servoy']).directive('angularuibootstrapDropdown', function() {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi"
			},
			link: function($scope, $element, $attrs) {
				$scope.api.setValueListItems = function(dataset) {
					var valuelistItems = [];
					for (var i = 0; i < dataset.length; i++) {
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
