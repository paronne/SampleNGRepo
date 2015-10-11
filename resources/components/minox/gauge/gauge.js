angular.module('minoxGauge',['servoy']).directive('minoxGauge', ['$timeout', function($timeout) {  
    return {
      restrict: 'E',
      scope: {
    	  model: '=svyModel'
      },
      controller: function($scope, $element, $attrs) {
    	  
    	  $scope.style = {
			width: '100%',
			height: '100%',
			overflow: 'hidden'
		  }
      },
      link: function(scope, element, attrs) {
    	  
    	  /**
    	   * Draw the Gauge chart
    	   */
    	  function drawGaugeCanvas() {
    		  var opts = {
					  lines: 20, 									// The number of lines to draw
					  angle: 0, 									// The length of each line
					  lineWidth: scope.model.gaugeWidthScale,		// The line thickness
					  pointer: {
						length: 0, 									// The radius of the inner circle
						strokeWidth: 0, 							// The rotation offset
						color: '#000000' 							// Fill color
					  },
					  limitMax: 'false', 
					  percentColors: scope.levelColors,//[[0.0, "#FFD700" ], [0.50, "#FFD700"], [1.0, "#FFD700"]], 
					  strokeColor: '#E0E0E0',
					  generateGradient: true
				};
				var target = document.getElementById('canvas-' + scope.model.svyMarkupId); 	// your canvas element
				var gauge = new Gauge(target).setOptions(opts); 							// create sexy gauge!
				//gauge.minValue = scope.model.min; 										// set min gauge value, not supported
				gauge.maxValue = scope.model.max; 											// set max gauge value
				gauge.animationSpeed = scope.model.startAnimationTime; 						// set animation speed (32 is default value)
				
				// Set Gauge Value
				var gaugeValueToSet = scope.model.value;
				if (!scope.model.value || scope.model.value <= 0) {
					gaugeValueToSet = 0.0001;
				} else if (scope.model.value > scope.model.max) {
					gaugeValueToSet = scope.model.max;
				} 
				gauge.set(gaugeValueToSet); 												// set actual value
    	  }
    	  
    	  /**
    	   * Set the level color for the Gauge
    	   */
    	  function setLevelColor(colors) {
    		  if (colors) {
					
					scope.levelColors = [];
					switch (colors.length) {
						case 0 : scope.levelColors = [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]];break;
						case 1 : scope.levelColors = [[0.0, colors[0]]];break;
						case 2 : scope.levelColors = [[0.0, colors[0]], [1.0, colors[1]]];break;
					}
					if (colors.length > 2) {
						var gap = (1 / (colors.length - 1));
						scope.levelColors.push([0.0, colors[0]]);
						for (var i = 1; i < colors.length - 1; i++) {
							scope.levelColors.push([(gap * i), colors[i]]);
						}
						scope.levelColors.push([1.0, colors[i]]);
					}
				} else {
					scope.levelColors = [[0.0, "#FFD700" ], [0.50, "#FFD700"], [1.0, "#FFD700"]];
				}
    	  }
    	  
    	//Executing logic inside timeout so
		$timeout(function() {
			
			scope.levelColors = [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]];
			scope.$watchCollection('model.jsonData', function(newValue, oldValue) {
	     		 
				if (!scope.model.jsonData) return;
				var node = scope.model.jsonData;
	     		if (node) {
	     			scope.model.min = node.min;
					scope.model.max = node.max;
					scope.model.value = node.value;
					setLevelColor(node.levelColors);
					scope.model.startAnimationTime = (node.startAnimationTime ? (node.startAnimationTime / 20) : 60);
					if (node.gaugeWidthScale) {
						scope.model.gaugeWidthScale = (0.3857 * node.gaugeWidthScale);
					} else {
						scope.model.gaugeWidthScale = 0.27;
					}
					drawGaugeCanvas();
				}
			});
			
			scope.$watch('model.value', function(newValue, oldValue) {
				if (newValue != oldValue) {
					drawGaugeCanvas()
				}
			})

			scope.$watch('model.max', function(newValue, oldValue) {
				if (newValue != oldValue) {
					drawGaugeCanvas()
				}
			})
			
			scope.$watch('model.min', function(newValue, oldValue) {
				if (newValue != oldValue) {
					drawGaugeCanvas()
				}
			})
			
		}, 0);
      },
      templateUrl: 'minox/gauge/gauge.html'
    };
  }])