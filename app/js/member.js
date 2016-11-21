angular.module('teamform')
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state',
	function($scope, $firebaseObject, $firebaseArray, $stateParams, $state) {

    var eventID = $stateParams.event;
    $scope.event = eventID;
	$scope.memberID = "";
	$scope.memberName = "";	
	$scope.teams = {};
	$scope.selection = [];

	$scope.loadFunc = function() {
		var userID = $scope.memberID;
		if ( userID !== '' ) {
			
			var refPath = "events/" + eventID + "/members/" + userID;
			$scope.retrieveOnceFirebase(firebase, refPath, function(data) {
								
				if ( data.child("name").val() != null ) {
					$scope.memberName = data.child("name").val();
				} else {
					$scope.memberName = "";
				}
				
				if (data.child("selection").val() != null ) {
					$scope.selection = data.child("selection").val();
				}
				else {
					$scope.selection = [];
				}
				//$scope.$apply();
			});
		}
	};
	
	$scope.saveFunc = function() {		
		var newMemberID = $.trim( $scope.memberID );
		var newMemberName = $.trim( $scope.memberName );
		
		if ( newMemberID !== '' && newMemberName !== '' ) {	
			var newData = {				
				'name': newMemberName,
				'selection': $scope.selection
			};
			
			var refPath = "events/" + eventID + "/members/" + newMemberID;
			var ref = firebase.database().ref(refPath);
			
			ref.set(newData);
		};
	};
	
	$scope.refreshTeams = function() {
		var refPath = "events/" + eventID + "/teams";
		var ref = firebase.database().ref(refPath);

		$scope.toggleSelection = function (item) {
			var idx = $scope.selection.indexOf(item);    
			if (idx > -1) {
				$scope.selection.splice(idx, 1);
			}
			else {
				$scope.selection.push(item);
			};
		};
		
		// Link and sync a firebase object
		$scope.teams = $firebaseArray(ref);
	};
        
	$scope.refreshTeams(); // call to refresh teams...
}]);