System.register(['./datasource', 'app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_1, sdk_1;
    var NewRelicConfigCtrl, NewRelicQueryCtrl, NewRelicQueryOptionsCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            NewRelicConfigCtrl = (function () {
                function NewRelicConfigCtrl() {
                }
                NewRelicConfigCtrl.templateUrl = 'partials/config.html';
                return NewRelicConfigCtrl;
            })();
            NewRelicQueryCtrl = (function (_super) {
                __extends(NewRelicQueryCtrl, _super);
                function NewRelicQueryCtrl() {
                    _super.apply(this, arguments);
                }
                NewRelicQueryCtrl.templateUrl = 'partials/query.editor.html';
                return NewRelicQueryCtrl;
            })(sdk_1.QueryCtrl);
            NewRelicQueryOptionsCtrl = (function () {
                function NewRelicQueryOptionsCtrl() {
                }
                NewRelicQueryOptionsCtrl.templateUrl = 'partials/query.options.html';
                return NewRelicQueryOptionsCtrl;
            })();
            exports_1("Datasource", datasource_1.NewRelicDatasource);
            exports_1("QueryCtrl", NewRelicQueryCtrl);
            exports_1("QueryOptionsCtrl", NewRelicQueryOptionsCtrl);
            exports_1("ConfigCtrl", NewRelicConfigCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map