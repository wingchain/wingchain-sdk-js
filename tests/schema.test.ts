import {decode, encode, hexToU8a} from "../src/codec";
import {callSchemaMap} from "../src/schema";
import {u8aToHex} from "../lib/codec";

test('test balance init params codec', () => {

  const data = {
    endow: [["0x0102030405060708010203040506070801020304", 1000], ["0x0102030405060708010203040506070801020305", 2000]],
  };

  const encoded = encode(data, callSchemaMap.balance.init.params)

  expect(encoded).toStrictEqual(hexToU8a('0x08500102030405060708010203040506070801020304e803000000000000500102030405060708010203040506070801020305d007000000000000'));

  const decoded = decode(encoded, callSchemaMap.balance.init.params)
  expect(decoded).toStrictEqual([data, 59]);

});

test('test balance init result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.balance.init.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.balance.init.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test balance transfer params codec', () => {

  const data = {
    recipient: "0x0102030405060708010203040506070801020304",
    value: 1000,
  };

  const encoded = encode(data, callSchemaMap.balance.transfer.params)

  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304e803000000000000'));

  const decoded = decode(encoded, callSchemaMap.balance.transfer.params)
  expect(decoded).toStrictEqual([data, 29]);

});

test('test balance transfer result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.balance.transfer.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.balance.transfer.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test contract init params codec', () => {

  const data = {
    max_stack_height: {Some: 100},
    initial_memory_pages: {None: null},
    max_memory_pages: {Some: 200},
    max_share_value_len: {None: null},
    max_share_size: {Some: 300},
    max_nest_depth: {Some: 400},
  };

  const encoded = encode(data, callSchemaMap.contract.init.params)

  expect(encoded).toStrictEqual(hexToU8a('0x01640000000001c800000000012c010000000000000190010000'));

  const decoded = decode(encoded, callSchemaMap.contract.init.params)
  expect(decoded).toStrictEqual([data, 26]);

});

test('test contract init result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.contract.init.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.contract.init.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test contract get_version params codec', () => {

  const data = {
    contract_address: '0x0102030405060708010203040506070801020304',
  };

  const encoded = encode(data, callSchemaMap.contract.get_version.params)

  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.contract.get_version.params)
  expect(decoded).toStrictEqual([data, 21]);

});

test('test contract get_version result codec', () => {

  const data = {
    Some: 100,
  };

  const encoded = encode(data, callSchemaMap.contract.get_version.result)

  expect(encoded).toStrictEqual(hexToU8a('0x0164000000'));

  const decoded = decode(encoded, callSchemaMap.contract.get_version.result)
  expect(decoded).toStrictEqual([data, 5]);

});

test('test contract get_admin params codec', () => {

  const data = {
    contract_address: '0x0102030405060708010203040506070801020304',
  };

  const encoded = encode(data, callSchemaMap.contract.get_admin.params)

  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.contract.get_admin.params)
  expect(decoded).toStrictEqual([data, 21]);

});

test('test contract get_admin result codec', () => {

  const data = {
    Some: {
      threshold: 2,
      members: [["0x0102030405060708010203040506070801020304", 2], ["0x0102030405060708010203040506070801020304", 1]],
    },
  };

  const encoded = encode(data, callSchemaMap.contract.get_admin.result)

  expect(encoded).toStrictEqual(hexToU8a('0x0102000000085001020304050607080102030405060708010203040200000050010203040506070801020304050607080102030401000000'));

  const decoded = decode(encoded, callSchemaMap.contract.get_admin.result)
  expect(decoded).toStrictEqual([data, 56]);

});

test('test contract get_code params codec', () => {

  const data = {
    contract_address: '0x0102030405060708010203040506070801020304',
    version: {
      None: null,
    }
  };

  const encoded = encode(data, callSchemaMap.contract.get_code.params)

  expect(encoded).toStrictEqual(hexToU8a('0x50010203040506070801020304050607080102030400'));

  const decoded = decode(encoded, callSchemaMap.contract.get_code.params)
  expect(decoded).toStrictEqual([data, 22]);

});

test('test contract get_code result codec', () => {

  const data = {
    Some: '0x010203',
  };

  const encoded = encode(data, callSchemaMap.contract.get_code.result)

  expect(encoded).toStrictEqual(hexToU8a('0x010c010203'));

  const decoded = decode(encoded, callSchemaMap.contract.get_code.result)
  expect(decoded).toStrictEqual([data, 5]);

});

