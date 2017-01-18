export declare class NewRelicAppConfigCtrl {
    appModel: any;
    appEditCtrl: any;
    backendSrv: any;
    jsonData: any;
    apiValidated: boolean;
    apiError: boolean;
    constructor($scope: any, $injector: any, backendSrv: any);
    preUpdate(): Promise<void>;
    reset(): void;
    validateApiConnection(): any;
    static templateUrl: string;
}
