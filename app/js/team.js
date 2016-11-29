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

			$scope.changeCurrentMinTeamSize = function (newVal) {
				if (newVal >= 0 && newVal <= $scope.team.maxSize) {
					$scope.team.minSize = newVal;
					$scope.event.$save();
				}
			};

			$scope.changeCurrentMinTeamSizeWithDelta = function (delta) {
				var newVal = $scope.team.minSize + delta;
				$scope.changeCurrentMinTeamSize(newVal);
			};

			$scope.changeCurrentMaxTeamSize = function (newVal) {
				if (newVal >= 0 && newVal >= $scope.team.minSize) {
					$scope.team.maxSize = newVal;
					$scope.event.$save();
				}
			};

			$scope.changeCurrentMaxTeamSizeWithDelta = function (delta) {
				var newVal = $scope.team.maxSize + delta;
				$scope.changeCurrentMaxTeamSize(newVal);
			};
		}
	]
);
