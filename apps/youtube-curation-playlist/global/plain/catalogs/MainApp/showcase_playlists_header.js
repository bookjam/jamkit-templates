function on_data_changed(id, data) {
    if (id === "channel-info") {
        view.object("img.logo").property({ "url": data["logo-url"] });
        view.object("label.channel.title").property({ "text": data["title" ]});
        view.object("label.channel.subscriber").property({ "text": data["subscriber-count"] });
        view.object("btn.subscribe").property({ "selected": data["subscribing"] });
    }
}

function subscribe() {
    owner.action("script", { "script": "subscribe" });
}
