///<reference path="../typings/tsd.d.ts" />

export class NewRelicDSConfigCtrl {
  static templateUrl = 'datasource/partials/config.html';
  current: any;
  apps: any[];

  constructor($scope, $injector, private datasourceSrv) {
    this.datasourceSrv = datasourceSrv;
    this.loadApplications();
  }

  loadApplications() {
    this.datasourceSrv.get(this.current.name).then(datasource => {
      datasource.getApplications().then(apps => {
        apps = apps.map(app => {
          return { name: app.name, id: app.id.toString() };
        });
        this.apps = apps;
      });
    });
  }

}
