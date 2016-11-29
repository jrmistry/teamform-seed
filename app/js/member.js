angular.module('teamform')
	.controller('MemberCtrl', ['$scope', '$stateParams', '$state', 'Models', 'Search',
		function ($scope, $stateParams, $state, models, search) {

            $scope.teams = [];

            $scope.eventID = $stateParams.event;
            $scope.memberID = $stateParams.memberID;
            $scope.teamList = [];
            $scope.inTeam = true;

            $scope.load = function(event){
                $scope.event = event;
                if (event.teams == undefined) {
                    $scope.teams = [];
                    event.teams = [];
                }
                $scope.teams = event.teams;
                $scope.member = event.members[$scope.memberID];
                $scope.inTeam = $scope.member.teamID != undefined;

                for (var index in $scope.teams) {
                    $scope.teams[index].id = index;
                    if (!$scope.inTeam || $scope.member.teamID == index) {
                        $scope.teamList.push($scope.teams[index]);
                    }
                }
                $scope.teams = event.teams;
            };

            models.getEvent($scope.eventID).$loaded($scope.load);

            $scope.search = function() {
                $scope.teamList = search.forTeams($scope.event, $scope.searchTerm);
            };

            $scope.requestForTeam = function(teamID) {
                $scope.member.teamID = teamID;
                if ($scope.event.teams[teamID].members == undefined) {
                    $scope.event.teams[teamID].members = [];
                }

                $scope.event.teams.members.push($scope.memberID);
            };
}]);
