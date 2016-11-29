angular.module('teamform')
    .controller('AdminCreationCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state', 'Models',
        function ($scope, $firebaseObject, $firebaseArray, $stateParams, $state, models) {

            $scope.adminName = "";
            $scope.eventID = "";
            $scope.eventName = "";
            $scope.eventDesc = "";

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

            $scope.createEvent = function() {
                if ($scope.adminName != "" && $scope.eventID != "" && $scope.eventName != "" && $scope.eventDesc != "") {
                    var newData = {
                        'admin': {'name': $scope.adminName},
                        'desc':$scope.eventDesc,
                        'maxTeamSize': $scope.param.maxTeamSize,
                        'members':[],
                        'minTeamSize': $scope.param.minTeamSize,
                        'name': $scope.eventName,
                        'teams':[],
                    };

                    var events = models.getAllEvents();
                    events.$loaded().then(function () {
                        events.$ref().child($scope.eventID).set(newData);
                        $state.go("events", {
                            eventID: $scope.eventID
                        });
                    });
                }
            }
        }]);