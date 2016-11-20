var testing = {};
var twist = {};
angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state', 'Modals',
            function($scope, $firebaseObject, $firebaseArray, $state, modals) {
                $scope.goToAdmin = function() {
                    $state.go("admin", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member", {event: $scope.event});
                };
                
                // EventService.getEvent("Event1").$loaded(function(data){
                //     console.log(data.maxTeamSize);
                //     console.log(data);
                //     testing = data;
                //     data.maxTeamSize = 15;
                //     data.$save();
                // });

            }
        ]
);