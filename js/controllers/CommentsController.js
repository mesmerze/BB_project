app.controller('CommentsController', ['$scope', '$routeParams', 'suggestions', function($scope, $routeParams, suggestions){
	$scope.post = suggestions.posts[$routeParams.id];
	$scope.currComm;
	$scope.addComment = function() {
		// if empty don't submit
		if ($scope.body === '') {
			return;
		};
		//push comment in post.comments
		$scope.post.comments.push({
			body: $scope.body,
			upvotes: 0,
		});
		//after clear body
		$scope.body = '';
	};
	$scope.upVote = function(comment) {
		if ($scope.currComm) {
			comment.upvotes -= 0;
		} else {
			comment.upvotes += 1;
			return $scope.currComm = true;
		};
	};
}]);