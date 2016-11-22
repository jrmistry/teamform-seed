(function (angular) {
    'use strict';

    /*
     HOW TO USE: $firebaseArray
     https://github.com/firebase/angularfire/blob/master/docs/guide/synchronized-arrays.md#api-summary
     */

    angular.module('teamform').service('Models',
        ['$firebaseObject', '$firebaseArray',
            function ($firebaseObject, $firebaseArray) {
                var EVENT = 'events';
                var ADMIN = 'admin';
                var TEAM = 'teams';
                var MEMBER = 'members';

                this.getAllEvents = function() {
                    return $firebaseArray(firebase.database().ref(EVENT));
                };

                this.getEvent = function(eventId) {
                    var path = [EVENT, eventId].join("/");
                    return $firebaseObject(firebase.database().ref(path));
                };

                this.getAdmin = function(eventId) {
                    var path = [EVENT, eventId, ADMIN].join("/");
                    return $firebaseObject(firebase.database().ref(path));
                };

                this.getAllTeams = function(eventId) {
                    var path = [EVENT, eventId, TEAM].join("/");
                    return $firebaseArray(firebase.database().ref(path));
                };

                this.getTeam = function(eventId, teamId) {
                    var path = [EVENT, eventId, TEAM, teamId].join("/");
                    return $firebaseObject(firebase.database().ref(path));
                };

                this.getAllMembers = function(eventId) {
                    var path = [EVENT, eventId, MEMBER].join("/");
                    return $firebaseArray(firebase.database().ref(path));
                };

                this.getMember = function(eventId, memberId) {
                    var path = [EVENT, eventId, MEMBER, memberId].join("/");
                    return $firebaseObject(firebase.database().ref(path));
                };

            }]);
}(angular));