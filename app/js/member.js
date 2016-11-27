angular.module('teamform')
	.controller('MemberCtrl', ['$scope', '$stateParams', '$state', 'Models',
		function ($scope, $stateParams, $state, models) {

			$scope.memberID = "";
			$scope.member = {};
			$scope.member.name = "";
			$scope.member.selection = [];

			$scope.eventID = $stateParams.event;
			$scope.members = models.getAllMembers($scope.eventID);
			$scope.teams = models.getAllTeams($scope.eventID);

			$scope.loadFunc = function () {
				var userID = $scope.memberID;
				if (userID !== '') {

					$scope.member = models.getMember($scope.eventID, userID);
					$scope.member.$loaded()
						.then(function () {
							if ($scope.member.name == null) {
								$scope.member.name = "";
							};
							if ($scope.member.selection == null) {
								$scope.member.selection = [];
							};
						});
				};
			};

			$scope.saveFunc = function () {
				$scope.memberID = $.trim($scope.memberID);
				$scope.member.name = $.trim($scope.member.name);

				if ($scope.memberID !== '' && $scope.member.name !== '') {
					if ($scope.members.$indexFor($scope.memberID) == -1) {
						var newData = {
							'name': $scope.member.name,
							'selection': $scope.member.selection
						};
						$scope.members.$ref().child($scope.memberID).set(newData);
						$scope.loadFunc();
					} else {
						$scope.member.$save();
					};
				};
			};

			$scope.toggleSelection = function (item) {
				if ($scope.member.selection == null) {
					$scope.member.selection = [];
				};
				
				var idx = $scope.member.selection.indexOf(item);
				if (idx > -1) {
					$scope.member.selection.splice(idx, 1);
				}
				else {
					$scope.member.selection.push(item);
				};
			};
<<<<<<< HEAD
			
			var refPath = eventName + "/member/" + userID;
			var ref = firebase.database().ref(refPath);
			
			ref.set(newData);
		}
	};
	
	$scope.deleteFunc = function() {
		var userID = $scope.userID;
		if (confirm("Are you sure you want to delete this member from the database? \n \nWARNING- this cannot be undone!")) {
		    var refPath = eventName + "/member/" + userID;
                    var ref = firebase.database().ref(refPath);
                    ref.remove();
                    $state.go("member", {event: $scope.event});
                }
	};
	
	$scope.refreshTeams = function() {
		var refPath = eventName + "/team";
		var ref = firebase.database().ref(refPath);
		
		// Link and sync a firebase object
		$scope.selection = [];		
		/*$scope.toggleSelection = function (item) {
			var idx = $scope.selection.indexOf(item);    
			if (idx > -1) {
				$scope.selection.splice(idx, 1);
			}
			else {
				$scope.selection.push(item);
			}
		};*/
	
		$scope.teams = $firebaseArray(ref);
		/*$scope.teams.$loaded()
			.then( function(data) {
			}) 
			.catch(function(error) {
				// Database connection error handling...
				//console.error("Error:", error);
			});*/
	};
        
	$scope.refreshTeams(); // call to refresh teams...
}]);
=======
		}]);
>>>>>>> master
