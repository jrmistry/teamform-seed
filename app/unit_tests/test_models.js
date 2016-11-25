var firebase = {
    database: function () {
        return {
            ref: function (item1) {
                return item1;
            }
        }
    }
};

describe('Test models.js', function () {

    var modelsService;

    beforeEach(module('teamform'));

    beforeEach(function(){

        module(function($provide){
            $provide.factory('$firebaseObject', function(){
                function dummy(ref){
                    return ref;
                }
                return dummy;
            });
            $provide.factory('$firebaseArray', function(){
                function dummy(ref){
                    return ref;
                }
                return dummy;
            });
        });
    });

    beforeEach(inject(function(Models){
        modelsService = Models;
    }));

    it('test models service', function () {
        expect(modelsService.getAllEvents()).toBe('events');
        expect(modelsService.getEvent("eventId")).toBe('events/eventId');
        expect(modelsService.getAdmin("eventId")).toBe('events/eventId/admin');
        expect(modelsService.getAllTeams("eventId")).toBe('events/eventId/teams');
        expect(modelsService.getTeam("eventId", "teamId")).toBe('events/eventId/teams/teamId');
        expect(modelsService.getAllMembers("eventId")).toBe('events/eventId/members');
        expect(modelsService.getMember("eventId", "memberId")).toBe('events/eventId/members/memberId');
    });
});