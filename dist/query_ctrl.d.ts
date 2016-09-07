/// <reference path="../typings/tsd.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
declare class NewRelicQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    metric_types: any;
    datasource: any;
    type: any;
    /** @ngInject **/
    constructor($scope: any, $injector: any);
}
export { NewRelicQueryCtrl };
