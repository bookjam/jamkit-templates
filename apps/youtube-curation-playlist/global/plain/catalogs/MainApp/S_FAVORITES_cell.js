function on_select_favorite(data) {
    owner.action("script", {
        "script": "start_playlist",
        "video-id": data["video-id"],
        "title": data["title"],
        "action-by-user": "yes"
    });
}

function remove_favorite(data) {
    view.object("showcase.favorites").action("remove", { "display-unit": "S_FAVORITES_" + data["video-id"] });
    owner.action("script", {
        "script": "remove_favorite",
        "video-id": data["video-id"]
    });
}

function back() {
    owner.action("script", {
        "script": "hide_favorites"
    });
}
