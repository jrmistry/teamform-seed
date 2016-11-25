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
        return this.members;
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

    it('test loadFunc with existing teamID without teamMembers', function () {
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
        paramFunction();
    });

    it('test loadFunc with existing teamID with teamMembers', function () {
        models.event = {};
        models.teams = [];
        models.members = [{
            $id: 'Member11',
            selection: ["Team11"]
        }];

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

        models.team = {
            $id: "Team11",
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            }
        };

        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        paramFunction();
    });

    it('test deleteFunc success', function () {
        models.team = {};
        models.teams = [];
        models.members = ["Member11"];

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

        models.team = {
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            }
        };  

        spyOn(window, 'confirm').and.returnValue(true);
        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        paramFunction();

        $scope.deleteFunc();
    });

    it('test deleteFunc fail', function () {
        models.team = {};
        models.teams = [];
        models.members = ["Member11"];

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

        models.team = {
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            }
        };
        
        spyOn(window, 'confirm').and.returnValue(false);
        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        paramFunction();

        $scope.deleteFunc();
    });

    it('test changeCurrentTeamSize sucess', function () {
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

        $scope.changeCurrentTeamSize(-1);
    });

    it('test changeCurrentTeamSize fail', function () {
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

        $scope.changeCurrentTeamSize(-10);
    });

    it('test saveFunc fail empty teamID', function () {
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

        $scope.saveFunc();
    });

    it('test saveFunc success with teamID and loaded team', function () {
        models.event = {};
        models.teams = {
            $indexFor: function (teamID) {
                return 0;
            }
        };
        models.members = {
            $getRecord: function (memberID) {
                return {
                    selection: []
                }
            },
            $save: function (rec) {
                return true;
            }
        };

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

        models.team = {
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $save: function () {
            return true
            }
        };  

        createController("Event1");
        $scope.teamID = "Team11";

        $scope.loadFunc();

        $scope.saveFunc();
    });

    it('test saveFunc success with teamID and new team', function () {
        models.event = {};
        models.teams = {
            $indexFor: function (teamID) {
                return -1;
            },
            $ref: function () {
                return {
                    child: function (teamID) {
                        return {
                            set: function (data) {
                                return true;
                            }
                        }
                    }
                }
            }
        };
        models.members = {
            $getRecord: function (memberID) {
                return {
                    selection: []
                }
            },
            $save: function (rec) {
                return true;
            }
        };

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

        models.team = {
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $save: function () {
            return true
            }
        };  

        createController("Event1");
        $scope.teamID = "Team11";

        $scope.loadFunc();

        $scope.saveFunc();
    });

    it('test processRequest success', function () {
        models.event = {};
        models.teams = [];
        models.members = [{
            $id: 'Member12',
            selection: ["Team12"]
        }];

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

        models.team = {
            $id: "Team11",
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            },
            size: 5
        };

        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        $scope.processRequest("Member12");
    });

    it('test processRequest fail', function () {
        models.event = {};
        models.teams = [];
        models.members = [{
            $id: 'Member12',
            selection: ["Team12"]
        }];

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

        models.team = {
            $id: "Team11",
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            },
            size: 5
        };

        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        $scope.processRequest("Member11");
    });

    it('test removeMember success', function () {
        models.event = {};
        models.teams = [];
        models.members = [{
            $id: 'Member12',
            selection: ["Team12"]
        }];

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

        models.team = {
            $id: "Team11",
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            },
            size: 5
        };

        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        $scope.removeMember("Member11");
    });

    it('test removeMember fail', function () {
        models.event = {};
        models.teams = [];
        models.members = [{
            $id: 'Member12',
            selection: ["Team12"]
        }];

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

        models.team = {
            $id: "Team11",
            teamMembers: ["Member11"],
            $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;
                }
            }
        },
            $remove: function () {
            return true
            },
            size: 5
        };

        createController("Event1");

        $scope.teamID = "Team11";

        $scope.loadFunc();
        $scope.removeMember("Member19");
    });
});
