function getVideos(nextToken, onResult, onError) {
    if (nextToken) {
        if (__loadNextPage()) {
            setTimeout(function() {
                __getVideos(nextToken, onResult, onError);
            }, 200)    
        } else {
            onResult({ "videos": [] });
        }
    } else {
        __getVideos(0, onResult, onError);        
    }
}

function __getVideos(location, onResult, onError) {
    try {
        var videoItems = document.getElementsByTagName('ytm-compact-video-renderer')
        var videos = []

        if (videoItems.length > location) {
            for (var i = location; i < videoItems.length; i++) {
                try {
                    videos.push({
                        "url": videoItems[i].getElementsByClassName('compact-media-item-image')[0].href,
                        "title": videoItems[i].getElementsByClassName('compact-media-item-headline')[0].textContent,
                        "viewCount": videoItems[i].getElementsByClassName('compact-media-item-stats')[0].textContent,
                        "publishedDate": videoItems[i].getElementsByClassName('compact-media-item-stats')[1].textContent
                    });
                } catch (e) {
                    // eat up
                }
            }
    
            onResult({ "videos": videos });
        } else {
            setTimeout(function() {
                __getVideos(location, onResult, onError);
            }, 200)
        }
    } catch (e) {
        onError();
    }
}

function __loadNextPage() {
    try {
        document.getElementsByTagName('c3-next-continuation')[0]
                .getElementsByTagName('button')[0]
                .click();
    } catch (e) {
        return false;
    }

    return true;
}

function getChannelInfo(onResult, onError) {
    try {
        var subscribeDiv = document.getElementsByClassName('c4-tabbed-header-subscibe')[0];
        var subscribeText = subscribeDiv.getElementsByClassName('button-renderer-text')[0].textContent;
        var keywords = [ "구독중" ];

        onResult({ "channelInfo": {
            "title": document.getElementsByClassName('c4-tabbed-header-title')[0].textContent,
            "logoUrl": document.getElementsByClassName('profile-icon-img')[0].src,
            "subscriberCount": document.getElementsByClassName('c4-tabbed-header-subscriber-count')[0].textContent,
            "loggedIn": (document.getElementsByClassName('pivot-subs').length > 0) ? true : false,
            "subscribing": keywords.includes(subscribeText) ? true : false
        }});
    } catch (e) {
        onError();
    }
}

function subscribe(onResult, onError) {
    __subscribe(onResult, onError);
}

function __subscribe(onResult, onError) {
    try {
        var subscribeDiv = document.getElementsByClassName('c4-tabbed-header-subscibe')[0];
        var subscribeButton = subscribeDiv.getElementsByClassName('c3-material-button-button')[0];

        subscribeButton.click();

        onResult();
    } catch (e) {
        setTimeout(function() {
            __subscribe(onResult, onError);
        }, 200);
    }
}
