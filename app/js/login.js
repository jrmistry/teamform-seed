$(document).ready(function () {
    $("#btn_admin").click(function () {
        var val = $('#input_text').val();
        if (val !== '') {
            var url = "create_admin.html?q=" + val;
            window.location.href = url;
            return false;
        }
    });

    $("#btn_leader").click(function () {
        var val = $('#input_text').val();
        if (val !== '') {
            var url = "create_team.html?q=" + val;
            window.location.href = url;
            return false;
        }
    });

    $("#btn_member").click(function () {
        var val = $('#input_text').val();
        if (val !== '') {
            var url = "create_member.html?q=" + val;
            window.location.href = url;
            return false;
        }
    });
});