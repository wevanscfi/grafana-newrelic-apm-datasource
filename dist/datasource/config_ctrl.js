///<reference path="../typings/tsd.d.ts" />
System.register([], function(exports_1) {
    var NewRelicDSConfigCtrl;
    return {
        setters:[],
        execute: function() {
            NewRelicDSConfigCtrl = (function () {
                function NewRelicDSConfigCtrl($scope, $injector, datasourceSrv) {
                    this.datasourceSrv = datasourceSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.loadApplications();
                }
                NewRelicDSConfigCtrl.prototype.loadApplications = function () {
                    var _this = this;
                    this.datasourceSrv.get(this.current.name).then(function (datasource) {
                        datasource.getApplications().then(function (apps) {
                            apps = apps.map(function (app) {
                                return { name: app.name, id: app.id.toString() };
                            });
                            _this.apps = apps;
                        });
                    });
                };
                NewRelicDSConfigCtrl.templateUrl = 'datasource/partials/config.html';
                return NewRelicDSConfigCtrl;
            })();
            exports_1("NewRelicDSConfigCtrl", NewRelicDSConfigCtrl);
        }
    }
});
//# sourceMappingURL=config_ctrl.js.map