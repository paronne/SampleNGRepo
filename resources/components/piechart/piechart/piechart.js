angular.module('piechartPiechart',['servoy']).directive('piechartPiechart', function() {  
    return {
      restrict: 'E',
      scope: {
    	  model: '=svyModel'
      },
      controller: function($scope, $element, $attrs) {
      },
      templateUrl: 'piechart/piechart/piechart.html'
    };
  })