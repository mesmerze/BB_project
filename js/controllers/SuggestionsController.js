app.controller("SuggestionsController", ['$scope', 'suggestions', function($scope, suggestions) {
	$scope.posts = suggestions.posts;
	$scope.currSugg;
	$scope.addSuggestion = function() {
		// if inpt empty, don't submit
		if(!$scope.title || $scope.title === '') {
			return;
		};

		//push suggestion posts in suggestions.js
		$scope.posts.push({
			title: $scope.title,
			upvotes: 0,
			comments: [],
		});

		//after submit, clear input
		$scope.title = '';
	};
	$scope.upVote = function(post) {		
		if ($scope.currSugg) {
			post.upvotes -= 0;
			//return $scope.currSugg = false;
		} else {
			post.upvotes += 1;
			return $scope.currSugg = true;
		};
	};
}]);