angular.module('teamform')
    .controller('LoginCtrl', ['$scope', '$state', 'Models',
        function ($scope, $state, models) {
            $scope.loginID = "Admin22";

            $scope.goToAdmin = function () {
                $state.go("events", { event: $scope.event });
            };

            $scope.goToTeam = function () {
                $state.go("team_creation", { event: $scope.event });
            };

            $scope.goToMember = function () {
                $state.go("member", { event: $scope.event });
            };
            $scope.login = function () {
                
            };
        }
    ]
    );
