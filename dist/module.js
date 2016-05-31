System.register(['./datasource', './query_ctrl'], function(exports_1) {
    var datasource_1, query_ctrl_1;
    var NewRelicConfigCtrl, NewRelicQueryOptionsCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            }],
        execute: function() {
            NewRelicConfigCtrl = (function () {
                function NewRelicConfigCtrl() {
                }
                NewRelicConfigCtrl.templateUrl = 'partials/config.html';
                return NewRelicConfigCtrl;
            })();
            NewRelicQueryOptionsCtrl = (function () {
                function NewRelicQueryOptionsCtrl() {
                }
                NewRelicQueryOptionsCtrl.templateUrl = 'partials/query.options.html';
                return NewRelicQueryOptionsCtrl;
            })();
            exports_1("Datasource", datasource_1.NewRelicDatasource);
            exports_1("QueryCtrl", query_ctrl_1.NewRelicQueryCtrl);
            exports_1("QueryOptionsCtrl", NewRelicQueryOptionsCtrl);
            exports_1("ConfigCtrl", NewRelicConfigCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map