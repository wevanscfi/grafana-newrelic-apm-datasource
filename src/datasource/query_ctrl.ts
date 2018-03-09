///<reference path="../typings/tsd.d.ts" />
import {QueryCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

class NewRelicQueryCtrl extends QueryCtrl {
  static templateUrl = 'datasource/partials/query.editor.html';
  refresh: any;
  metric_types: any;
  datasource: any;
  type: any;
  metrics: any[];
  apps: any[];
  components: any[];
  servers: any[];

  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);
    this.metric_types = [
      { value: 'applications', label: 'Application' },
      { value: 'servers', label: 'Server'},
      { value: 'components', label: 'Component'},
    ];

    let target_defaults = {
      type: 'applications',
      app_id: null,
      target: 'Select namespace',
      value: 'Select metric'
    }
    _.defaultsDeep(this.target, target_defaults);

    this.getMetrics();
    this.getApplications();
    this.getComponents();
    this.getServers();
  };

  getMetrics() {
    if (this.metrics) {
      return Promise.resolve(this.metrics);
    } else {
      if (this.type === 'components') {
        return this.datasource.getComponentMetricNames(this.target.component_id)
            .then(metrics => {
              this.metrics = metrics;
              return metrics;
            });
      } else if (this.type === 'servers') {
        return this.datasource.getServerMetricNames(this.target.server_id)
            .then(metrics => {
              this.metrics = metrics;
              return metrics;
            });
      } else {
        return this.datasource.getAppMetricNames(this.target.app_id)
            .then(metrics => {
              this.metrics = metrics;
              return metrics;
            });
      }
    }
  }

  getMetricNamespaces() {
    return this.getMetrics().then(metrics => {
      return _.map(metrics, metric => {
        return { text: metric.name, value: metric.name };
      });
    });
  }

  getMetricValues() {
    let name = this.target.target;
    return this.getMetrics().then(metrics => {
      let ns = _.find(metrics, {name: name});
      if (ns) {
        return _.map(ns.values, val => {
          return { text: val, value: val };
        });
      } else {
        return [];
      }
    });
  }

  getApplications() {
    if (this.apps) {
      return Promise.resolve(this.apps);
    } else {
      return this.datasource.getApplications()
      .then(apps => {
        apps = _.map(apps, app => {
          return { name: app.name, id: app.id };
        });
        apps.push({ name: 'Default', id: null });
        this.apps = apps;

        return apps;
      });
    }
  }
  
  getComponents() {
    if (this.components) {
      return Promise.resolve(this.components);
    } else {
      return this.datasource.getComponents().then(components => {
        components = _.map(components, component => {
          return {name: component.name, id: component.id};
        });
        this.components = components;
        return components;
      });
    }
  }

  getServers() {
    if (this.servers) {
      return Promise.resolve(this.servers);
    } else {
      return this.datasource.getServers().then(servers => {
        servers = _.map(servers, server => {
          return {name: server.name, id: server.id};
        });
        this.servers = servers;
        return servers;
      });
    }
  }

  reset() {
    this.type = this.target.type;
    this.metrics = null;
    this.getMetrics();
    this.refresh();
  }

  onChangeInternal() {
    this.refresh();
  }
}

export {NewRelicQueryCtrl};
