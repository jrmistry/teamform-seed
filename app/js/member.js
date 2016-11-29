angular.module('teamform')
	.controller('MemberCtrl', ['$scope', '$stateParams', '$state', 'Models', 'Search',
		function ($scope, $stateParams, $state, models, search) {

            $scope.teams = [];

            $scope.eventID = $stateParams.event;
            $scope.memberID = $stateParams.memberID;
            $scope.teamList = [];
            $scope.resultList = [];

            $scope.inTeam = true;

            $scope.load = function(){
                var event = $scope.event;
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

                    if ($scope.inTeam) {
                        $scope.resultList = $scope.teamList;
                    }
                }
                $scope.teams = event.teams;
            };

            $scope.event = models.getEvent($scope.eventID);

            $scope.event.$loaded($scope.load);

            $scope.search = function(searchTerm) {
                $scope.resultList = search.forTeams($scope.event, searchTerm);
                console.log($scope.resultList);
            };

            $scope.requestForTeam = function(teamID) {
                $scope.member.teamID = teamID;
                if ($scope.event.teams[teamID].members == undefined) {
                    $scope.event.teams[teamID].members = [];
                }

                $scope.event.teams[teamID].members.push($scope.memberID);
                $scope.event.$save();
                $scope.load();
            };
}]);
