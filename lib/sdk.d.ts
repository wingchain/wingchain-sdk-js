import { IJsonRpcClient } from './jsonrpc';
declare class Module {
    readonly client: IJsonRpcClient;
    readonly name: string;
    constructor(client: IJsonRpcClient, name: string);
    call(method: string, ...params: any): Promise<any>;
}
declare class Chain extends Module {
    getHeaderByNumber(...params: any): Promise<any>;
    getHeaderByHash(...params: any): Promise<any>;
    getBlockByNumber(...params: any): Promise<any>;
    getBlockByHash(...params: any): Promise<any>;
    getProofByNumber(...params: any): Promise<any>;
    getProofByHash(...params: any): Promise<any>;
    getTransactionByHash(...params: any): Promise<any>;
    getRawTransactionByHash(...params: any): Promise<any>;
    getReceiptByHash(...params: any): Promise<any>;
    sendRawTransaction(...params: any): Promise<any>;
    executeCall(...params: any): Promise<any>;
    buildTransaction(...params: any): Promise<any>;
}
declare class TxPool extends Module {
    getTransaction(...params: any): Promise<any>;
}
declare class Network extends Module {
    getState(...params: any): Promise<any>;
}
declare class Consensus extends Module {
    getState(...params: any): Promise<any>;
}
export declare class Sdk {
    readonly chain: Chain;
    readonly txpool: TxPool;
    readonly network: Network;
    readonly consensus: Consensus;
    constructor(client: IJsonRpcClient);
}
export {};
