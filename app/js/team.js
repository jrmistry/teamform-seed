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
			$scope.searchResults = null;
			$scope.invitations = [];
			$scope.requests = [];
			$scope.query = "";

			$scope.event = models.getEvent($scope.eventID);

			$scope.event.$loaded().then(function() {
				$scope.team = $scope.event.teams[$scope.teamID];
				var members = $scope.event.members;

				for(var index in $scope.team.members) {
					var memberID = $scope.team.members[index];
					members[memberID].memberId = memberID;
					$scope.teamMembers[memberID] = members[memberID];
				}
			});

			$scope.hasNoMembers = function() {
				return Object.keys(teamMembers).length < 1;
			};

			$scope.addMember = function(member) {
				// TODO: vishal do this
			};

			$scope.search = function(query) {
				var results = search.forMembers($scope.event, query);
				$scope.searchResults = [];

				if (results.length > 1) {
					for (var index in results) {
						var res = results[index];
						if (($.inArray(res.memberId, Object.keys($scope.teamMembers)) <= -1)) {
							$scope.searchResults.push(res);
						}
					}
				}
			}
		}
	]
);
