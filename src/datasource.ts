///<reference path="../typings/tsd.d.ts" />
import moment from 'moment';

class NewRelicDatasource {
  name: string;
  appId: any;
  apiKey: any;
  apiUrl: string;

  /** @ngInject */
  constructor(instanceSettings, private $q, private backendSrv, private templateSrv) {
    this.name = instanceSettings.name;
    this.appId = instanceSettings.jsonData.app_id;
    this.apiKey = instanceSettings.jsonData.api_key;
    this.apiUrl = "https://api.newrelic.com";
    this.backendSrv = backendSrv;
  }

  query(options) {
    var self = this;
    var requests = [];

    options.targets.forEach(function(target){
      var value = target.value || null;
      var type = target.type || 'applications';
      var id = type === 'applications' ? self.appId : target.server_id;
      var request = {
        refId: target.refId,
        alias: target.alias,
        url: self.apiUrl + '/v2/' + type + '/' + id + '/metrics/data.json',
        params: {
          names: [target.target],
          to: options.range.to,
          from: options.range.from,
          period: self._convertToSeconds(options.interval || "60s")
        }
      };
      if (value) {
        request.params["values"] = [value];
      }
      if (id) {
        requests.push(request);
      }
    });
    return this.makeMultipleRequests(requests);
  }

  testDatasource() {
    var url = this.apiUrl + '/v2/applications/' +  this.appId + '.json';

    return this.makeRequest({url: url}).then(() => {
      return { status: "success", message: "Data source is working", title: "Success" };
    });
  }

  _convertToSeconds(interval) {
    var seconds: number = parseInt(interval);
    var unit: string = interval.slice(-1).toLowerCase();
    switch (unit) {
      case "s":
        break;
      case "m":
        seconds = seconds * 60;
        break;
      case "h":
        seconds = seconds * 3600;
        break;
      case "d":
        seconds = seconds * 86400;
        break;
    }
    return seconds;
  }

  _parseMetricResults(results) {
    var self = this;
    var targetList = [];
    var metrics = results.response.metric_data.metrics;
    metrics.forEach(function(metric){
      metric.alias = results.alias;
      targetList = targetList.concat(self._parseseacrhTarget(metric));
    });
    return targetList;
  }

  _parseseacrhTarget(metric) {
    var self = this;
    var targets = Object.keys(metric.timeslices[0].values);
    var targetData = [];
    targets.forEach(function(target){
      targetData.push({
        target: self._parseTargetAlias(metric, target),
        datapoints: self._getTargetSeries(target, metric)
      });
    });
    return targetData;
  }

  _getTargetSeries(target, metric) {
    var series = [];
    metric.timeslices.forEach(function(slice){
      series.push([slice.values[target], moment(slice.to).valueOf()]);
    });
    return series;
  }

  _parseTargetAlias(metric, value) {
    if (metric.alias) {
      return metric.alias.replace(/\$value/g, value);
    } else {
      return metric.name + ":" + value;
    }
  }

  makeMultipleRequests(requests) {
    var self = this;
    return this.$q(function(resolve, reject) {
      var mergedResults = {
        data: []
      };
      var promises = [];
      requests.forEach(function(request){
        promises.push(self.makeRequest(request));
      });
      self.$q.all(promises).then((data) => {
        data.forEach(function(result){
          mergedResults.data = mergedResults.data.concat(self._parseMetricResults(result));
        });
        resolve(mergedResults);
      });
    });
  }

  makeRequest(request) {
    var options: any = {
      method: "get",
      url: request.url,
      params: request.params,
      data:   request.data,
    };

    options.headers = options.headers || {};
    options.headers["X-Api-Key"] = this.apiKey;

    return this.backendSrv.datasourceRequest(options).then(result => {
      return {response: result.data, refId: request.refId, alias: request.alias };
    }, function(err) {
      if (err.status !== 0 || err.status >= 300) {
        if (err.data && err.data.error) {
          throw { message: 'New Relic Error Response: ' + err.data.error, data: err.data, config: err.config };
        } else {
          throw { message: 'New Relic Error: ' + err.message, data: err.data, config: err.config };
        }
      }
    });
  }

}

export {NewRelicDatasource};
