angular.module('teamform')
	.controller('MemberCtrl', ['$scope', '$stateParams', '$state', 'Models', 'Search',
		function ($scope, $stateParams, $state, models, search) {

            $scope.teams = [];

            $scope.eventID = $stateParams.event;
            $scope.memberID = $stateParams.memberID;
            $scope.teamList = [];
            models.getEvent($scope.eventID).$loaded(function(event){
                $scope.event = event;
                $scope.teams = event.teams;

                for (var index in $scope.teams) {
                    $scope.teams[index].id = index;
                    $scope.teamList.push($scope.teams[index]);
                }
                $scope.teams = event.teams;
                $scope.member = event.members[$scope.memberID]; 
            });

            $scope.search = function() {
                $scope.teamList = search.forTeams($scope.event, $scope.searchTerm);
            };

            $scope.requestForTeam = function(teamID) {
                if ($scope.member.invites == undefined) {
                    $scope.member.invites = [];
                }
                $scope.member.invites.push(teamID);

                var team = $scope.teams[teamID];

                if (team.requests == undefined) {
                    team.requests = [];
                }
                team.requests.push($scope.memberID);
                $scope.event.$save();
            };
            

            $scope.requestForTeam = function(teamID) {
                if ($scope.member.invites == undefined) {
                    $scope.member.invites = [];
                }
                $scope.member.invites.push(teamID);

                var team = $scope.teams[teamID];

                if (team.requests == undefined) {
                    team.requests = [];
                }
                team.requests.push($scope.memberID);
                $scope.event.$save();
            };
}]);
