angular.module('teamform')
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray',  '$stateParams', '$state',
    function($scope, $firebaseObject, $firebaseArray, $stateParams, $state) {

	$scope.event = {};
	$scope.team = {
		"teamID" : "",
		"size" : 0,
		"teamMembers" : []
	};
	var refPath = "";
	var eventID = $stateParams.event;
	var refPath = "events/" + eventID;
    var ref = firebase.database().ref(refPath);

    // Link and sync a firebase object
    $scope.event = $firebaseObject(ref);
	$scope.event.$loaded()
		.then(function (data) {
			$scope.team.size = parseInt(($scope.event.minTeamSize + $scope.event.maxTeamSize)/2);
			$('#team_page_controller').show();
		});
	
	refPath = "events/" + eventID + "/members";
	$scope.members = [];
	$scope.members = $firebaseArray(firebase.database().ref(refPath));
	
	refPath = "events/" + eventID + "/teams";
	$scope.teams = [];
	$scope.teams = $firebaseArray(firebase.database().ref(refPath));
	
	$scope.requests = [];
	$scope.refreshViewRequestsReceived = function() {		
		var teamID = $.trim($scope.team.teamID);

		$.each($scope.members, function(i,obj) {
			var memberID = obj.$id;
			if ( typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1 ) {
				$scope.requests.push(memberID);
			};
		});
		$scope.$apply();
	};

	$scope.changeCurrentTeamSize = function(delta) {
		var newVal = $scope.team.size + delta;
		if (newVal >= $scope.event.minTeamSize && newVal <= $scope.event.maxTeamSize ) {
			$scope.team.size = newVal;
		};
	};

	$scope.saveFunc = function() {
		var teamID = $.trim( $scope.team.teamID );
		
		if ( teamID !== '' ) {
			var newData = {
				'size': $scope.team.size,
				'teamMembers': $scope.team.teamMembers
			};		
			
			var refPath = "events/" + eventID + "/teams/" + teamID;
			var ref = firebase.database().ref(refPath);
			// for each team members, clear the selection in /[eventID]/team/
			
			$.each($scope.team.teamMembers, function(i,obj){
				var rec = $scope.members.$getRecord(obj);
				rec.selection = [];
				$scope.members.$save(rec);
			});

			ref.set(newData, function(){

			});
		};
	};
	
	$scope.loadFunc = function() {
		var teamID = $.trim( $scope.team.teamID );
		var refPath = "events/" + eventID + "/teams/" + teamID;

		$scope.retrieveOnceFirebase(firebase, refPath, function(data) {	
			if ( data.child("size").val() != null ) {
				$scope.team.size = data.child("size").val();
				$scope.refreshViewRequestsReceived();	
			}; 
			
			if ( data.child("teamMembers").val() != null ) {
				$scope.team.teamMembers = data.child("teamMembers").val();
			};
			$scope.$apply(); // force to refresh
		});
	};

	//Delete Team Functionality**
	$scope.deleteFunc = function() {
	    if (confirm("Are you sure you want to delete this team from the event?\nCurrent team members will not be deleted.\n \nWARNING- this cannot be undone!")){
		//remove the event from firebase, including all child nodes
		var teamID = $.trim( $scope.team.teamID );		
		var refPath = "events/" + eventID + "/teams/" + teamID ;
		ref = firebase.database().ref(refPath);
		ref.remove();
        }
	};
	
	$scope.processRequest = function(request) {
		if ($scope.team.teamMembers.indexOf(request) < 0 && 
			$scope.team.teamMembers.length < $scope.team.size) {
				
			// Not exists, and the current number of team member is less than the preferred team size
			$scope.team.teamMembers.push(request);
			$scope.request.remove(request);
			
			$scope.saveFunc();
		};
	};
	
	$scope.removeMember = function(member) {
		var index = $scope.team.teamMembers.indexOf(member);
		if ( index > -1 ) {
			$scope.team.teamMembers.splice(index, 1); // remove that item
			
			$scope.saveFunc();
		};
	};
}]);
