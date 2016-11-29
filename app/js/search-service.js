(function (angular) {

    /*
    USE: initilize search
     */

    angular.module('teamform').service('Search',
        [
            function () {
                // eventList is the firebaseArray object after calling models.getAllEvents
                this.globalUserSearch = function(eventList, text) {
                    var result = {type: null};
                    eventList.find(function(event) {
                        result.event = event.$id;

                        // search for admin
                        if (event.admin.name == text) {
                            result.type = "admin";
                            result.id = event.admin.name;
                        }

                        // search through members
                        if (result.type == null) {
                            Object.keys(event.members).forEach(function(key){
                                if (key == text) {
                                    result.type = "member";
                                    result.id = key;
                                }
                            });
                        }

                        // search through teams
                        if (result.type == null) {
                            Object.keys(event.teams).forEach(function(key){
                                if (key == text) {
                                    result.type = "team";
                                    result.id = key;
                                }
                            });
                        }
                        return result.type != null;
                    });

                    return result;
                };

                this.forMembers = function(event, text) {
                    var resultList = [];
                    console.log(Object.keys(event.members));
                    Object.keys(event.members).forEach(function(key){
                        var shouldAdd = false;
                        var member = event.members[key];
                        if (member.name.indexOf(text) > -1) {
                            shouldAdd = true;
                        }

                        member.skills.forEach(function(skill){
                            if (skill == text) {shouldAdd = true;}
                        });

                        if (shouldAdd) {
                            resultList.push(member);
                        }
                    });

                };
            }]);
}(angular));
