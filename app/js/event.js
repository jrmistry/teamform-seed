angular.module('teamform')
    .controller('EventCtrl', ['$scope', '$stateParams', '$state', 'Models',
        function ($scope, $stateParams, $state, models) {
            $scope.eventID = $stateParams.eventID;
            $scope.event = models.getEvent($scope.eventID);
            

            $scope.changeMinTeamSize = function(delta) {
                var newVal = $scope.event.minTeamSize + delta;
                if (newVal >=1 && newVal <= $scope.event.maxTeamSize ) {
                    $scope.event.minTeamSize = newVal;
                }
            };

            $scope.changeMaxTeamSize = function(delta) {
                var newVal = $scope.event.maxTeamSize + delta;
                if (newVal >=1 && newVal >= $scope.event.minTeamSize ) {
                    $scope.event.maxTeamSize = newVal;
                }
            };
            
            $scope.updateEvent = function() {
                $scope.event.$save();
            }
            
        }]);
