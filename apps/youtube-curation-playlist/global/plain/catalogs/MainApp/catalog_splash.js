function on_loaded() {
    timeout(2, function() {
        controller.action("subview", {
            "subview": "V_HOME"
        });
    });
}
