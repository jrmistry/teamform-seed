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
        modelsService.getAllEvents();
        modelsService.getEvent("eventId");
        modelsService.getAdmin("eventId");
        modelsService.getAllTeams("eventId");
        modelsService.getTeam("eventId", "teamId");
        modelsService.getAllMembers("eventId");
        modelsService.getMember("eventId", "memberId");
    });
});