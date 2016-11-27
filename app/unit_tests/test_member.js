describe('Test member.js', function () {
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

    models.getMember = function (eventID, memberID) {
        return this.member;
    };

    var $scope, $rootScope, $state, $controller, models;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = {};

        createController = function (eventID) {
            return $controller('MemberCtrl', {
                '$scope': $scope,
                '$stateParams': {
                    'event': eventID
                },
                '$state': $state,
                'Models': models
            });
        };
    }));

    it('test MemberCtrl loaded', function () {
        createController("Event1");
    });

    it('test loadFunc empty userID', function () {
        createController("Event1");
        $scope.loadFunc();
    });

    it('test loadFunc sucess with existing member', function () {
        models.member = {
            name: "Member11",
            selection: [],
            $loaded: function () {
                return {
                    then: function (func) {
                        paramFunction = func;
                    }
                }
            }
        };
        createController("Event1");
        $scope.memberID = "Member11";

        $scope.loadFunc();
        paramFunction();
    });

    it('test loadFunc sucess with new member', function () {
        models.member = {
            $loaded: function () {
                return {
                    then: function (func) {
                        paramFunction = func;
                    }
                }
            }
        };
        createController("Event1");
        $scope.memberID = "Member11";

        $scope.loadFunc();
        paramFunction();
    });

    it('test saveFunc fail with empty id and name', function () {
        createController("Event1");

        $scope.saveFunc();
    });

    it('test saveFunc fail with empty name', function () {
        createController("Event1");

        $scope.memberID = "Member11";
        $scope.saveFunc();
    });

    it('test saveFunc sucess with existing member', function () {
        models.member = {
            $id: "Member11",
            name: "Member11",
            selection: [],
            $loaded: function () {
                return {
                    then: function (func) {
                        paramFunction = func;
                    }
                }
            },
            $save: function () { return true }
        };

        models.members = {
            data: [models.member.$id],
            $indexFor: function (memberID) {
                return 0;
            },
            $ref: function () {
                return function child(memberID) {
                    return function set(newData) {
                        return true;
                    }
                }
            }
        };

        createController("Event1");
        $scope.memberID = "Member11";

        $scope.loadFunc();

        $scope.saveFunc();
    });

    it('test saveFunc sucess with new member', function () {
        models.member = {
            $id: "",
            name: "",
            selection: [],
            $loaded: function () {
                return {
                    then: function (func) {
                        paramFunction = func;
                    }
                }
            },
            $save: function () { return true }
        };

        models.members = {
            data: [models.member.$id],
            $indexFor: function (memberID) {
                return -1;
            },
            $ref: function () {
                return {
                    child: function (memberID) {
                        return {
                            set: function set(newData) {
                                return true;
                            }
                        }
                    }
                }
            }
        };

        createController("Event1");
        $scope.memberID = "Member11";
        $scope.member.name = "Member11"
        $scope.member.selection = ["Team11"];

        $scope.saveFunc();
    });

    it('test toggleSelection with empty team', function () {
        createController("Event1");
        $scope.member.selection = null;
        $scope.toggleSelection("Team11");
    });

    it('test toggleSelection to add team', function () {
        createController("Event1");
        $scope.toggleSelection("Team11");
    });

    it('test toggleSelection to remove team', function () {
        createController("Event1");
        $scope.member.selection = ["Team11", "Team12"];
        $scope.toggleSelection("Team11");
    });
});
