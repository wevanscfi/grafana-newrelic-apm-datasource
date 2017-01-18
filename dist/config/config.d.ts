export declare class NewRelicAppConfigCtrl {
    private backendSrv;
    appModel: any;
    appEditCtrl: any;
    jsonData: any;
    apiValidated: boolean;
    apiError: boolean;
    constructor($scope: any, $injector: any, backendSrv: any);
    preUpdate(): Promise<void>;
    reset(): void;
    validateApiConnection(): any;
    static templateUrl: string;
}
