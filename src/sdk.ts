import { IJsonRpcClient } from './jsonrpc';
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

  async getProofByNumber(...params: any) {
    return this.call('getProofByNumber', ...params);
  }

  async getProofByHash(...params: any) {
    return this.call('getProofByHash', ...params);
  }

  async getTransactionByHash(...params: any) {
    const tx = await this.call('getTransactionByHash', ...params);
    if (!(tx && tx.call)) {
      return tx;
    }
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
    const options = params.length > 1 ? params.pop() : {};
    const receipt = await this.call('getReceiptByHash', ...params);
    if (!(receipt && receipt.result)) {
      return receipt;
    }
    if (options.module && options.method) {
      const moduleMap = callSchemaMap[options.module as keyof typeof callSchemaMap];
      const schema = moduleMap[options.method as keyof typeof moduleMap];
      const resultSchema = schema.result;
      if (receipt.result && receipt.result.Ok) {
        receipt.result.Ok = decode(hexToU8a(receipt.result.Ok), resultSchema)[0];
      }
    }
    return receipt;
  }

  async sendRawTransaction(...params: any) {
    return this.call('sendRawTransaction', ...params);
  }

  async executeCall(...params: any) {
    if (!(params.length > 0 && params[0] && params[0].call)) {
      return null;
    }
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
    if (!(params.length > 0 && params[0] && params[0].call)) {
      return null;
    }
    const moduleMap = callSchemaMap[params[0].call.module as keyof typeof callSchemaMap];
    const schema = moduleMap[params[0].call.method as keyof typeof moduleMap];
    const paramsSchema = schema.params;
    params[0].call.params = u8aToHex(encode(params[0].call.params, paramsSchema));
    const result = await this.call('buildTransaction', ...params);
    return result;
  }
}

class TxPool extends Module {
  async getTransaction(...params: any) {
    const tx = await this.call('getTransaction', ...params);
    if (!(tx && tx.call)) {
      return tx;
    }
    const moduleMap = callSchemaMap[tx.call.module as keyof typeof callSchemaMap];
    const schema = moduleMap[tx.call.method as keyof typeof moduleMap];
    const paramsSchema = schema.params;
    tx.call.params = decode(hexToU8a(tx.call.params), paramsSchema)[0];
    return tx;
  }
}

class Network extends Module {
  getState(...params: any) {
    return this.call('getState', ...params);
  }
}

class Consensus extends Module {
  getState(...params: any) {
    return this.call('getState', ...params);
  }
}

export class Sdk {
  readonly chain: Chain;
  readonly txpool: TxPool;
  readonly network: Network;
  readonly consensus: Consensus;

  constructor(client: IJsonRpcClient) {
    this.chain = new Chain(client, 'chain');
    this.txpool = new TxPool(client, 'txpool');
    this.network = new Network(client, 'network');
    this.consensus = new Network(client, 'consensus');
  }
}
