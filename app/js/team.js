angular.module('teamform')
	.controller('TeamCtrl', ['$scope', '$stateParams', '$state', 'Models', 'Search',
		function ($scope, $stateParams, $state, models, search) {
			// Both teamID and eventID will be passed in through stateParams
			$scope.teamID = $stateParams.teamID;
			$scope.eventID = $stateParams.eventID;

			$scope.team = {
				"size": 5,
				"leadID": "",
				"leadName": "",
				"members": [],
				"minSize": 0,
				"maxSize": 0
			};

			$scope.teamMembers = {};
			$scope.searchResults = [];
			$scope.invitations = [];
			$scope.requests = [];
			$scope.query = "";

			$scope.event = models.getEvent($scope.eventID);

            $scope.load = function() {
                $scope.query = "";
                $scope.searchResults = [];
                $scope.team = $scope.event.teams[$scope.teamID];
                var members = $scope.event.members;

                Object.keys($scope.event.members).forEach(function(key){
                    $scope.event.members[key].memberID = key;
                });

                for(var index in $scope.team.members) {
                    var memberID = $scope.team.members[index];
                    $scope.teamMembers[memberID] = members[memberID];
                }
            };

			$scope.event.$loaded().then($scope.load);

			$scope.search = function(query) {
				$scope.searchResults = search.forMembers($scope.event, query);
			};

            $scope.addMember = function(memberID) {
                if ($scope.team.members == undefined) {
                    $scope.team.members = [];
                }
                $scope.team.members.push(memberID);
                $scope.event.members[memberID].teamID = $scope.teamID;
                $scope.event.$save();
                $scope.load();
            };
		}
	]
);
