angular.module('teamform')
        .controller('LoginCtrl', ['$scope', '$state', 'Models', 'Search',
            function($scope, $state, models, search) {
                $scope.loginID = "";
                $scope.eventID = "";

                $scope.goToAdmin = function() {
                    $state.go("admin_creation", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team_creation", {event: $scope.eventID});
                };

                $scope.goToMember = function() {
                    $state.go("member_creation", {event: $scope.eventID});
                };

                $scope.login = function () {
                    var events = models.getAllEvents();
                    events.$loaded()
                        .then(function () {
                            var result = search.globalUserSearch(events, $scope.loginID);

                            if (result == null) {
                                console.log("Invalid Login ID");
                            } else if (result.type == "admin") {
                                $scope.eventID = result.event;
                                $scope.goToAdmin();
                            } else if (result.type == "member") {
                                $scope.eventID = result.event;
                                $state.go("member", {event: $scope.eventID, member: result.member});
                            } else if (result.type == "team") {
                                $scope.eventID = result.event;
                                $state.go("team", {event: $scope.eventID, team: result.team});
                            }
                        });
                };
            }
        ]
);