test('test contract get_code_hash params codec', () => {

  const data = {
    contract_address: '0x0102030405060708010203040506070801020304',
    version: {
      None: null,
    }
  };

  const encoded = encode(data, callSchemaMap.contract.get_code_hash.params)

  expect(encoded).toStrictEqual(hexToU8a('0x50010203040506070801020304050607080102030400'));

  const decoded = decode(encoded, callSchemaMap.contract.get_code_hash.params)
  expect(decoded).toStrictEqual([data, 22]);

});

test('test contract get_code_hash result codec', () => {

  const data = {
    Some: '0x010203',
  };

  const encoded = encode(data, callSchemaMap.contract.get_code_hash.result)

  expect(encoded).toStrictEqual(hexToU8a('0x010c010203'));

  const decoded = decode(encoded, callSchemaMap.contract.get_code_hash.result)
  expect(decoded).toStrictEqual([data, 5]);

});

test('test contract create params codec', () => {

  const data = {
    code: '0x010203',
    init_method: 'foo',
    init_params: '{bar:1}',
    init_pay_value: 100,
  };

  const encoded = encode(data, callSchemaMap.contract.create.params)
  expect(encoded).toStrictEqual(hexToU8a('0x0c0102030c666f6f1c7b6261723a317d6400000000000000'));

  const decoded = decode(encoded, callSchemaMap.contract.create.params)
  expect(decoded).toStrictEqual([data, 24]);

});

test('test contract create result codec', () => {

  const data = '0x0102030405060708010203040506070801020304';

  const encoded = encode(data, callSchemaMap.contract.create.result)

  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.contract.create.result)
  expect(decoded).toStrictEqual([data, 21]);

});

test('test contract update_admin params codec', () => {

  const data = {
    contract_address: "0x0102030405060708010203040506070801020304",
    admin: {
      threshold: 10,
      members: [["0x0102030405060708010203040506070801020304", 2], ["0x0102030405060708010203040506070801020304", 1]],
    },
  };

  const encoded = encode(data, callSchemaMap.contract.update_admin.params)

  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203040a000000085001020304050607080102030405060708010203040200000050010203040506070801020304050607080102030401000000'));

  const decoded = decode(encoded, callSchemaMap.contract.update_admin.params)
  expect(decoded).toStrictEqual([data, 76]);

});

test('test contract update_admin result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.contract.update_admin.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.contract.update_admin.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test contract update_admin_vote params codec', () => {

  const data = {
    contract_address: "0x0102030405060708010203040506070801020304",
    proposal_id: 10,
  };

  const encoded = encode(data, callSchemaMap.contract.update_admin_vote.params)

  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203040a000000'));

  const decoded = decode(encoded, callSchemaMap.contract.update_admin_vote.params)
  expect(decoded).toStrictEqual([data, 25]);

});

test('test contract update_admin_vote result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.contract.update_admin_vote.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.contract.update_admin_vote.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test contract update_code params codec', () => {

  const data = {
    contract_address: "0x0102030405060708010203040506070801020304",
    code: "0x010203",
  };

  const encoded = encode(data, callSchemaMap.contract.update_code.params)

  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203040c010203'));

  const decoded = decode(encoded, callSchemaMap.contract.update_code.params)
  expect(decoded).toStrictEqual([data, 25]);

});

test('test contract update_code result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.contract.update_code.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.contract.update_code.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test contract update_code_vote params codec', () => {

  const data = {
    contract_address: "0x0102030405060708010203040506070801020304",
    proposal_id: 10,
  };

  const encoded = encode(data, callSchemaMap.contract.update_code_vote.params)

  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203040a000000'));

  const decoded = decode(encoded, callSchemaMap.contract.update_code_vote.params)
  expect(decoded).toStrictEqual([data, 25]);

});

test('test contract update_code_vote result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.contract.update_code_vote.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.contract.update_code_vote.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test contract execute params codec', () => {

  const data = {
    contract_address: "0x0102030405060708010203040506070801020304",
    method: 'foo',
    params: '{bar:1}',
    pay_value: 100,
  };

  const encoded = encode(data, callSchemaMap.contract.execute.params)

  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203040c666f6f1c7b6261723a317d6400000000000000'));

  const decoded = decode(encoded, callSchemaMap.contract.execute.params)
  expect(decoded).toStrictEqual([data, 41]);

});

