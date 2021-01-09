import {decode, encode, hexToU8a} from "../src/codec";

test('test codec unit', async () => {

  const schema = {type: 'unit'};

  const data = null;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x'));
  console.log(encoded);

  const bytes = hexToU8a("0x");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([null, 0]);
  console.log(decoded);

});

test('test codec u8', async () => {

  const schema = {type: 'u8'};

  const data = 100;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x64'));
  console.log(encoded);

  const bytes = hexToU8a("0x64");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([100, 1]);
  console.log(decoded);

});

test('test codec i8', async () => {

  const schema = {type: 'i8'};

  const data = 100;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x64'));
  console.log(encoded);

  const bytes = hexToU8a("0x64");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([100, 1]);
  console.log(decoded);

});

test('test codec i8', async () => {

  const schema = {type: 'i8'};

  const data = 127;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x7f'));
  console.log(encoded);

  const bytes = hexToU8a("0x7f");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([127, 1]);
  console.log(decoded);

});

test('test codec i8', async () => {

  const schema = {type: 'i8'};

  const data = -100;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x9c'));
  console.log(encoded);

  const bytes = hexToU8a("0x9c");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([-100, 1]);
  console.log(decoded);

});


test('test codec u16', async () => {

  const schema = {type: 'u16'};

  const data = 300;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x2c01'));
  console.log(encoded);

  const bytes = hexToU8a("0x2c01");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([300, 2]);
  console.log(decoded);

});

test('test codec i16', async () => {

  const schema = {type: 'i16'};

  const data = -300;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0xd4fe'));
  console.log(encoded);

  const bytes = hexToU8a("0xd4fe");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([-300, 2]);
  console.log(decoded);

});

test('test codec u32', async () => {

  const schema = {type: 'u32'};

  const data = 80000;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x80380100'));
  console.log(encoded);

  const bytes = hexToU8a("0x80380100");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([80000, 4]);
  console.log(decoded);

});

test('test codec i32', async () => {

  const schema = {type: 'i32'};

  const data = -80000;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x80c7feff'));
  console.log(encoded);

  const bytes = hexToU8a("0x80c7feff");
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([-80000, 4]);
  console.log(decoded);

});

test('test codec u64', async () => {

  const schema = {type: 'u64'};

  const data = 5000000000;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x00f2052a01000000'));
  console.log(encoded);

  const bytes = hexToU8a('0x00f2052a01000000');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([5000000000, 8]);
  console.log(decoded);

});

test('test codec i64', async () => {

  const schema = {type: 'i64'};

  const data = -5000000000;
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x000efad5feffffff'));
  console.log(encoded);

  const bytes = hexToU8a('0x000efad5feffffff');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([-5000000000, 8]);
  console.log(decoded);

});

test('test codec bool', async () => {

  const schema = {type: 'bool'};

  let data = true;
  let encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x01'));
  console.log(encoded);

  let bytes = hexToU8a('0x01');
  let decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([true, 1]);
  console.log(decoded);

  data = false;
  encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x00'));
  console.log(encoded);

  bytes = hexToU8a('0x00');
  decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([false, 1]);
  console.log(decoded);

});

test('test codec cn', () => {
  const schema = {type: 'cn'};

  let data = 100;
  let encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x9101'));
  console.log(encoded);

  let bytes = hexToU8a('0x9101');
  let decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([100, 2]);
  console.log(decoded);

  data = 10000;
  encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x419c'));
  console.log(encoded);

  bytes = hexToU8a('0x419c');
  decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([10000, 2]);
  console.log(decoded);

  data = 1000000;
  encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x02093d00'));
  console.log(encoded);

  bytes = hexToU8a('0x02093d00');
  decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([1000000, 4]);
  console.log(decoded);

});

test('test codec str', () => {
  const schema = {type: 'str'};

  let data = 'abcdefg';
  let encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x1c61626364656667'));
  console.log(encoded);

  let bytes = hexToU8a('0x1c61626364656667');
  let decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual(['abcdefg', 8]);
  console.log(decoded);


});

test('test codec hex', () => {
  const schema = {type: 'hex'};

  let data = '0x0102030405060708010203040506070801020304';
  let encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x500102030405060708010203040506070801020304'));
  console.log(encoded);

  let bytes = hexToU8a('0x500102030405060708010203040506070801020304');
  let decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual(['0x0102030405060708010203040506070801020304', 21]);
  console.log(decoded);


});


test('test codec vec', () => {
  const schema = {type: 'vec', element: {type: 'hex'}};

  const data = ['0x0102030405060708010203040506070801020304', '0x0102030405060708010203040506070801020305'];
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x08500102030405060708010203040506070801020304500102030405060708010203040506070801020305'));
  console.log(encoded);

  const bytes = hexToU8a('0x08500102030405060708010203040506070801020304500102030405060708010203040506070801020305');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([['0x0102030405060708010203040506070801020304', '0x0102030405060708010203040506070801020305'], 43]);
  console.log(decoded);


});

test('test codec struct', () => {
  const schema = {
    type: 'struct', fields: {
      recipient: {
        type: 'hex',
      },
      value: {
        type: 'u64',
      }
    }
  };

  const data = {
    recipient: '0x0102030405060708010203040506070801020304',
    value: 100,
  };
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203046400000000000000'));
  console.log(encoded);

  const bytes = hexToU8a('0x5001020304050607080102030405060708010203046400000000000000');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([{
    recipient: '0x0102030405060708010203040506070801020304',
    value: 100,
  }, 29]);
  console.log(decoded);
});

test('test codec enum option some', () => {
  const schema = {
    type: 'enum', variants: {
      Some: {
        index: 1,
        schema: {type: 'hex'},
      },
      None: {
        index: 0,
        schema: {type: 'unit'},
      }
    }
  };

  const data = {
    Some: '0x0102030405060708010203040506070801020304',
  };
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x01500102030405060708010203040506070801020304'));
  console.log(encoded);

  const bytes = hexToU8a('0x01500102030405060708010203040506070801020304');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([{
    Some: '0x0102030405060708010203040506070801020304',
  }, 22]);
  console.log(decoded);
});

test('test codec enum option none', () => {
  const schema = {
    type: 'enum', variants: {
      Some: {
        index: 1,
        schema: {type: 'hex'},
      },
      None: {
        index: 0,
        schema: {type: 'unit'},
      }
    }
  };

  const data = {
    None: null,
  };
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x00'));
  console.log(encoded);

  const bytes = hexToU8a('0x00');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([{
    None: null,
  }, 1]);
  console.log(decoded);
});

test('test codec tuple', () => {
  const schema = {
    type: 'tuple', elements: [
      {
        type: 'hex',
      },
      {
        type: 'u64',
      }
    ]
  };

  const data = [
    '0x0102030405060708010203040506070801020304',
    100,
  ];
  const encoded = encode(data, schema);
  expect(encoded).toStrictEqual(hexToU8a('0x5001020304050607080102030405060708010203046400000000000000'));
  console.log(encoded);

  const bytes = hexToU8a('0x5001020304050607080102030405060708010203046400000000000000');
  const decoded = decode(bytes, schema);
  expect(decoded).toStrictEqual([[
    '0x0102030405060708010203040506070801020304',
    100,
  ], 29]);
  console.log(decoded);
});
