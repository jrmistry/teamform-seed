angular.module('teamform')
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state', 'Models',
	function($scope, $firebaseObject, $firebaseArray, $stateParams, $state, models) {

    $scope.memberID = "";
	$scope.member = {};
	$scope.member.name = "";
	$scope.member.selection = [];

	$scope.eventID = $stateParams.event;
	$scope.members = models.getAllMembers($scope.eventID);
	$scope.teams = models.getAllTeams($scope.eventID);

	$scope.loadFunc = function() {
		var userID = $scope.memberID;
		if ( userID !== '' ) {

			$scope.member = models.getMember($scope.eventID, userID);
			$scope.member.$loaded()
                .then(function (data) {
					if ($scope.member.name == null) {
						$scope.member.name = "";
					};
					if ($scope.member.selection == null) {
						$scope.member.selection = [];
					};
				});
		};
	};
	
	$scope.saveFunc = function() {
		$scope.memberID = $.trim( $scope.memberID );
		$scope.member.name = $.trim( $scope.member.name );
		
		if ( $scope.memberID !== '' && $scope.member.name !== '' ) {
			if ($scope.members.$indexFor($scope.memberID) == -1) {
				var newData = {
				'name': $scope.member.name,
				'selection': $scope.member.selection
				};
				$scope.members.$ref().child($scope.memberID).set(newData);
			} else {
				$scope.member.$save();
			};
		};
	};

	$scope.toggleSelection = function (item) {
		var idx = $scope.member.selection.indexOf(item);
		if (idx > -1) {
			$scope.member.selection.splice(idx, 1);
		}
		else {
			$scope.member.selection.push(item);
		};
	};
}]);