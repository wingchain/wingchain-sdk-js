import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface IJsonRpcClient {
  call(id: number, method: string, ...params: any): any;
}

export class JsonRpcClient implements IJsonRpcClient {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async call(id: number, method: string, ...params: any) {
    const body = {
      jsonrpc: '2.0',
      id,
      method,
      params: [],
    };
    if (params.length > 0) {
      if (typeof params[0] === 'object') {
        params = params[0];
      }
      body.params = params;
    }
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    };
    return axios(request)
      .then((response) => {
        if (response.data && response.data.error) {
          let msg = 'JSON-RPC call error in ' + method + ': ';
          msg += response.data.error.message + '(' + response.data.error.code + ')';
          if (response.data.error.data) {
            msg += ': ' + JSON.stringify(response.data.error.data);
          }
          throw new Error(msg);
        }
        return response.data.result;
      })
      .catch((err) => {
        let msg = 'JSON-RPC call error in ' + method + ': ';
        if (err.response && err.response.data.error) {
          msg += err.response.data.error.message + '(' + err.response.data.error.code + ')';
          if (err.response.data.error.data) {
            msg += ': ' + JSON.stringify(err.response.data.error.data);
          }
        } else if (err.message) {
          msg += err.message;
        } else {
          msg += 'Unknown error';
        }
        throw new Error(msg);
      });
  }
}
