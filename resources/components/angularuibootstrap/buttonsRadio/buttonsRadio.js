angular.module('angularuibootstrapButtonsRadio', ['servoy', 'ui.bootstrap']).directive('angularuibootstrapButtonsRadio', function() {
		return {
			restrict: 'E',
			scope: {
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: '=svyServoyapi'
			},
			link: function($scope, $element, $attrs) {
				
				$scope.list = [{
					displayValue : 'L',
					realValue : -1
				},
				{
					displayValue : 'M',
					realValue : 0
				},
				{
					displayValue : 'R',
					realValue : 1
				}]
				
				$scope.style = {
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}
				
				$scope.changedValue
				
				$scope.$watch('model.valuelist', function () {
					// FIXME workaround to reset initial dataprovider value 
					var x = $scope.model.dataProvider
					$scope.model.dataProvider = null
					setTimeout(function () {
						$scope.model.dataProvider = x
					}) 
					
				})
				
				// persist change to the record whenever the dataprovider is changed
				$scope.$watch('model.dataProvider', function(newValue, oldValue) {
					$scope.changedValue = oldValue
					$scope.svyServoyapi.apply('dataProvider')
				});
				
				
				$scope.api.onDataChangeCallback = function(event, returnval) {
					console.log(event)
					console.log(returnval)
					if (returnval) {
						$scope.changedValue = null
					} else {
						$scope.model.dataProvider = $scope.changedValue
					}
				}
			},
			templateUrl: 'angularuibootstrap/buttonsRadio/buttonsRadio.html'
		}
	})
