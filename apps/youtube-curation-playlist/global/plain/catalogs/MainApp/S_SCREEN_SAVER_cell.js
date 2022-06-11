var _request_exit_screen = false;

function on_loaded() {
    if (document.value("timer.running")) {
        var times = document.value("timer.time").split(": ");
        var elapsed = parseInt((Date.now() - document.value("timer.started-at")) / 1000);
        var seconds = 59 - (elapsed % 60);
        var minutes = parseInt(times[1]) - (parseInt(elapsed / 60) + ((seconds > 0) ? 1 : 0));
        var hours = parseInt(times[0]);
  
        if (minutes < 0) {
            minutes = (hours > 0) ? 60 + minutes : 0;
            hours = Math.max(hours - 1, 0);
        }

        view.object("timer").property({ 
            "time":((hours   < 10) ? "0" : "") + hours   + ": " + 
                   ((minutes < 10) ? "0" : "") + minutes + ": " + 
                   ((seconds < 10) ? "0" : "") + seconds
        });
        view.object("timer").action("start");

        view.object("label.timer.time").action("show");
        view.object("label.guide").action("hide");
        view.object("btn.timer").property({ "selected": "yes" });
    }
}

function exit_screen_saver() {
    if (!_request_exit_screen) {
        view.object("label.onemore").action("show");
        view.object("label.timer.time").action("hide");
        view.object("label.guide").action("hide");
        view.object("btn.unlock").property({ "selected": "yes" });

        _request_exit_screen = true;

        timeout(1, function() {
            if (document.value("timer.running")) {
                view.object("label.timer.time").action("show");
            } else {
                view.object("label.guide").action("show");
            }
            view.object("label.onemore").action("hide");
            view.object("btn.unlock").property({ "selected": "no" });
    
            _request_exit_screen = false;
        })
    } else {
        owner.action("script", { "script": "exit_screen_saver" });

        if (document.value("timer.running")) {
            view.object("label.timer.time").action("show");
        } else {
            view.object("label.guide").action("show");
        }
        view.object("label.onemore").action("hide");
        view.object("btn.unlock").property({ "selected": "no" });

        _request_exit_screen = false;
    }
}

function on_timer_button() {
    if (!document.value("timer.running")) {
        show_timer_popup();
    } else {
        cancel_timer();
    }
}

function show_timer_popup() {
    view.object("section.timer.popup").action("show");
    view.object("section.timer.button").action("hide");
}

function close_timer_popup() {
    view.object("section.timer.button").action("show");
    view.object("section.timer.popup").action("hide");
    view.object("label.timer.popup.time").property({
        "text": "00:00"
    });
}

function set_timer_15minutes() {
    view.object("label.timer.popup.time").property({
        "text": "00:15"
    });
}

function set_timer_30minutes() {
    view.object("label.timer.popup.time").property({
        "text": "00:30"
    });
}

function set_timer_1hour() {
    view.object("label.timer.popup.time").property({
        "text": "01:00"
    });
}

function set_timer_2hours() {
    view.object("label.timer.popup.time").property({
        "text": "02:00"
    });
}

function increase_timer() {
    var times = view.object("label.timer.popup.time").value().split(": ");
    var minutes = parseInt(times[1]) + 5;
    var hours = parseInt(times[0]);

    if (minutes >= 60) {
        minutes = minutes - 60;
        hours = hours + 1;
    }

    view.object("label.timer.popup.time").property({
        "text": ((hours < 10) ? "0" : "") + hours + ": " + ((minutes < 10) ? "0" : "") + minutes
    });
}

function decrease_timer() {
    var times = view.object("label.timer.popup.time").value().split(": ");
    var minutes = parseInt(times[1]) - 5;
    var hours = parseInt(times[0]);

    if (minutes < 0) {
        minutes = (hours > 0) ? 60 + minutes : 0;
        hours = Math.max(hours - 1, 0);
    }

    view.object("label.timer.popup.time").property({
        "text":((hours < 10) ? "0" : "") + hours + ": " + ((minutes < 10) ? "0" : "") + minutes
    });
}

function start_timer() {
    var time = view.object("label.timer.popup.time").value();

    if (time !== "00:00") {
        view.object("timer").property({ "time":time + ":00" });
        view.object("timer").action("restart");
        view.object("label.timer.time").action("show");
        view.object("label.guide").action("hide");
        view.object("btn.timer").property({ "selected": "yes" });
        view.object("section.timer.button").action("show");
        view.object("section.timer.popup").action("hide");
        view.object("label.timer.popup.time").property({
            "text": "00:00"
        });
        document.value("timer.running", true);
        document.value("timer.time", time);
        document.value("timer.started-at", Date.now());
    } else {
        controller.action("toast", {
            "message": controller.catalog().string("시간 설정을 해주세요.")
        });
    }
}

function cancel_timer() {
    view.object("label.timer.time").action("hide");
    view.object("label.guide").action("show");
    view.object("btn.timer").property({ "selected": "no" });
    view.object("timer").property({ "time": "00:00" });
    document.value("timer.running", false);
    document.value("timer.time", "00:00");

    controller.action("toast", {
        "message": controller.catalog().string("타이머가 취소되었습니다.")
    });
}

function on_timer_expired() {
    owner.action("script", {
        "script": "on_timer_expired"
    });

    view.object("label.timer.time").action("hide");
    view.object("label.guide").action("show");
    view.object("btn.timer").property({ "selected": "no" });
    document.value("timer.running", false);

    controller.action("toast", {
        "message": controller.catalog().string("타이머가 완료되었습니다.")
    });
}
