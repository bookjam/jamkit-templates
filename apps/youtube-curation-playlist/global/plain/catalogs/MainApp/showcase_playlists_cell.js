function toggle_favorite() {
    owner.action("script", {
        "script": "toggle_favorite",
        "video-id": $data["video-id"],
        "title": $data["title"]
    });
}

function on_data_changed(id, data) {
    if (id.startsWith("favorite-")) {
        view.object("btn.favorite").property({ "selected": data["favorite"] });
    }
}
