System.register(['moment'], function(exports_1) {
    var moment_1;
    var NewRelicDatasource;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            NewRelicDatasource = (function () {
                /** @ngInject */
                function NewRelicDatasource(instanceSettings, $q, backendSrv, templateSrv) {
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.name = instanceSettings.name;
                    this.appId = instanceSettings.jsonData.app_id;
                    this.baseApiUrl = 'api/plugin-proxy/newrelic-app';
                    this.backendSrv = backendSrv;
                }
                NewRelicDatasource.prototype.query = function (options) {
                    var _this = this;
                    var requests = [];
                    options.targets.forEach(function (target) {
                        var value = target.value || null;
                        var type = target.type || 'applications';
                        /* Todo: clean up defaulting app_id based on datasource config */
                        var app_id = target.app_id || _this.appId;
                        var id = type === 'applications' ? app_id : target.server_id;
                        var offset = typeof target.offset !== "undefined" ? _this._convertToSeconds(target.offset) : 0;
                        var to = moment_1.default(options.range.to.format()).subtract(offset, "seconds");
                        var from = moment_1.default(options.range.from.format()).subtract(offset, "seconds");
                        var request = {
                            refId: target.refId,
                            alias: target.alias,
                            url: '/v2/' + type + '/' + id + '/metrics/data.json',
                            params: {
                                names: [target.target],
                                to: to,
                                from: from,
                                period: _this._convertToSeconds(options.interval || "60s")
                            },
                            offset: offset
                        };
                        if (value) {
                            request.params["values"] = [value];
                        }
                        if (id) {
                            requests.push(request);
                        }
                    });
                    return this.makeMultipleRequests(requests);
                };
                NewRelicDatasource.prototype.testDatasource = function () {
                    var url = '/v2/applications/' + this.appId + '.json';
                    return this.makeApiRequest({ url: url }).then(function () {
                        return { status: "success", message: "Data source is working", title: "Success" };
                    });
                };
                NewRelicDatasource.prototype._convertToSeconds = function (interval) {
                    var seconds = parseInt(interval);
                    var unit = interval.slice(-1).toLowerCase();
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
                        case "w":
                            seconds = seconds * 86400 * 7;
                            break;
                    }
                    return seconds;
                };
                NewRelicDatasource.prototype._parseMetricResults = function (results) {
                    var _this = this;
                    var targetList = [];
                    var metrics = results.response.metric_data.metrics;
                    metrics.forEach(function (metric) {
                        metric.alias = results.alias;
                        targetList = targetList.concat(_this._parsesearchTarget(metric, results.offset));
                    });
                    return targetList;
                };
                NewRelicDatasource.prototype._parsesearchTarget = function (metric, offset) {
                    var _this = this;
                    var targets = Object.keys(metric.timeslices[0].values);
                    var targetData = [];
                    targets.forEach(function (target) {
                        targetData.push({
                            target: _this._parseTargetAlias(metric, target),
                            datapoints: _this._getTargetSeries(target, metric, offset)
                        });
                    });
                    return targetData;
                };
                NewRelicDatasource.prototype._getTargetSeries = function (target, metric, offset) {
                    var series = [];
                    metric.timeslices.forEach(function (slice) {
                        series.push([slice.values[target], moment_1.default(slice.to).add(offset, "seconds").valueOf()]);
                    });
                    return series;
                };
                NewRelicDatasource.prototype._parseTargetAlias = function (metric, value) {
                    if (metric.alias) {
                        return metric.alias.replace(/\$value/g, value);
                    }
                    else {
                        return metric.name + ":" + value;
                    }
                };
                NewRelicDatasource.prototype.makeMultipleRequests = function (requests) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var mergedResults = {
                            data: []
                        };
                        var promises = [];
                        requests.forEach(function (request) {
                            promises.push(_this.makeApiRequest(request));
                        });
                        return Promise.all(promises).then(function (data) {
                            data.forEach(function (result) {
                                mergedResults.data = mergedResults.data.concat(_this._parseMetricResults(result));
                            });
                            resolve(mergedResults);
                        });
                    });
                };
                NewRelicDatasource.prototype.getMetricNames = function (application_id) {
                    if (!application_id) {
                        application_id = this.appId;
                    }
                    var request = {
                        url: '/v2/applications/' + application_id + '/metrics.json'
                    };
                    return this.makeApiRequest(request)
                        .then(function (result) {
                        if (result && result.response && result.response.metrics) {
                            return result.response.metrics;
                        }
                        else {
                            return [];
                        }
                    });
                };
                NewRelicDatasource.prototype.getApplications = function () {
                    var request = {
                        url: '/v2/applications.json'
                    };
                    return this.makeApiRequest(request)
                        .then(function (result) {
                        if (result && result.response && result.response.applications) {
                            return result.response.applications;
                        }
                        else {
                            return [];
                        }
                    });
                };
                NewRelicDatasource.prototype.makeApiRequest = function (request) {
                    var options = {
                        method: "get",
                        url: this.baseApiUrl + request.url,
                        params: request.params,
                        data: request.data,
                    };
                    return this.backendSrv.datasourceRequest(options)
                        .then(function (result) {
                        return { response: result.data, refId: request.refId, alias: request.alias, offset: request.offset };
                    })
                        .catch(function (err) {
                        if (err.status !== 0 || err.status >= 300) {
                            if (err.data && err.data.error) {
                                throw { message: 'New Relic Error Response: ' + err.data.error.title, data: err.data, config: err.config };
                            }
                            else {
                                throw { message: 'New Relic Error: ' + err.message, data: err.data, config: err.config };
                            }
                        }
                    });
                };
                return NewRelicDatasource;
            })();
            exports_1("NewRelicDatasource", NewRelicDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map