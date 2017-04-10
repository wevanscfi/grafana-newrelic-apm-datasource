System.register(['app/plugins/sdk', 'lodash'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1, lodash_1;
    var NewRelicQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
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
                    var target_defaults = {
                        type: 'applications',
                        app_id: null,
                        target: 'Select namespace',
                        value: 'Select metric'
                    };
                    lodash_1.default.defaultsDeep(this.target, target_defaults);
                    this.getMetrics();
                    this.getApplications();
                }
                ;
                NewRelicQueryCtrl.prototype.getMetrics = function () {
                    var _this = this;
                    if (this.metrics) {
                        return Promise.resolve(this.metrics);
                    }
                    else {
                        return this.datasource.getMetricNames(this.target.app_id)
                            .then(function (metrics) {
                            _this.metrics = metrics;
                            return metrics;
                        });
                    }
                };
                NewRelicQueryCtrl.prototype.getMetricNamespaces = function () {
                    return this.getMetrics().then(function (metrics) {
                        return lodash_1.default.map(metrics, function (metric) {
                            return { text: metric.name, value: metric.name };
                        });
                    });
                };
                NewRelicQueryCtrl.prototype.getMetricValues = function () {
                    var name = this.target.target;
                    return this.getMetrics().then(function (metrics) {
                        var ns = lodash_1.default.find(metrics, { name: name });
                        if (ns) {
                            return lodash_1.default.map(ns.values, function (val) {
                                return { text: val, value: val };
                            });
                        }
                        else {
                            return [];
                        }
                    });
                };
                NewRelicQueryCtrl.prototype.getApplications = function () {
                    var _this = this;
                    if (this.apps) {
                        return Promise.resolve(this.apps);
                    }
                    else {
                        return this.datasource.getApplications()
                            .then(function (apps) {
                            apps = lodash_1.default.map(apps, function (app) {
                                return { name: app.name, id: app.id };
                            });
                            apps.push({ name: 'Default', id: null });
                            _this.apps = apps;
                            return apps;
                        });
                    }
                };
                NewRelicQueryCtrl.prototype.reset = function () {
                    this.metrics = null;
                    this.getMetrics();
                    this.refresh();
                };
                NewRelicQueryCtrl.prototype.onChangeInternal = function () {
                    this.refresh();
                };
                NewRelicQueryCtrl.templateUrl = 'datasource/partials/query.editor.html';
                return NewRelicQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("NewRelicQueryCtrl", NewRelicQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map