export interface IJsonRpcClient {
    call(id: number, method: string, ...params: any): any;
}
export declare class JsonRpcClient implements IJsonRpcClient {
    private readonly url;
    constructor(url: string);
    call(id: number, method: string, ...params: any): Promise<any>;
}
