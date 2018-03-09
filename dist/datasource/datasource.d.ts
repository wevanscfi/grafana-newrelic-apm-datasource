/// <reference path="../typings/tsd.d.ts" />
declare class NewRelicDatasource {
    private $q;
    private backendSrv;
    private templateSrv;
    name: string;
    appId: any;
    baseApiUrl: string;
    /** @ngInject */
    constructor(instanceSettings: any, $q: any, backendSrv: any, templateSrv: any);
    query(options: any): Promise<{}>;
    testDatasource(): any;
    _convertToSeconds(interval: any): number;
    _parseMetricResults(results: any): any[];
    _parsesearchTarget(metric: any, offset: any): any[];
    _getTargetSeries(target: any, metric: any, offset: any): any[];
    _parseTargetAlias(metric: any, value: any): any;
    makeMultipleRequests(requests: any): Promise<{}>;
    getMetricNames(type: any, id: any): any;
    getAppMetricNames(application_id: any): any;
    getServerMetricNames(server_id: any): any;
    getComponentMetricNames(component_id: any): any;
    getApplications(): any;
    getComponents(): any;
    getServers(): any;
    makeApiRequest(request: any): any;
}
export { NewRelicDatasource };
