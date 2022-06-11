var module = (function() {
    return {
        values: function(category, location, length, sortkey, sortorder) {
            return controller.catalog().values("showcase", "contents", category, null, [ location, length ], [ sortkey, sortorder ]);
        },
        
        count: function(category) {
            return controller.catalog().count("showcase", "contents", category || null);
        },
        
        value: function(content_id) {
            return controller.catalog().value("showcase", "contents", "S_CONTENTS_" + content_id);
        },
        
        latest: function() {
            return controller.catalog().values("showcase", "contents", null, null, [ 0, 1 ], [ "rowid", "decending" ])[0];
        },

        random: function() {
            return controller.catalog().values("showcase", "contents", null, null, [ 0, 1 ], [ null, "random" ])[0];
        },
        
        submit: function(content_id, data) {
            controller.catalog().submit("showcase", "contents", "S_CONTENTS_" + content_id, data);
        },
        
        categorize: function(content_id, category) {
            controller.catalog().categorize("showcase", "contents", "S_CONTENTS_" + content_id, [ category ], null);
        },
        
        uncategorize: function(content_id, category) {
            controller.catalog().categorize("showcase", "contents", "S_CONTENTS_" + content_id, null, [ category ]);
        },
        
        contains: function(content_id) {
            return controller.catalog().contains("showcase", "contents", "S_CONTENTS_" + content_id);
        },
    }
})();

__MODULE__ = module;
