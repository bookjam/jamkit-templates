function remove() {
    owner.action("script", {
        "script": "remove_favorite",
        "video-id": $data["video-id"]
    });
}
