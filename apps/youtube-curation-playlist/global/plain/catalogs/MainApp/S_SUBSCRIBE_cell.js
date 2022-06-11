const webjs = require("webjs-helper").initialize("web.subscribe", "__$_bridge");

var _first_loaded = true;

function on_loaded() {
    if ($data["channel"]) {
        view.object("web.subscribe").property({ 
            "url": "https://www.youtube.com/channel/" + $data["channel"]
        });
    }
}

function on_web_loaded(data) {
    if (_first_loaded && data["url"].startsWith("https://m.youtube.com/channel/")) {
        webjs.import("youtube_channel.js");
        webjs.call("subscribe")
            .then(function() {
                view.object("web.subscribe").action("show");
            });

        _first_loaded = false;

        return;
    }
}

function back() {
    owner.action("script", {
        "script": "subscribe_done"
    });
}
