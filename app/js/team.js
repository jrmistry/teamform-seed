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

			$scope.event = models.getEvent($scope.eventID);
			$scope.team = models.getTeam($scope.eventID, $scope.teamID);

		// 	$scope.requests = [];
		// 	$scope.refreshViewRequestsReceived = function () {
		// 		$scope.teamID = $.trim($scope.teamID);
        //
		// 		$.each($scope.members, function (i, obj) {
		// 			var memberID = obj.$id;
		// 			if (typeof obj.selection != "undefined" && obj.selection.indexOf($scope.teamID) > -1) {
		// 				$scope.requests.push(memberID);
		// 			}
		// 		});
		// 	};
        //
		// 	$scope.changeCurrentTeamSize = function (delta) {
		// 		var newVal = $scope.team.size + delta;
		// 		if (newVal >= $scope.event.minTeamSize && newVal <= $scope.event.maxTeamSize) {
		// 			$scope.team.size = newVal;
		// 		}
		// 	};
        //
		// 	$scope.saveFunc = function () {
		// 		$scope.teamID = $.trim($scope.teamID);
        //
		// 		if ($scope.teamID != '') {
		// 			if ($scope.teams.$indexFor($scope.teamID) == -1) {
		// 				var newData = {
		// 					'size': $scope.team.size,
		// 					'teamMembers': $scope.team.teamMembers,
		// 					'leadID': $scope.team.leadID,
		// 					'leadName': $scope.team.leadName
		// 				};
		// 				$scope.teams.$ref().child($scope.teamID).set(newData);
		// 				$scope.loadFunc();
		// 			} else {
		// 				$scope.team.$save();
		// 			}
        //
		// 			//Removes the requests from all members who were accepted in team
		// 			$.each($scope.team.teamMembers, function (i, obj) {
		// 				var rec = $scope.members.$getRecord(obj);
		// 				rec.selection = [];
		// 				$scope.members.$save(rec);
		// 			});
		// 		}
		// 	};
        //
		// 	$scope.loadFunc = function () {
		// 		$scope.teamID = $.trim($scope.teamID);
        //
		// 		if ($scope.teamID !== '') {
		// 			$scope.team = models.getTeam($scope.eventID, $scope.teamID);
		// 			$scope.team.$loaded()
		// 				.then(function (data) {
		// 					if ($scope.team.teamMembers == null) {
		// 						$scope.team.teamMembers = [];
		// 					}
		// 					$scope.refreshViewRequestsReceived();
		// 				});
		// 		}
		// 	};
        //
		// 	//Delete Team Functionality**
		// 	$scope.deleteFunc = function () {
		// 		if (confirm("Are you sure you want to delete this team from the event?\nCurrent team members will not be deleted.\n \nWARNING- this cannot be undone!")) {
		// 			$scope.team.$remove();
		// 			$state.go('login');
		// 		}
		// 	};
        //
		// 	$scope.processRequest = function (request) {
		// 		if ($scope.team.teamMembers.indexOf(request) < 0 &&
		// 			$scope.team.teamMembers.length < $scope.team.size) {
        //
		// 			// Not exists, and the current number of team member is less than the preferred team size
		// 			$scope.team.teamMembers.push(request);
		// 			$scope.requests.splice($scope.requests.indexOf(request), 1);
		// 		}
		// 	};
        //
		// 	$scope.removeMember = function (member) {
		// 		var index = $scope.team.teamMembers.indexOf(member);
		// 		if (index > -1) {
		// 			$scope.team.teamMembers.splice(index, 1);
		// 		}
		// 	};
		}
	]
);
