angular.module('teamform')
	.controller('MemberCtrl', ['$scope', '$stateParams', '$state', 'Models',
		function ($scope, $stateParams, $state, models) {

            $scope.eventID = $stateParams.event;
            $scope.memberID = $stateParams.memberID;
            $scope.teamList = [];
            $scope.event = models.getEvent($scope.eventID).$loaded(function(event){
                $scope.teams = event.teams;

                for (var index in $scope.teams) {
                    $scope.teams[index].id = index;
                    $scope.teamList.push($scope.teams[index]);
                }
                console.log($scope.teamList);
                $scope.teams = event.teams;

                $scope.member = event.members[$scope.memberID];
            });

            $scope.requestForTeam = function(teamID) {
                if ($scope.member.invites == undefined) {
                    $scope.member.invites = [];
                }
                $scope.member.invites.push(teamID);

                var team = $scope.teams[teamID];

                if (team.requests == undefined) {
                    team.requests = [];
                }
                team.requests.push(teamID);
                $scope.event.$save();
            };
}]);
