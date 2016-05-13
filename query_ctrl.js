System.register(['app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1;
    var NewRelicQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            NewRelicQueryCtrl = (function (_super) {
                __extends(NewRelicQueryCtrl, _super);
                /** @ngInject **/
                function NewRelicQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.metric_types = [
                        { value: 'applications', label: 'Application' },
                        { value: 'servers', label: 'Server' }
                    ];
                    if (!this.target.type) {
                        this.target.type = this.metric_types[0].value;
                    }
                    ;
                }
                ;
                NewRelicQueryCtrl.templateUrl = 'partials/query.editor.html';
                return NewRelicQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("NewRelicQueryCtrl", NewRelicQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map