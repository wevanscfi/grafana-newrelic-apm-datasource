System.register([], function(exports_1) {
    var NewRelicAppConfigCtrl;
    return {
        setters:[],
        execute: function() {
            NewRelicAppConfigCtrl = (function () {
                function NewRelicAppConfigCtrl($scope, $injector, backendSrv) {
                    this.backendSrv = backendSrv;
                    this.backendSrv = backendSrv;
                    console.log(this);
                    this.appEditCtrl.setPreUpdateHook(this.preUpdate.bind(this));
                    if (!this.appModel.jsonData) {
                        this.appModel.jsonData = {};
                    }
                    if (!this.appModel.secureJsonData) {
                        this.appModel.secureJsonData = {};
                    }
                    if (this.appModel.enabled && this.appModel.jsonData.tokenSet) {
                        this.validateApiConnection();
                    }
                }
                NewRelicAppConfigCtrl.prototype.preUpdate = function () {
                    if (this.appModel.secureJsonData.apiKey) {
                        this.appModel.jsonData.tokenSet = true;
                    }
                    return Promise.resolve();
                };
                NewRelicAppConfigCtrl.prototype.reset = function () {
                    this.appModel.jsonData.tokenSet = false;
                    this.appModel.secureJsonData = {};
                    this.apiValidated = false;
                };
                NewRelicAppConfigCtrl.prototype.validateApiConnection = function () {
                    var _this = this;
                    var promise = this.backendSrv.get('/api/plugin-proxy/newrelic-app/v2/applications.json');
                    promise.then(function () {
                        _this.apiValidated = true;
                    }, function () {
                        _this.apiValidated = false;
                        _this.apiError = true;
                    });
                    return promise;
                };
                NewRelicAppConfigCtrl.templateUrl = 'config/config.html';
                return NewRelicAppConfigCtrl;
            })();
            exports_1("NewRelicAppConfigCtrl", NewRelicAppConfigCtrl);
        }
    }
});
//# sourceMappingURL=config.js.map