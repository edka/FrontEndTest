angular
    .module('app', ['ui.router', 'app-config', 'ngSanitize', 'ui.select'])
    .factory('states', ['$http', function($http) {
        return $http.get('data/states.json', { cache: true });
    }])
    .controller('appCtrl', ['$scope', 'states', '$http', function($scope, states, $http) {
        $scope.states = [];
        states.then(function(response){
            $scope.states = response.data;
        });
        $scope.userdata = {};
        $scope.send = function(e) {
            e.preventDefault();
            $http({
                method: 'POST',
                url: 'send.php',
                data: $scope.userdata
            })
                .success(function(response) {
                    document.forms.form.innerHTML = response;
                });
        };
    }]);