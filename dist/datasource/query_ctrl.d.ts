/// <reference path="../typings/tsd.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
declare class NewRelicQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    refresh: any;
    metric_types: any;
    datasource: any;
    type: any;
    metrics: any[];
    /** @ngInject **/
    constructor($scope: any, $injector: any);
    getMetrics(): any;
    getMetricNamespaces(): any;
    getMetricValues(): any;
    onChangeInternal(): void;
}
export { NewRelicQueryCtrl };
