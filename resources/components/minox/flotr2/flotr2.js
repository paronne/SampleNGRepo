angular.module('minoxFlotr2',['servoy']).directive('minoxFlotr2', function() {  
    return {
      restrict: 'E',
      scope: {
    	  model: '=svyModel',
		  api: "=svyApi",
		  handlers: "=svyHandlers",
      },
      controller: function($scope, $element, $attrs) {
    	  
    	  $scope.style={width: "100%", height: "100%"};
      },
      link: function($scope, $element, $attrs) {
    	  
    	  /**
     	  * Draw the chart
     	  * @example %%prefix%%%%elementName%%.drawFlotr2(data);
     	  * @param node (object) node the chart data
     	  */
     	  $scope.api.drawFlotr2 = function(node) {
     		  
     		var container = document.getElementById($scope.model.svyMarkupId);
		
		    Flotr.draw(container,
			     node.data,
			     node.options
		    );
     	  }
     	  
     	 $scope.$watchCollection('model.jsonData', function(newValue, oldValue) {
     		 
     		 if (!$scope.model.jsonData) return;
	     		var container = document.getElementById($scope.model.svyMarkupId);
			    Flotr.draw(container,
				     $scope.model.jsonData.data,
				     $scope.model.jsonData.options
			    );
			})
      },
      templateUrl: 'minox/flotr2/flotr2.html'
    };
  })