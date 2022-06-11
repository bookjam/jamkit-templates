const webjs = require("webjs-helper").initialize("web.comments", "__$_bridge");

var _web_normal_frame = {}, _web_comments_frame = {};

function on_loaded() {
    if ($data["video-id"]) {
        view.object("web.comments").geometry("frame", function(frame) {
            view.object("web.comments").property({ 
                "url": "https://m.youtube.com/watch?v=" + $data["video-id"] 
            });

            _web_normal_frame = frame;
        });
    }
}

function on_web_loaded(data) {
    if (data["url"].startsWith("https://m.youtube.com/watch?")) {
        webjs.import("youtube_video.js");
        webjs.call("pauseVideo");
        webjs.call("showComments")
            .then(function({ position, screenHeight }) {
                position = position * (_web_normal_frame.height / screenHeight);
                _web_comments_frame = {
                    "x": _web_normal_frame.x,
                    "y": _web_normal_frame.y - position,
                    "width": _web_normal_frame.width,
                    "height": _web_normal_frame.height + position
                }

                view.object("web.comments").layout(_web_comments_frame);

                view.object("effect.loading").action("hide");
                view.object("web.comments").action("show");
            });
        
        return;
    }
}

function on_web_start(data) {
    if (data["url"].startsWith("https://accounts.google.com")) {
        timeout(0.5, function() {
            view.object("web.comments").layout(_web_normal_frame);
        });

        return;
    }
}

function on_web_prevent(data) {
    if (data["url"].startsWith("https://www.youtube.com/redirect?")) {
        controller.action("link", {
            "url": decodeURIComponent(data["url"].match(/q=(.+)/)[1])
        });

        return;
    }
} 

function on_request_url(data) {
    console.log(data["url"])
    if (data["url"].startsWith("https://m.youtube.com/watch?")) {
        var seconds = data["url"].match(/t=([0-9]+)s/)[1];
        
        if (seconds) {
            owner.action("script", {
                "script": "seek_video",
                "seconds": seconds
            });
        } else {
            controller.action("link", { "url": data["url"] });
        }
    } else {
        controller.action("link", { "url": data["url"] });
    }
}

function back() {
    owner.action("script", {
        "script": "hide_comments"
    });
}
