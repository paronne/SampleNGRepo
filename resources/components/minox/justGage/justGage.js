angular.module('minoxJustGage',['servoy']).directive('minoxJustGage', ['$timeout', function($timeout) {
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			api: "=svyApi"
		},
		link: function(scope, element, attrs) {

			function drawGauge() {
				if (element && element[0] && element[0].children[0] && element[0].children[0].id) {
					scope.gauge = new JustGage({
						id: scope.model.svyMarkupId,
						value: scope.model.value,
						min: scope.model.min,
						max: scope.model.max,
						title: scope.model.title,
						label: scope.model.label,
						levelColors: scope.levelColors,
						startAnimationTime : scope.model.startAnimationTime,
						gaugeWidthScale : scope.model.gaugeWidthScale
					});
				} else if (scope.model.tempId && element && element[0] && element[0].children[0]) { // TODO temp solution to svyMarkupId problem
					element.children().attr('id', scope.model.tempId)
					scope.gauge = new JustGage({
						id: scope.model.tempId,
						value: scope.model.value,
						min: scope.model.min,
						max: scope.model.max,
						title: scope.model.title,
						label: scope.model.label,
						levelColors: scope.levelColors,
						startAnimationTime : scope.model.startAnimationTime,
						gaugeWidthScale : scope.model.gaugeWidthScale
					});
				} else {
					console.log('just gage: element not in DOM')
				}
			}

			//Executing logic inside timeout so
			$timeout(function() {
					// console.log('link Paul ' + element[0].children[0].id)
				scope.model.tempId = 'id_' + scope.model.svyMarkupId;
					drawGauge()

					scope.$watch('model.value', function(newValue, oldValue) {
							if (scope.gauge) {
								scope.gauge.refresh(scope.model.value)
							} else {
								console.log('no gauge found')
							}
						})

					scope.$watch('model.max', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
					scope.$watch('model.min', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
						
					scope.$watch('model.title', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
						
					scope.$watch('model.label', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
						
					scope.$watch('levelColors', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
						
					scope.$watch('model.startAnimationTime', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
						
					scope.$watch('model.gaugeWidthScale', function(newValue, oldValue) {
							if (newValue != oldValue) {
								drawGauge()
							}
						})
						
					scope.$watchCollection('model.jsonData', function(newValue, oldValue) {
     		 
							if (!scope.model.jsonData) return;
							var node = scope.model.jsonData;
				     		if (node) {
				     			scope.model.min = node.min;
								scope.model.max = node.max;
								scope.model.title = (node.title ? node.title : '');
								scope.model.label = (node.label ? node.label : '');
								scope.model.value = node.value;
								scope.levelColors = node.levelColors;
								scope.model.startAnimationTime = node.startAnimationTime;
								scope.model.gaugeWidthScale = node.gaugeWidthScale;
							}
						})
				}, 0);
			
			
			 /**
	     	  * Draw the chart
	     	  * @example %%prefix%%%%elementName%%.drawGage(data);
	     	  * @param node (object) node the chart data
	     	  */
	     	  scope.api.drawGage = function(node) {
	     		  
			    scope.model.min = node.min;
				scope.model.max = node.max;
				scope.model.title = (node.title ? node.title : '');
				scope.model.label = (node.label ? node.label : '');
				scope.model.value = node.value;
				scope.levelColors = node.levelColors;
				scope.model.startAnimationTime = node.startAnimationTime;
				scope.model.gaugeWidthScale = node.gaugeWidthScale;
	     	  }
		},
		controller: function($scope, $element, $attrs) {
			$scope.style = {
				width: '100%',
				height: '100%',
				overflow: 'hidden'
			}
			$scope.levelColors = ['#FFD700', '#FFD700', '#FFD700'];
			
		},
      templateUrl: 'minox/justGage/justGage.html'
    };
  }])