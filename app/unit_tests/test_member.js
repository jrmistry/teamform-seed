var firebase = {
    database: function () {
        return new window.MockFirebase("");
    }
};

describe('Test member.js', function () {
    var paramFunction, catchFunction;

    var firebaseParam1 = {
        $loaded: function () {
            return {
                then: function (func) {
                    return {
                        catch: function (func) {
                            return [];
                        }
                    }
                }
            };
        },
        $save: jasmine.createSpy(),
        'memberName':'Member11'
    };

    var firebaseParam2 = {
        $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;

                    return {
                        catch: function (func) {
                            catchFunction = func;
                            return [];
                        }
                    }
                }
            };
        }
    };

    var $firebaseObject1 = function () {
        return firebaseParam1;
    };

    var $firebaseObject2 = function () {
        return firebaseParam2;
    };

    var $firebaseArray = function () {
        return [];
    };

    var $rootScope, $state, $controller, $save, testCallback, testStateGo;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        $rootScope.retrieveOnceFirebase = function(firebase, path, callback) {
            testCallback = callback;
        }

        spyOn($state, 'go');

        createController = function ($firebaseObject, $firebaseArray) {
            return $controller('MemberCtrl', {
                '$scope': $rootScope,
                '$firebaseObject': $firebaseObject,
                '$firebaseArray': $firebaseArray,
                '$stateParams': {},
                '$state': $state
            });
        };
    }));

    it('test initial value of userID', function () {
        createController($firebaseObject2, $firebaseArray);
        expect($rootScope.userID).toBe('');
    });
    it('test initial value of userName', function () {
        createController($firebaseObject2, $firebaseArray);
        expect($rootScope.userName).toBe('');
    });
    it('test initial value of teams', function () {
        createController($firebaseObject2, $firebaseArray);
        expect($rootScope.teams.length).toBe($firebaseArray().length);
    });

    it('test loadFunc success', function () {
        createController($firebaseObject2, $firebaseArray);

        $rootScope.userID = 'randomID';

        $rootScope.loadFunc();

        var testName = "testName";
        var testSelection = ["team1", "team2"];

        var dummyData = {
            memberName: "testName",
            selection: ["team1", "team2"],
            child: function(name) {
                return {
                    property: this[name],
                    val: function() {
                        return (this.property);
                    }
                }
            }
        };

        testCallback(dummyData);
        expect($rootScope.userName).toBe(testName);
        expect($rootScope.selection.length).toBe(testSelection.length);
        expect($rootScope.selection[0]).toBe('team1');
    });
    it('test loadFunc bad userID', function () {
        createController($firebaseObject2, $firebaseArray);

        $rootScope.userID = '';

        $rootScope.loadFunc();

        expect($rootScope.userName).toBe('');
        expect($rootScope.selection.length).toBe(0);
    });
    it('test loadFunc null data', function () {
        createController($firebaseObject2, $firebaseArray);

        $rootScope.userID = 'randomID';

        $rootScope.loadFunc();

        var testName = "testNameFail";

        var dummyData = {
            memberName: null,
            selection: null,
            child: function(name) {
                return {
                    property: this[name],
                    val: function() {
                        console.log(this);
                        return (this.property);
                    }
                }
            }
        };

        testCallback(dummyData);
        expect($rootScope.userName).toBe('');
        expect($rootScope.selection.length).toBe(0);
    });

    it('test saveFunc success', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.$state = jasmine.createSpy();

        $rootScope.userID = 'Member99';
        $rootScope.userName = 'Member 99';

        $rootScope.saveFunc();
        expect($rootScope.userID).toBe('Member99');
        expect($rootScope.userName).toBe('Member 99');
    });
    it('test saveFunc fail no name', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.$state = jasmine.createSpy();

        $rootScope.userID = '';
        $rootScope.userName = '';

        $rootScope.saveFunc();

        expect($rootScope.userID).toBe('');
        expect($rootScope.userName).toBe('');
    });

    it('test refreshTeams', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.$state = jasmine.createSpy();

        $rootScope.userID = 'Member99';
        $rootScope.userName = 'Member 99';

        $rootScope.refreshTeams();
        expect($rootScope.userID).toBe($rootScope.userID);
    });
});