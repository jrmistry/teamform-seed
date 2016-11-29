angular.module('teamform')
	.controller('TeamCtrl', ['$scope', '$stateParams', '$state', 'Models',
		function ($scope, $stateParams, $state, models) {
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
		}
	]
);
