const webjs = require("webjs-helper").initialize("web.musics", "__$_bridge"),
      feed  = require("webjs-feed");

var _musics = [];
var _needs_shuffling = false;

function on_loaded() {
    if ($data["video-id"]) {
        view.object("web.musics").property({ 
            "url": "https://m.youtube.com/watch?v=" + $data["video-id"] 
        });
    }

    document.value("musics.loaded", false);
}

function on_web_loaded(data) {
    if (data["url"].startsWith("https://m.youtube.com/watch?")) {
        feed.on_web_loaded();
        
        return;
    }
}

function feed_musics(keyword, location, length, sortkey, sortorder, handler) {
    if (_musics.length == 0) {
        feed.feed("musics", function(next_token) {
            webjs.import("youtube_video.js");
            webjs.call("getChapters")
                .then(function(result) {
                    var duration = owner.view("owner").object("youtube.player").value("duration");
                    var chapters = result["chapters"];
                    var ignorePattern = /(광고|플레이 *리스트|PLAY *LIST|𝐏𝐋𝐀𝐘 *𝐋𝐈𝐒𝐓|TIME *LINE)/;
                    var musics = [];

                    if (chapters.length > 0 && chapters[chapters.length - 1]["title"].match(ignorePattern)) {
                        chapters.splice(-1, 1);
                    }

                    if (chapters.length > 0 && chapters[0]["title"].match(ignorePattern)) {
                        chapters.splice(0, 1);
                    }

                    chapters.push({ "time": duration });
    
                    for (var i = 0; i < chapters.length - 1; ++i) {
                        musics.push({
                            "video-id": $data["video-id"],
                            "title": chapters[i]["title"],
                            "begin-time": chapters[i]["time"],
                            "end-time": chapters[i + 1]["time"]
                        });
                    }
    
                    if (_needs_shuffling) {
                        musics.sort(function() {
                            return (Math.random() > 0.5) ? 1 : -1;
                        });
                    }    

                    handler(musics);

                    view.object("showcase.musics").action("sync", {
                        "player": "youtube.player",
                        "skips-playing": _needs_shuffling ? "no" : "yes"
                    });

                    if (musics.length > 0) {
                        document.value("musics.loaded", true);
                    }

                    _musics = musics;
                    _needs_shuffling = false;
                })
                .catch(function(error) {
                    console.log(JSON.stringify(error));
                });
        });
    } else {
        handler(_musics);

        view.object("showcase.musics").action("sync", {
            "player": "youtube.player"
        });
    }
}

function select_music(data) {
    view.object("showcase.musics").action("sync", {
        "player": "youtube.player",
        "display-unit": data["id"]
    });
    owner.action("script", {
        "script": "hide_musics"
    });
}

function shuffle_music() {
    if (_musics.length > 0) {
        _musics.sort(function() {
            return (Math.random() > 0.5) ? 1 : -1;
        });
    
        view.object("showcase.musics").action("reload");
    } else {
        _needs_shuffling = true;
    }
}

function close() {
    owner.action("script", {
        "script": "hide_musics"
    });
}
