angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state',
            function($scope, $firebaseObject, $firebaseArray, $state,asfdasd) {
                $scope.goToAdmin = function() {
                    $state.go("events", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member_creation", {event: $scope.event});
                };
            }
        ]
);
