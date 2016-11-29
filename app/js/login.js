angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state', 'Search', 'Models',
            function($scope, $firebaseObject, $firebaseArray, $state, Search, Models) {
                $scope.goToAdmin = function() {
                    $state.go("events", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team_creation", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member", {event: $scope.event});
                };
                
                Models.getEvent("Event1").$loaded(function(data){
                    console.log(Search.forMembers(data, "KYle"));
                });
            }
        ]
);
