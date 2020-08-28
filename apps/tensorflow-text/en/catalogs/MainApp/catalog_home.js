const tensorflow = require("tensorflow");

function on_loaded() {
    exist().then(function(path) {
        tensorflow.open(path).then(function() {
            
        });
    });
}
