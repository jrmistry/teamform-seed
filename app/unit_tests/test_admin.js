var firebase = {
    database: function () {
        return new window.MockFirebase("");
    }
};

describe('Test admin.js', function () {
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

    var $scope, $rootScope, $state, $controller, models;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = {};

        createController = function (eventID) {
            return $controller('AdminCtrl', {
                '$scope': $scope,
                '$stateParams': {
                    'event': eventID
                },
                '$state': $state,
                'Models': models
            });
        };
    }));

    it('test AdminCtrl loaded', function () {
        models.event = {};
        models.teams = [];
        models.members = [];

        models.event.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };

        createController("Event1");
    });

    it('test $loaded.then function with undefined event', function () {
        models.event = {};
        models.teams = [];
        models.members = [];

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

    it('test $loaded.then function with existing event', function () {
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

    it('test changeMinTeamSize() sucess', function () {
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

        $scope.changeMinTeamSize(1);
    });

    it('test changeMinTeamSize() fail', function () {
        models.event = {};
        models.teams = [];
        models.members = [];

        models.event.name = "Event1";
        models.event.admin = {};
        models.event.admin.name = "Admin1";
        models.event.maxTeamSize = 8;
        models.event.minTeamSize = 1;
        models.event.desc = "Event Description";

        models.event.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };

        createController("Event1");

        $scope.changeMinTeamSize(-1);
    });

    it('test changeMaxTeamSize() sucess', function () {
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

        $scope.changeMaxTeamSize(-1);
    });

    it('test changeMaxTeamSize() fail', function () {
        models.event = {};
        models.teams = [];
        models.members = [];

        models.event.name = "Event1";
        models.event.admin = {};
        models.event.admin.name = "Admin1";
        models.event.maxTeamSize = 10;
        models.event.minTeamSize = 1;
        models.event.desc = "Event Description";

        models.event.$loaded = function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        };

        createController("Event1");

        $scope.changeMaxTeamSize(1);
    });

    it('test saveFunc', function () {
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
        models.event.$save = function () {
            return true;
        };

        createController("Event1");

        $scope.saveFunc();
    });

    it('test deleteFunc sucess', function () {
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
        models.event.$save = function () {
            return true;
        };

        createController("Event1");

        spyOn(window, 'confirm').and.returnValue(true);
        $scope.deleteFunc();
    });

    it('test deleteFunc fail', function () {
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
        models.event.$save = function () {
            return true;
        };

        createController("Event1");

        spyOn(window, 'confirm').and.returnValue(false);
        $scope.deleteFunc();
    });
});
