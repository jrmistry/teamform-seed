(function (angular) {
    'use strict';

    angular.module('teamform').service('EventService',
        ['$firebaseObject', '$firebaseArray', '$rootScope',
            function ($firebaseObject, $firebaseArray, $rootScope) {
                this.refPath = "events";
                this.getAllEvents = function() {
                    return $firebaseArray(firebase.database().ref(this.refPath));
                };

                this.getEvent = function(id) {
                    return $firebaseObject(firebase.database().ref(this.refPath + '/' + id));
                }
            }]);
}(angular));