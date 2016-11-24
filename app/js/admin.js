angular.module('teamform')
    .controller('AdminCtrl', ['$scope', '$stateParams', '$state', 'Models',
        function ($scope, $stateParams, $state, models) {
            // TODO: implementation of AdminCtrl

            var eventID = $stateParams.event;

            // Link and sync a firebase object
            $scope.event = models.getEvent(eventID);
            $scope.event.$loaded()
                .then(function () {
                    // Fill in some initial values when the DB entry doesn't exist
                    if (typeof $scope.event.name == "undefined") {
                        $scope.event.name = eventID;
                        $scope.event.admin = {};
                        $scope.event.admin.name = "Admin Name";
                        $scope.event.maxTeamSize = 10;
                        $scope.event.minTeamSize = 1;
                        $scope.event.desc = "Event Description";
                    };
                });

            $scope.teams = models.getAllTeams(eventID);
            $scope.members = models.getAllMembers(eventID);

            $scope.changeMinTeamSize = function (delta) {
                var newVal = $scope.event.minTeamSize + delta;

                if (newVal >= 1 && newVal <= $scope.event.maxTeamSize) {
                    $scope.event.minTeamSize = newVal;
                };
            };

            $scope.changeMaxTeamSize = function (delta) {
                var newVal = $scope.event.maxTeamSize + delta;

                if (newVal <= 10 && newVal >= $scope.event.minTeamSize) {
                    $scope.event.maxTeamSize = newVal;
                };
            };

            $scope.saveFunc = function () {
                $scope.event.$save()
            };

            // Delete Event Functionality**
            $scope.deleteFunc = function () {
                var disclaimer = "Are you sure you want to delete this event from the database? \n \nWARNING- this cannot be undone!";
                if (confirm(disclaimer)) {
                    //remove the event from firebase, including all child nodes
                    refPath = "events/" + $stateParams.event;
                    ref = firebase.database().ref(refPath);
                    ref.remove();
                    //if deleted return to the index page
                    $state.go('login');
                };
            };
        }]);
