angular.module('teamform')
    .controller('MemberCreationCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state', 'Models',
        function($scope, $firebaseObject, $firebaseArray, $stateParams, $state, models) {
		
		$scope.memberID = "";
		$scope.eventID = "";
		$scope.name = "";
		$scope.school = "";
		$scope.selection = [];
		$scope.skills = [];

		$scope.addSkillFunc = function (skill) {
			$scope.skills.push(skill);
			$scope.newSkill="";
		};

		$scope.saveFunc = function () {
			$scope.members = models.getAllMembers($scope.eventID).$loaded(function(data){
				var newData = {
					'name': $scope.name,
					'school': $scope.school,
					'selection': $scope.selection,
					'skills': $scope.skills,
					'memberID': $scope.memberID
				};
				data.$ref().child($scope.memberID).set(newData);
				$state.go('member', {event: $scope.eventID, member: $scope.memberID});
			});
		};

}]);
