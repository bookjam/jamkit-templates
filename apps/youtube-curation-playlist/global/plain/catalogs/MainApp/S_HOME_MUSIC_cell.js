function show_musics() {
    view.object("cell.musics").action("show");

    owner.action("script", { "script": "on_show_musics" });
    document.value("musics.visible", true);
}

function hide_musics() {
    view.object("cell.musics").action("hide");

    owner.action("script", { "script": "on_hide_musics" });
    document.value("musics.visible", false);
}

function enter_screen_saver() {
    view.object("cell.screen.saver").action("show");
    controller.action("toast", { 
        "message": controller.catalog().string("절전 모드를 실행합니다.")
    });

    owner.action("script", { "script": "on_enter_screen_saver" });
    document.value("saver.running", true);
}

function exit_screen_saver() {
    view.object("cell.screen.saver").action("hide");

    if (document.value("timer.running")) {
        view.object("btn.toolbar.saver").property({ "selected": "yes" });
    } else {
        view.object("btn.toolbar.saver").property({ "selected": "no" });
    }

    owner.action("script", { "script": "on_exit_screen_saver" });
    document.value("saver.running", false);
}

function show_playlists() {
    owner.action("script", {
        "script": "show_playlists"
    });
}

function next_playlist() {
    owner.action("script", {
        "script": "next_playlist"
    });
}

function show_comments() {
    if (document.value("playing.video-id")) {
        view.object("cell.comments").data("display-unit", {
            "video-id": document.value("playing.video-id")
        });
        view.object("cell.comments").action("reload");
        view.object("cell.comments").action("show");

        owner.action("script", { "script": "on_show_comments" });
        document.value("comments.visible", true); 
    } else {
        controller.action("toast", { 
            "message": controller.catalog().string("재생 중인 영상이 없습니다.")
        });
    }
}

function hide_comments() {
    view.object("cell.comments").action("hide");

    owner.action("script", { "script": "on_hide_comments" });
    document.value("comments.visible", false);
}

function seek_video(data) {
    view.object("youtube.player").action("seek", {
        "time": data["seconds"]
    });
}

function shuffle_music() {
    if (document.value("playing.video-id")) {
        view.object("cell.musics").view().action("script", {
            "script": "shuffle_music"
        });
        controller.action("toast", { 
            "message": controller.catalog().string("음악 재생 순서를 변경합니다.")
        });
    } else {
        controller.action("toast", { 
            "message": controller.catalog().string("재생 중인 영상이 없습니다.")
        });
    }
}

function next_music() {
    if (document.value("musics.loaded")) {
        view.object("showcase.musics").action("next");
    } else {
        controller.action("toast", { 
            "message": controller.catalog().string("아직 음악 목록을 불러오지 못했습니다.")
        });
    }
}

function prev_music() {
    if (document.value("musics.loaded")) {
        view.object("showcase.musics").action("prev");
    } else {
        controller.action("toast", { 
            "message": controller.catalog().string("아직 음악 목록을 불러오지 못했습니다.")
        });
    }
}

function repeat_music() {
    view.object("showcase.musics").action("repeat");
    controller.action("toast", { 
        "message": controller.catalog().string("반복 재생이 설정되었습니다.")
    });
}

function repeat_music_done() {
    view.object("showcase.musics").action("repeat-done");
    controller.action("toast", { 
        "message": controller.catalog().string("반복 재생이 해제되었습니다.")
    });
}

function on_timer_expired() {
    view.object("youtube.player").action("pause");
    view.object("btn.toolbar.saver").property({ "selected": "no" });
}
