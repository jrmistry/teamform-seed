angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state', 'Modals',
            function($scope, $firebaseObject, $firebaseArray, $state, modals) {
                $scope.goToAdmin = function() {
                    $state.go("events", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member", {event: $scope.event});
                };
            }
        ]
);
