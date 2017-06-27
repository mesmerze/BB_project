var app = angular.module("bez", ['ngRoute']);
app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'JumbotronController',
		templateUrl: 'js/views/jumbotron.html'
	})
	.when('/suggestions', {
		controller: 'SuggestionsController',
		templateUrl: 'js/views/suggestions.html'
	})
	.when('/comments/:id', {
		controller: 'CommentsController',
		templateUrl: 'js/views/comments.html'
	})
    .when('/fire', {
        controller: 'FireController',
        templateUrl: 'js/views/fire.html'
    })
    .when('/security', {
        controller: 'SecurityController',
        templateUrl: 'js/views/security.html'
    })
    .when('/surveillance', {
        controller: 'SurveillanceController',
        templateUrl: 'js/views/surveillance.html'
    })
    .when('/catalogue', {
        controller: 'CatalogueController',
    	templateUrl: '/js/views/catalogue.html'
    })    
	.otherwise({
		redirectTo: '/'
	});
});
