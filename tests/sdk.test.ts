import {Sdk} from '../src';
import {IJsonRpcClient, JsonRpcClient} from "../lib/jsonrpc";


test('test rpc chain getHeaderByNumber', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.chain.getHeaderByNumber('confirmed'));
});

test('test rpc network getState', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.network.getState());
});

test('test rpc chain getBlockByNumber', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.chain.getBlockByNumber('0x00'));
});

test('test rpc chain getTransactionByHash', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  const tx = await sdk.chain.getTransactionByHash('0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817');
  expect(tx).toStrictEqual({
      hash:
        '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817',
      witness: null,
      call:
        {
          module: 'system',
          method: 'init',
          params:
            {
              chain_id: 'chain-show-case',
              timestamp: 1609400616040,
              max_until_gap: 100,
              max_execution_gap: 8
            }
        }
    }
  );
});

test('test rpc chain getTransactionByHash', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  const tx = await sdk.chain.getTransactionByHash('0xfdc2c6b426550c7cf95780fd88ee911af59b9b64dc86f29d9c7ece05ab752bb4');
  expect(tx).toStrictEqual({
      hash:
        '0xfdc2c6b426550c7cf95780fd88ee911af59b9b64dc86f29d9c7ece05ab752bb4',
      witness: null,
      call:
        {
          module: 'poa',
          method: 'init',
          params:
            {
              block_interval: {Some: 3000},
              authority: '0x3990497b31e549087fd736d11037993cbd415581'
            }
        }
    }
  );
});

test('test rpc chain getTransactionByHash', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  const tx = await sdk.chain.getTransactionByHash('0x64ffe02ff98d4162fac870aa488e64d1b7a0f2396f95fe49473799ee1f95b266');
  expect(tx).toStrictEqual({
      hash:
        '0x64ffe02ff98d4162fac870aa488e64d1b7a0f2396f95fe49473799ee1f95b266',
      witness: null,
      call: {module: 'balance', method: 'init', params: {endow: []}}
    }
  );
});

test('test rpc chain getTransactionByHash', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  const tx = await sdk.chain.getTransactionByHash('0xa0faf0ea2a0c3bf69ae5c1124199c76336b36a159826e823a9fc1cd2d7b5ff55');
  expect(tx).toStrictEqual({
    hash:
      '0xa0faf0ea2a0c3bf69ae5c1124199c76336b36a159826e823a9fc1cd2d7b5ff55',
    witness: null,
    call:
      {
        module: 'contract',
        method: 'init',
        params:
          {
            max_stack_height: {None: null},
            initial_memory_pages: {None: null},
            max_memory_pages: {None: null},
            max_share_value_len: {None: null},
            max_share_size: {None: null},
            max_nest_depth: {None: null}
          }
      }
  });
});

test('test rpc chain getRawTransactionByHash system init', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.chain.getRawTransactionByHash('0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817'));
});

test('test rpc chain getReceiptByHash', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.chain.getReceiptByHash('0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817', {
    module: 'system',
    method: 'init'
  }));
});

test('test rpc chain getReceiptByHash contract execute', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.chain.getReceiptByHash('0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b818', {
    module: 'contract',
    method: 'execute',
  }));
});

test('test rpc chain getReceiptByHash', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.chain.getReceiptByHash('0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b818'));
});

test('test rpc chain executeCall', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  const params = {
    block_hash: '0x72ac07d1cb007d3f3e54da9464ac749e4d78427b6bb81fe9f7ff75161c9da785',
    call: {
      module: 'system',
      method: 'get_meta',
      params: null,
    }
  };
  console.log(await sdk.chain.executeCall(params));
});

test('test rpc chain buildTransaction', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  const params = {
    witness: [
      '0x0101010101010101010101010101010101010101010101010101010101010101',
      0,
      100
    ],
    call: {
      module: 'balance',
      method: 'transfer',
      params: {
        recipient: '0x0102030405060708010203040506070801020304',
        value: 100,
      },
    }
  };
  console.log(await sdk.chain.buildTransaction(params));
});

test('test rpc txpool getTransaction', async () => {
  const client = new MockJsonRpcClient();
  const sdk = new Sdk(client);
  console.log(await sdk.txpool.getTransaction('0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817'));
});

