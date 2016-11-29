angular.module('teamform')
    .controller('MemberCreationCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state', 'Models',
        function($scope, $firebaseObject, $firebaseArray, $stateParams, $state, models) {
		
		$scope.memberID = "";
		$scope.member = {};
		$scope.member.name = "";
		$scope.member.school = "";
		$scope.member.selection = [];
		$scope.member.skills = [];

		$scope.eventID = $stateParams.event;
		$scope.members = models.getAllMembers($scope.eventID);
		$scope.teams = models.getAllTeams($scope.eventID);

		$scope.addSkillFunc = function (skill) {
			$scope.member.skills.push(skill);

		};

		$scope.saveFunc = function () {
				$scope.eventID = $.trim($scope.eventID);
				$scope.memberID = $.trim($scope.memberID);
				$scope.member.name = $.trim($scope.member.name);
				$scope.member.school = $.trim($scope.member.school);


				//if ($scope.memberID !== '' && $scope.member.name !== '') {
					//if ($scope.members.$indexFor($scope.memberID) == -1) {
						var newData = {
							'name': $scope.member.name,
							'school': $scope.member.school,
							'selection': $scope.member.selection,
							'skills': $scope.member.skills
						};
						console.log(newData);
						console.log($scope.memberID);
						$scope.members.$ref().child($scope.memberID).set(newData);
						$scope.member.$save();
					//} else {
						//$scope.member.$save();
						//$state.go('member', );
					//};
				//};
		};

}]);
