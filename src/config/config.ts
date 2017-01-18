export class NewRelicAppConfigCtrl {
  appModel: any;
  appEditCtrl: any;
  jsonData: any;
  apiValidated: boolean;
  apiError: boolean;

  constructor($scope, $injector, private backendSrv) {
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

  preUpdate() {
    if (this.appModel.secureJsonData.apiKey)  {
      this.appModel.jsonData.tokenSet = true;
    }
    return Promise.resolve();
  }

  reset() {
    this.appModel.jsonData.tokenSet = false;
    this.appModel.secureJsonData = {};
    this.apiValidated = false;
  }

  validateApiConnection() {
    var promise = this.backendSrv.get('/api/plugin-proxy/newrelic-app/v2/applications.json');
    promise.then(() => {
      this.apiValidated = true;
    }, () => {
      this.apiValidated = false;
      this.apiError = true;
    });
    return promise;
  }

  static templateUrl = 'config/config.html';
}
