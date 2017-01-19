/// <reference path="../typings/tsd.d.ts" />
export declare class NewRelicDSConfigCtrl {
    private datasourceSrv;
    static templateUrl: string;
    current: any;
    apps: any[];
    constructor($scope: any, $injector: any, datasourceSrv: any);
    loadApplications(): void;
}