test('test contract execute result codec', () => {

  const data = '{foo:1}';

  const encoded = encode(data, callSchemaMap.contract.execute.result)

  expect(encoded).toStrictEqual(hexToU8a('0x1c7b666f6f3a317d'));

  const decoded = decode(encoded, callSchemaMap.contract.execute.result)
  expect(decoded).toStrictEqual([data, 8]);

});

test('test poa init params codec', () => {

  const data = {
    block_interval: {Some: 10},
    admin: {
      threshold: 1,
      members: [
        ["0x0102030405060708010203040506070801020304", 1],
      ]
    },
    authority: "0x0102030405060708010203040506070801020304"
  };

  const encoded = encode(data, callSchemaMap.poa.init.params)

  expect(encoded).toStrictEqual(hexToU8a('0x010a00000000000000010000000450010203040506070801020304050607080102030401000000500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.poa.init.params)
  expect(decoded).toStrictEqual([data, 60]);

});

test('test poa init result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.poa.init.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.poa.init.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test poa get_meta params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.poa.get_meta.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.poa.get_meta.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test poa get_meta result codec', () => {

  const data = {
    block_interval: {Some: 10},
  };;

  const encoded = encode(data, callSchemaMap.poa.get_meta.result)

  expect(encoded).toStrictEqual(hexToU8a('0x010a00000000000000'));

  const decoded = decode(encoded, callSchemaMap.poa.get_meta.result)
  expect(decoded).toStrictEqual([data, 9]);

});

test('test poa get_admin params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.poa.get_admin.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.poa.get_admin.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test poa get_admin result codec', () => {

  const data = {
    threshold: 1,
    members: [
      ["0x0102030405060708010203040506070801020304", 1],
    ]
  };

  const encoded = encode(data, callSchemaMap.poa.get_admin.result)

  expect(encoded).toStrictEqual(hexToU8a('010000000450010203040506070801020304050607080102030401000000'));

  const decoded = decode(encoded, callSchemaMap.poa.get_admin.result)
  expect(decoded).toStrictEqual([data, 30]);

});

test('test poa get_authority params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.poa.get_authority.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.poa.get_authority.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test poa get_authority result codec', () => {

  const data = '0x0102030405060708010203040506070801020304';

  const encoded = encode(data, callSchemaMap.poa.get_authority.result)

  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.poa.get_authority.result)
  expect(decoded).toStrictEqual([data, 21]);

});

test('test poa update_authority params codec', () => {

  const data = {
    authority: '0x0102030405060708010203040506070801020304',
  };

  const encoded = encode(data, callSchemaMap.poa.update_authority.params)

  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.poa.update_authority.params)
  expect(decoded).toStrictEqual([data, 21]);

});

test('test poa update_authority result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.poa.update_authority.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.poa.update_authority.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test poa update_authority_vote params codec', () => {

  const data = {
    proposal_id: 100,
  };

  const encoded = encode(data, callSchemaMap.poa.update_authority_vote.params)

  expect(encoded).toStrictEqual(hexToU8a('0x64000000'));

  const decoded = decode(encoded, callSchemaMap.poa.update_authority_vote.params)
  expect(decoded).toStrictEqual([data, 4]);

});

