
var solName = '';
process.argv.forEach(function(val, index, array) {
	if( val.indexOf('--params.solutionName') != -1 ){
		solName = val;
		return;
	  }
});

var specPattern  = 'spec/**/*_spec.js';

	solName =  solName.split('=')[1];
	if(solName){
		specPattern = 'spec/'+solName+'/*_spec.js'
	}
exports.specPattern = specPattern;