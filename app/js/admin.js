angular.module('teamform')
    .controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state',
        function ($scope, $firebaseObject, $firebaseArray, $stateParams, $state) {
            // TODO: implementation of AdminCtrl

            // Initialize $scope.param as an empty JSON object
            $scope.event = {};
            var eventID = $stateParams.event;
            var refPath = "events/" + eventID;
            var ref = firebase.database().ref(refPath);

            // Link and sync a firebase object
            $scope.event = $firebaseObject(ref);
            $scope.event.$loaded()
                .then(function (data) {
                    // Fill in some initial values when the DB entry doesn't exist
                    if (typeof $scope.event.name == "undefined") {
                        $scope.event.name = eventID;
                    };

                    if (typeof $scope.event.maxTeamSize == "undefined") {
                        $scope.event.maxTeamSize = 10;
                    };

                    if (typeof $scope.event.minTeamSize == "undefined") {
                        $scope.event.minTeamSize = 1;
                    };

                    // Enable the UI when the data is successfully loaded and synchornized
                    $('#admin_page_controller').show();
                })
                .catch(function (error) {
                    // Database connection error handling...
                    console.error("Error:", error);
                });

            refPath = "events/" + eventID + "/teams";
            $scope.teams = [];
            $scope.teams = $firebaseArray(firebase.database().ref(refPath));

            refPath = "events/" + eventID + "/members";
            $scope.members = [];
            $scope.members = $firebaseArray(firebase.database().ref(refPath));

            $scope.changeMinTeamSize = function (delta) {
                var newVal = $scope.event.minTeamSize + delta;

                if (newVal >= 1 && newVal <= $scope.event.maxTeamSize) {
                    $scope.event.minTeamSize = newVal;
                }

                $scope.event.$save();
            };

            $scope.changeMaxTeamSize = function (delta) {
                var newVal = $scope.event.maxTeamSize + delta;

                if (newVal >= 1 && newVal >= $scope.event.minTeamSize) {
                    $scope.event.maxTeamSize = newVal;
                }

                $scope.event.$save();
            };

            $scope.saveFunc = function () {
                $scope.event.$save()
                .then( function (data) {
                    $state.go('login')
                });                
            };

            // Delete Event Functionality**
            $scope.deleteFunc = function () {
                if (confirm("Are you sure you want to delete this event from the database? \n \nWARNING- this cannot be undone!")) {
                    //remove the event from firebase, including all child nodes
                    refPath = "events/" + $stateParams.event;
                    ref = firebase.database().ref(refPath);
                    ref.remove();
                    //if deleted return to the index page
                    $state.go('login');
                }
            }
        }]);
