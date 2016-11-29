(function (angular) {
    'use strict';

    /*
     * A template for member cards to be used throughout the website.
     */
    angular.module('teamform').directive('teamCard', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=data'
            },
            templateUrl: 'app/directives/templates/team-card.html'
        };
    });
}(angular));