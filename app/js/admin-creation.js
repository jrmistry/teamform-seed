angular.module('teamform')
    .controller('AdminCreationCtrl', ['$scope', '$stateParams', '$state',
        function($scope, $stateParams, $state) {

            // Initialize $scope.param as an empty JSON object
            $scope.param = {};
            $scope.param.maxTeamSize = 10;
            $scope.param.minTeamSize = 1;

            $scope.changeMinTeamSize = function(delta) {
                var newVal = $scope.param.minTeamSize + delta;
                if (newVal >=1 && newVal <= $scope.param.maxTeamSize ) {
                    $scope.param.minTeamSize = newVal;
                }
            };

            $scope.changeMaxTeamSize = function(delta) {
                var newVal = $scope.param.maxTeamSize + delta;
                if (newVal >=1 && newVal >= $scope.param.minTeamSize ) {
                    $scope.param.maxTeamSize = newVal;
                }
            };

        }]);