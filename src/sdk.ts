import { JsonRpcClient, IJsonRpcClient } from './jsonrpc';
import { callSchemaMap } from './schema';
import { decode, encode, hexToU8a, u8aToHex } from './codec';

class Module {
  readonly client: IJsonRpcClient;
  readonly name: string;

  constructor(client: IJsonRpcClient, name: string) {
    this.client = client;
    this.name = name;
  }

  async call(method: string, ...params: any) {
    const id = Date.now();
    const fullMethod = this.name + '_' + method;
    return this.client.call(id, fullMethod, ...params);
  }
}

class Chain extends Module {
  async getHeaderByNumber(...params: any) {
    return this.call('getHeaderByNumber', ...params);
  }

  async getHeaderByHash(...params: any) {
    return this.call('getHeaderByHash', ...params);
  }

  async getBlockByNumber(...params: any) {
    return this.call('getBlockByNumber', ...params);
  }

  async getBlockByHash(...params: any) {
    return this.call('getBlockByHash', ...params);
  }

  async getTransactionByHash(...params: any) {
    const tx = await this.call('getTransactionByHash', ...params);
    const moduleMap = callSchemaMap[tx.call.module as keyof typeof callSchemaMap];
    const schema = moduleMap[tx.call.method as keyof typeof moduleMap];
    const paramsSchema = schema.params;
    tx.call.params = decode(hexToU8a(tx.call.params), paramsSchema)[0];
    return tx;
  }

  async getRawTransactionByHash(...params: any) {
    return this.call('getRawTransactionByHash', ...params);
  }

  async getReceiptByHash(...params: any) {
    return this.call('getReceiptByHash', ...params);
  }

  async sendRawTransaction(...params: any) {
    return this.call('sendRawTransaction', ...params);
  }

  async getTransactionInTxPool(...params: any) {
    const tx = await this.call('getTransactionInTxPool', ...params);
    const moduleMap = callSchemaMap[tx.call.module as keyof typeof callSchemaMap];
    const schema = moduleMap[tx.call.method as keyof typeof moduleMap];
    const paramsSchema = schema.params;
    tx.call.params = decode(hexToU8a(tx.call.params), paramsSchema)[0];
    return tx;
  }

  async executeCall(...params: any) {
    const moduleMap = callSchemaMap[params[0].call.module as keyof typeof callSchemaMap];
    const schema = moduleMap[params[0].call.method as keyof typeof moduleMap];
    const paramsSchema = schema.params;
    const resultSchema = schema.result;
    params[0].call.params = u8aToHex(encode(params[0].call.params, paramsSchema));
    let result = await this.call('executeCall', ...params);
    result = decode(hexToU8a(result), resultSchema)[0];
    return result;
  }

  async buildTransaction(...params: any) {
    const moduleMap = callSchemaMap[params[0].call.module as keyof typeof callSchemaMap];
    const schema = moduleMap[params[0].call.method as keyof typeof moduleMap];
    const paramsSchema = schema.params;
    params[0].call.params = u8aToHex(encode(params[0].call.params, paramsSchema));
    console.log(params[0].call.params);
    const result = await this.call('buildTransaction', ...params);
    return result;
  }
}

class Network extends Module {
  getState(...params: any) {
    return this.call('getState', ...params);
  }
}

export class Sdk {
  readonly chain: Chain;
  readonly network: Network;

  constructor(client: IJsonRpcClient) {
    this.chain = new Chain(client, 'chain');
    this.network = new Network(client, 'network');
  }
}
