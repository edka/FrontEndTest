angular
    .module('app-config', [])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "tmpl/index.html"
                })
                .state('registration', {
                    url: "/registration",
                    templateUrl: "tmpl/register.html"
                });
        }]);