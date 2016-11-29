angular.module('teamform')
    .controller('TeamCreationCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state', 'Models',
        function ($scope, $firebaseObject, $firebaseArray, $stateParams, $state, models) {
            $scope.eventID = "";
            $scope.teamName = "";
            $scope.userName = "";
            $scope.userID = "";
            $scope.skills = [];

            $scope.addSkillFunc = function (skill) {
                $scope.skills.push(skill);
                $scope.newSkill="";
            };

            $scope.createTeam = function () {
                $scope.eventID = $.trim($scope.eventID);

                if ($scope.eventID != "" && $scope.teamID != "" && $scope.userID != "" && $scope.userName != "") {
                    var teamID = $.trim($scope.teamName);
                    var newData = {
                        'leadID': $scope.userID,
                        'leadName': $scope.userName,
                        'size': 0,
                        'minSize': 2,
                        'maxSize': 10,
                        'members': [],
                        'skills': $scope.skills
                    };

                    var event = models.getEvent($scope.eventID);
                    event.$loaded().then(function () {
                        event.$ref().child("teams").child(teamID).set(newData);

                        $state.go("team", {
                            teamID: teamID,
                            eventID: $scope.eventID
                        });
                    });
                }
            };

        }
    ]
);