test('test poa update_authority_vote result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.poa.update_authority_vote.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.poa.update_authority_vote.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test raft init params codec', () => {

  const data = {
    block_interval: {Some: 10},
    heartbeat_interval: 100,
    election_timeout_min: 500,
    election_timeout_max: 1000,
    admin: {
      threshold: 1,
      members: [
        ["0x0102030405060708010203040506070801020304", 1],
      ]
    },
    authorities: {
      members: [
        "0x0102030405060708010203040506070801020304",
      ],
    }
  };

  const encoded = encode(data, callSchemaMap.raft.init.params)

  expect(encoded).toStrictEqual(hexToU8a('0x010a000000000000006400000000000000f401000000000000e80300000000000001000000045001020304050607080102030405060708010203040100000004500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.raft.init.params)
  expect(decoded).toStrictEqual([data, 85]);

});

test('test raft init result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.raft.init.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.raft.init.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test raft get_meta params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.raft.get_meta.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.raft.get_meta.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test raft get_meta result codec', () => {

  const data = {
    block_interval: {Some: 10},
    heartbeat_interval: 100,
    election_timeout_min: 500,
    election_timeout_max: 1000,
  };;

  const encoded = encode(data, callSchemaMap.raft.get_meta.result)

  expect(encoded).toStrictEqual(hexToU8a('0x010a000000000000006400000000000000f401000000000000e803000000000000'));

  const decoded = decode(encoded, callSchemaMap.raft.get_meta.result)
  expect(decoded).toStrictEqual([data, 33]);

});

test('test raft get_admin params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.raft.get_admin.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.raft.get_admin.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test raft get_admin result codec', () => {

  const data = {
    threshold: 1,
    members: [
      ["0x0102030405060708010203040506070801020304", 1],
    ]
  };

  const encoded = encode(data, callSchemaMap.raft.get_admin.result)

  expect(encoded).toStrictEqual(hexToU8a('010000000450010203040506070801020304050607080102030401000000'));

  const decoded = decode(encoded, callSchemaMap.raft.get_admin.result)
  expect(decoded).toStrictEqual([data, 30]);

});

test('test raft get_authorities params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.raft.get_authorities.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.raft.get_authorities.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test raft get_authorities result codec', () => {

  const data = {
      members: [
        "0x0102030405060708010203040506070801020304",
      ],
  };

  const encoded = encode(data, callSchemaMap.raft.get_authorities.result)

  expect(encoded).toStrictEqual(hexToU8a('0x04500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.raft.get_authorities.result)
  expect(decoded).toStrictEqual([data, 22]);

});

test('test raft update_authorities params codec', () => {

  const data = {
    authorities: {
      members: [
        "0x0102030405060708010203040506070801020304",
      ],
    }
  };

  const encoded = encode(data, callSchemaMap.raft.update_authorities.params)

  expect(encoded).toStrictEqual(hexToU8a('0x04500102030405060708010203040506070801020304'));

  const decoded = decode(encoded, callSchemaMap.raft.update_authorities.params)
  expect(decoded).toStrictEqual([data, 22]);

});

test('test raft update_authorities result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.raft.update_authorities.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.raft.update_authorities.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test raft update_authorities_vote params codec', () => {

  const data = {
    proposal_id: 100,
  };

  const encoded = encode(data, callSchemaMap.raft.update_authorities_vote.params)

  expect(encoded).toStrictEqual(hexToU8a('0x64000000'));

  const decoded = decode(encoded, callSchemaMap.raft.update_authorities_vote.params)
  expect(decoded).toStrictEqual([data, 4]);

});

test('test raft update_authorities_vote result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.raft.update_authorities_vote.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.raft.update_authorities_vote.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test system init params codec', () => {

  const data = {
    chain_id: "chain-abcde",
    timestamp: 12345678,
    max_until_gap: 100,
    max_execution_gap: 8,
  };

  const encoded = encode(data, callSchemaMap.system.init.params)

  expect(encoded).toStrictEqual(hexToU8a('0x2c636861696e2d61626364654e61bc0000000000640000000000000008'));

  const decoded = decode(encoded, callSchemaMap.system.init.params)
  expect(decoded).toStrictEqual([data, 29]);

});

test('test system init result codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.system.init.result)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.system.init.result)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test system get_meta params codec', () => {

  const data = null;

  const encoded = encode(data, callSchemaMap.system.get_meta.params)

  expect(encoded).toStrictEqual(hexToU8a('0x'));

  const decoded = decode(encoded, callSchemaMap.system.get_meta.params)
  expect(decoded).toStrictEqual([data, 0]);

});

test('test system get_meta result codec', () => {

  const data = {
    chain_id: "chain-abcde",
    timestamp: 12345678,
    max_until_gap: 100,
    max_execution_gap: 8,
  };

  const encoded = encode(data, callSchemaMap.system.get_meta.result)

  expect(encoded).toStrictEqual(hexToU8a('0x2c636861696e2d61626364654e61bc0000000000640000000000000008'));

  const decoded = decode(encoded, callSchemaMap.system.get_meta.result)
  expect(decoded).toStrictEqual([data, 29]);

});
