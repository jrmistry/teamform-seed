describe('Test team.js', function () {
    var paramFunction;

    var models = {};
    models.getEvent = function (eventID) {
        return this.event;
    };
    models.getAllTeams = function (eventID) {
        return this.teams;
    };
    models.getAllMembers = function (eventID) {
        return this.events;
    };
    models.getTeam = function (eventID) {
        return this.team;
    };

    var $scope, $rootScope, $state, $controller, models;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = {};

        createController = function (eventID) {
            return $controller('TeamCtrl', {
                '$scope': $scope,
                '$stateParams': {
                    'event': eventID
                },
                '$state': $state,
                'Models': models
            });
        };
    }));
    
    it('test TeamCtrl loaded', function () {
        models.event = {};
        models.teams = [];
        models.members = [];

        models.event.name = "Event1";
        models.event.admin = {};
        models.event.admin.name = "Admin1";
        models.event.maxTeamSize = 8;
        models.event.minTeamSize = 2;
        models.event.desc = "Event Description";

        models.event.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };

        createController("Event1");

        paramFunction();
    });

    it('test loadFunc with empty teamID', function () {
        models.event = {};
        models.teams = [];
        models.members = [];

        models.event.name = "Event1";
        models.event.admin = {};
        models.event.admin.name = "Admin1";
        models.event.maxTeamSize = 8;
        models.event.minTeamSize = 2;
        models.event.desc = "Event Description";

        models.event.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };

        createController("Event1");

        $scope.loadFunc();
    });

    it('test loadFunc with existing teamID', function () {
        models.event = {};
        models.team = {};
        models.teams = [];
        models.members = [];

        models.event.name = "Event1";
        models.event.admin = {};
        models.event.admin.name = "Admin1";
        models.event.maxTeamSize = 8;
        models.event.minTeamSize = 2;
        models.event.desc = "Event Description";

        models.event.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };
        
        models.team.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };

        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
    });
});