class MockJsonRpcClient implements IJsonRpcClient {
  async call(id: number, method: string, ...params: any) {
    if (method === 'chain_getHeaderByNumber') {
      return {
        hash:
          '0x4860fc988d97ef1d244524ae7dac025f20dd51c8c8417d1cae98978f25e8777e',
        number: '0x00000000000011c4',
        timestamp: '0x00000176dcfe5c51',
        parent_hash:
          '0x1ca1f7f5f876e9f73447fb69113f2ed43d4ab93ea9a252c510e50722a669e062',
        meta_txs_root:
          '0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314',
        meta_state_root:
          '0x4b872c51e2a80cf6877a13f573bc82a18bd26dccaf6377c66f3cce913f33b139',
        meta_receipts_root:
          '0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314',
        payload_txs_root:
          '0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314',
        payload_execution_gap: '0x01',
        payload_execution_state_root:
          '0xa1dcc51f16984dc2bbb2e42796d34f7bdaddd8b705db8f57aa0638d3b5c59e7a',
        payload_execution_receipts_root:
          '0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314'
      };
    } else if (method === 'network_getState') {
      return {
        peer_id: '12D3KooWRjTTtFNz6DUnr2gME4TLaFbkdaLP9sAenTson9E6DYXt',
        listened_addresses:
          ['/ip6/::1/tcp/3110',
            '/ip4/192.168.0.109/tcp/3110',
            '/ip4/127.0.0.1/tcp/3110'],
        external_addresses: [],
        opened_peers: [],
        unopened_peers: []
      };
    } else if (method === 'chain_getBlockByNumber') {
      return {
        hash:
          '0x72ac07d1cb007d3f3e54da9464ac749e4d78427b6bb81fe9f7ff75161c9da785',
        header:
          {
            number: '0x0000000000000000',
            timestamp: '0x00000176b7c08468',
            parent_hash:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
            meta_txs_root:
              '0xc6245b41ff6697782778f1757d16a0d103342ee01cbeeb38ec722348e9130061',
            meta_state_root:
              '0x4b872c51e2a80cf6877a13f573bc82a18bd26dccaf6377c66f3cce913f33b139',
            meta_receipts_root:
              '0xe6c79028e5a20c619a5faa0dde88df82f378ca796a717570ef329de275ca1282',
            payload_txs_root:
              '0xfb8151ff505ddd02d62062eea7156234f8f1e74091d6cb8ff78a7092b0967d37',
            payload_execution_gap: '0x00',
            payload_execution_state_root:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
            payload_execution_receipts_root:
              '0x0000000000000000000000000000000000000000000000000000000000000000'
          },
        body:
          {
            meta_txs:
              ['0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817',
                '0xfdc2c6b426550c7cf95780fd88ee911af59b9b64dc86f29d9c7ece05ab752bb4'],
            payload_txs:
              ['0x64ffe02ff98d4162fac870aa488e64d1b7a0f2396f95fe49473799ee1f95b266',
                '0xa0faf0ea2a0c3bf69ae5c1124199c76336b36a159826e823a9fc1cd2d7b5ff55']
          }
      };
    } else if (method === 'chain_getTransactionByHash') {
      if (params[0] === '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817') {
        return {
          hash:
            '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817',
          witness: null,
          call:
            {
              module: 'system',
              method: 'init',
              params:
                '0x3c636861696e2d73686f772d636173656884c0b776010000640000000000000008'
            }
        };
      } else if (params[0] === '0xfdc2c6b426550c7cf95780fd88ee911af59b9b64dc86f29d9c7ece05ab752bb4') {
        return {
          hash:
            '0xfdc2c6b426550c7cf95780fd88ee911af59b9b64dc86f29d9c7ece05ab752bb4',
          witness: null,
          call:
            {
              module: 'poa',
              method: 'init',
              params:
                '0x01b80b000000000000503990497b31e549087fd736d11037993cbd415581'
            }
        }
      } else if (params[0] === '0x64ffe02ff98d4162fac870aa488e64d1b7a0f2396f95fe49473799ee1f95b266') {
        return {
          hash:
            '0x64ffe02ff98d4162fac870aa488e64d1b7a0f2396f95fe49473799ee1f95b266',
          witness: null,
          call: {module: 'balance', method: 'init', params: '0x00'}
        };
      } else if (params[0] === '0xa0faf0ea2a0c3bf69ae5c1124199c76336b36a159826e823a9fc1cd2d7b5ff55') {
        return {
          hash:
            '0xa0faf0ea2a0c3bf69ae5c1124199c76336b36a159826e823a9fc1cd2d7b5ff55',
          witness: null,
          call:
            {module: 'contract', method: 'init', params: '0x000000000000'}
        };
      }
    } else if (method === 'chain_getReceiptByHash') {
      if (params[0] === '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817') {
        return {
          hash:
            '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817',
          block_number: '0x0000000000000000',
          events: [],
          result: {Ok: '0x'}
        }
      } else if (params[0] === '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b818') {
        return {
          hash:
            '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817',
          block_number: '0x0000000000000000',
          events: [],
          result: {Ok: '0x106e756c6c'}
        }
      }
    } else if (method === 'chain_getRawTransactionByHash') {
      return '0x001873797374656d10696e6974843c636861696e2d73686f772d636173656884c0b776010000640000000000000008';
    } else if (method === 'txpool_getTransaction') {
      return {
        hash:
          '0x5a4776c1e69ae0d55999d5a18dadfa6a19ee788f5e97dee6735424e81010b817',
        witness: null,
        call:
          {
            module: 'system',
            method: 'init',
            params:
              '0x3c636861696e2d73686f772d636173656884c0b776010000640000000000000008'
          }
      };
    } else if (method === 'chain_executeCall') {
      return '0x3c636861696e2d73686f772d636173656884c0b776010000640000000000000008';
    } else if (method === 'chain_buildTransaction') {
      return '0x01808a88e3dd7409f195fd52db2d3cba5d72ca6709bf1d94121bf3748801b40f6f5c01018e99198e690304aaf5dccf982607ddd5c49816a9a412b6f2d98c8c3a7463db634c5fdf29489c6552467693a13f2aef2e1ab33d80a99b950c6ec24461086aad0e0000000022210000000000001c62616c616e6365207472616e73666572745001020304050607080102030405060708010203046400000000000000';
    }
  }
}
