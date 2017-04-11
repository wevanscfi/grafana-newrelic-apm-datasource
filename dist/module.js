System.register(['./config/config'], function(exports_1) {
    var config_1;
    return {
        setters:[
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            exports_1("ConfigCtrl", config_1.NewRelicAppConfigCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map