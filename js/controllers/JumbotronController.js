app.controller("JumbotronController", ['$scope', function($scope) {
    var main = function() {
	//  появление контента в боксах на витрине
	$('#secure, #fire, #surveillance').hover(function() {
		$(this).find('.content').fadeToggle();
	});    
};
$(document).ready(main);
}]);