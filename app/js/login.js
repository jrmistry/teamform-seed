var testing = {};
var twist = {};
angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state',
            function($scope, $firebaseObject, $firebaseArray, $state) {
                $scope.goToAdmin = function() {
                    $state.go("admin", {event: $scope.event});
                };

                $scope.goToTeam = function() {
                    $state.go("team", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member", {event: $scope.event});
                };

                var ref = firebase.database().ref("events");
                var list = $firebaseArray(ref);
                list.$loaded().then(function(data){
                    console.log("loaded");
                    console.log(data);
                    twist = data;
                });

                $scope.retrieveOnceFirebase(firebase, "events", function(data) {
                    console.log("value");
                    testing = data;
                    console.log(data);
                });

            }
        ]
);