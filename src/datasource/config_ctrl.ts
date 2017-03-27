///<reference path="../typings/tsd.d.ts" />

export class NewRelicDSConfigCtrl {
  static templateUrl = 'datasource/partials/config.html';
  name: string;
  current: any;
  types: any;
  apps: any[];

  constructor($scope, $injector, private backendSrv) {
    this.backendSrv = backendSrv;
    this.loadApplications();
  }

  getApplications() {
    var promise = this.backendSrv.get('api/plugin-proxy/newrelic-app/v2/applications.json');
    return promise.then(result => {
      if (result && result.applications) {
        return result.applications;
      } else {
        return [];  
      }
    });
  }

  loadApplications() {
    this.getApplications().then(apps => {
      apps = apps.map(app => {
        return { name: app.name, id: app.id.toString() };
      });
      this.apps = apps;
    });
  }

}
