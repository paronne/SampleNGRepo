angular.module('jquery3partylibsSelect2autotokenizer', ['servoy']).directive('jquery3partylibsSelect2autotokenizer', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				model: "=svyModel",
				handlers: "=svyHandlers",
				api: "=svyApi",
				svyServoyapi: '='
			},
			link: function($scope, $element, $attrs) {
				var SEPARATOR = {
					COMMA: "comma",
					NEW_LINE: "new_line"
				}

				var tokenizer;
				var tags = [];

				// TODO: replace with $element.child(blabla)
				function initTokanizer() {
					var options = { };
					if ($scope.model.placeholderText) options.placeholder = $scope.model.placeholderText;
					options.multiple = true;
					options.tokenSeparators = [',', ' '];
					$scope.model.allowNewEntries ? options.tags = tags : options.data = tags;
					if (!$scope.model.allowNewEntries) {
						options.formatNoMatches = function(term) {
							return $scope.model.noMatchesFoundText ? $scope.model.noMatchesFoundText : "No match"
						};
					}

					tokenizer = $('#' + $scope.model.svyMarkupId)
					if (tokenizer) {
						tokenizer.select2(options);
						tokenizer.on("change", function(e) {
								onChange(e);
							})
					} else {
						console.log('cannot find tokenizer in DOM')
					}

				}

				function setValuelist() {
					tags = [];
					if ($scope.model.valuelist) {
						for (var i = 0; i < $scope.model.valuelist.length; i++) {
							tags.push({ id: $scope.model.valuelist[i].realValue, text: $scope.model.valuelist[i].displayValue });
						}
					}
				}
				
				function isTypeString() {
					return  $scope.model.dataproviderType === "String"	//!$scope.model.dataprovider || $scope.model.dataprovider.constructor.name === "String"
				} 
				
				function isTypeNan() {
					return  $scope.model.dataproviderType === "Number"	//$scope.model.dataprovider.constructor.name === "Number"
				}
				
				function isTypeBoolean() {
					return  $scope.model.dataproviderType === "Boolean" //$scope.model.dataprovider.constructor.name === "Boolean"
				}

				// init svyMarkupId and draw the chart at the next digest
				$scope.$watch('model.svyMarkupId', function(newValue, oldValue) {
						if ($scope.model.svyMarkupId) {
							$scope.$evalAsync(initTokanizer);
						}
					});

				$scope.$watch('model.enabled', function() {
						$("#" + $scope.model.svyMarkupId).select2("enable", $scope.model.enabled);
					});

				$scope.$watch('model.valuelist', function(newValue, oldValue) {
						if (newValue) {
							setValuelist();
							initTokanizer();
						}
					});

				$scope.$watch('model.dataprovider', function() {
						console.log("triggering change");
						if (tokenizer) {
							if ($scope.model.dataprovider) {
								console.log($scope.model.dataprovider.constructor);

								// split values if is a String convert to string if is a number or Boolean
								if (isTypeString()) {
									var value = $scope.model.dataprovider.split("\n");
									value = value.join(",");
								} else if ( isTypeNan() || isTypeBoolean()) {
									value = $scope.model.dataprovider + "";
								} else {
									console.log("Warning dataProvider typeof " + $scope.model.dataprovider.constructor.name + " not allowed")
								}

								tokenizer.val(value)//.trigger("change");
							} else {
								tokenizer.val(null)//.trigger("change");
							}
							setTimeout(function() {
									tokenizer.trigger("change")
								}, 0);
						}
					});

				function onChange(e) {
					console.log("onChange called");
					console.log(e);

					if ($scope.model.dataproviderType != SEPARATOR.COMMA) {
						var data = $("#" + $scope.model.svyMarkupId).select2("data");
						var dpValue;

						if (data && data.length > 0) {

							// split values if is a String convert to string if is a number or Boolean
							if (isTypeString()) {
								dpValue = [];
								for (var i = 0; i < data.length; i++) {
									dpValue.push(data[i].id);
								}
								dpValue = dpValue.join("\n");
							} else if ( isTypeNan() || isTypeBoolean()) {
								dpValue = data[data.length - 1].id;
							} else {
								console.log("Warning dataProvider typeof " + $scope.model.dataprovider.constructor.name + " not allowed")
							}

						} else {
							dpValue = null;
						}

						console.log("dpValue " + dpValue + " type " + ( $scope.model.dataprovider ? $scope.model.dataprovider.constructor.name : "undefined" ))
						// apply change to dataprovider
						if ($scope.model.dataprovider !== dpValue) {
							$scope.model.dataprovider = dpValue;
							console.log(dpValue);
							$scope.svyServoyapi.apply('dataprovider');
						}
					} else { // TODO
						$scope.svyServoyapi.apply('dataprovider');
					}
				}

				//        $scope.api.onDataChangeCallback = function(event, returnval) {
				//          console.log("onDataChangeCallback")
				//          var stringValue = typeof returnval == 'string'
				//          if (!returnval || stringValue) {
				//            // TODO this will set ng-invalid on the tag, but "Select2" added many internal things to it that have
				//            // there own background color and img, so the color of ng-invalid won't be shown here...
				//            // even setting ng-invalid class on those doesn't have to work because the background settings that is in select2.css could still override it.
				//            ngModel.$setValidity("", false);
				//          } else {
				//            ngModel.$setValidity("", true);
				//          }
				//        }
			},
			templateUrl: 'jquery3partylibs/select2AutoTokenizer/select2AutoTokenizer.html'
		};
	})