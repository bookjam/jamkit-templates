var _playlist_visible = false, _favorites_visible = false;

function show_playlists() {
    view.object("showcase.home").action("next-page");

    _playlist_visible = true;
}

function hide_playlists() {
    view.object("showcase.home").action("prev-page");

    _playlist_visible = false;
}

function show_favorites() {
    view.object("cell.favorites").action("reload");
    view.object("cell.favorites").action("show");

    _favorites_visible = true;
}

function hide_favorites() {
    view.object("cell.favorites").action("hide");

    _favorites_visible = false;
}

function start_playlist(data) {
    view.object("cell.player").data("display-unit", { "video-id": data["video-id"] });
    view.object("cell.player").action("reload");
    view.object("cell.musics").data("display-unit", { "video-id": data["video-id"] });
    view.object("cell.musics").action("reload");
    view.object("label.playlist.title").property({ "text": data["title"] });
    document.value("playing.video-id", data["video-id"]);

    if (data["action-by-user"] === "yes") {
        hide_playlists();
        hide_favorites();  
    }
}

function next_playlist() {
    view.object("showcase.home").view("cell", "S_HOME_PLAYLISTS").action("script", {
        "script": "next_playlist"
    });
}

function remove_favorite(data) {
    view.object("showcase.home").view("cell", "S_HOME_PLAYLISTS").action("script", {
        "script": "remove_favorite",
        "video-id": data["video-id"]
    });
}

function on_showcase_paging(data) {
    if (parseInt(data["page"]) === 1) {
        _playlist_visible = false;

        return;
    }

    if (parseInt(data["page"]) === 2) {
        _playlist_visible = true;

        return;
    }
}

function on_enter_screen_saver() {
    view.object("showcase.home").property({
        "scroll-enabled": "no"
    });
}

function on_exit_screen_saver() {
    view.object("showcase.home").property({
        "scroll-enabled": "yes"
    });
}

function on_show_comments() {
    view.object("showcase.home").property({
        "scroll-enabled": "no"
    });
}

function on_hide_comments() {
    view.object("showcase.home").property({
        "scroll-enabled": "yes"
    });
}

function on_back() {
    if (_favorites_visible) {
        hide_favorites();

        return;
    }

    if (document.value("saver.running")) {
        controller.action("toast", { 
            "message": controller.catalog().string("먼저 절전 모드를 해제해주세요.")
        });

        return;
    }

    if (document.value("musics.visible")) {
        view.object("cell.musics").action("script", {
            "script": "hide_musics"
        });

        return;
    }

    if (document.value("comments.visible")) {
        view.object("cell.comments").action("script", {
            "script": "hide_comments"
        });

        return;
    }

    if (document.value("subscribe.visible")) {
        view.object("cell.subscribe").action("script", {
            "script": "subscribe_done"
        });

        return;
    }

    if (_playlist_visible) {
        hide_playlists();

        return;
    }

    controller.action("back");
}
