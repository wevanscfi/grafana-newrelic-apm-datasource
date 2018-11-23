/// <reference path="../typings/tsd.d.ts" />
export declare class NewRelicDSConfigCtrl {
    private backendSrv;
    static templateUrl: string;
    name: string;
    current: any;
    types: any;
    apps: any[];
    constructor($scope: any, $injector: any, backendSrv: any);
    getApplications(page?: number): any;
    loadApplications(): void;
}
