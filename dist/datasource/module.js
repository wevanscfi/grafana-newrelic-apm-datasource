System.register(['./config_ctrl', './datasource', './query_ctrl'], function(exports_1) {
    var config_ctrl_1, datasource_1, query_ctrl_1;
    var NewRelicQueryOptionsCtrl;
    return {
        setters:[
            function (config_ctrl_1_1) {
                config_ctrl_1 = config_ctrl_1_1;
            },
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            }],
        execute: function() {
            NewRelicQueryOptionsCtrl = (function () {
                function NewRelicQueryOptionsCtrl() {
                }
                NewRelicQueryOptionsCtrl.templateUrl = 'datasource/partials/query.options.html';
                return NewRelicQueryOptionsCtrl;
            })();
            exports_1("Datasource", datasource_1.NewRelicDatasource);
            exports_1("QueryCtrl", query_ctrl_1.NewRelicQueryCtrl);
            exports_1("QueryOptionsCtrl", NewRelicQueryOptionsCtrl);
            exports_1("ConfigCtrl", config_ctrl_1.NewRelicDSConfigCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map