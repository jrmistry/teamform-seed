angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state',
            function($scope, $firebaseObject, $firebaseArray, $state) {
                $scope.goToAdmin = function() {
                    $state.go("admin_creation", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team_creation", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member", {event: $scope.event});
                };
            }
        ]
);
