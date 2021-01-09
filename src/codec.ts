function hexToU8a(v: string): Uint8Array {
  v = v.replace('0x', '');
  return Uint8Array.from(Buffer.from(v, 'hex'));
}

function u8aToHex(v: Uint8Array): string {
  return '0x' + Buffer.from(v).toString('hex');
}

function strToU8a(str: string): Uint8Array {
  const utf8 = unescape(encodeURIComponent(str));
  const arr = [];
  for (let i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }
  return new Uint8Array(arr);
}

function u8aToStr(arr: Uint8Array): string {
  let str = String.fromCharCode.apply(null, Array.from(arr));
  str = decodeURIComponent(escape(str));
  return str;
}

function leToNumber(le: Uint8Array, signed: boolean): number {
  const negative = signed && le[le.length - 1] >= 128;
  let r = 0;
  let a = 1;
  le.forEach((x) => {
    if (negative) {
      x = 255 - x;
    }
    r += x * a;
    a *= 256;
  });
  if (negative) {
    r = -r - 1;
  }
  return r;
}

function numberToLE(val: number, bytes: number): Uint8Array {
  let flip = false;
  if (val < 0) {
    val = -val - 1;
    flip = true;
  }

  const r = new Uint8Array(bytes);
  for (let o = 0; o < bytes; ++o) {
    r[o] = val % 256;
    if (flip) {
      r[o] = ~r[o] & 0xff;
    }
    val /= 256;
  }
  return r;
}

function cnToU8a(value: number): Uint8Array {
  if (value < 1 << 6) {
    return new Uint8Array([value << 2]);
  } else if (value < 1 << 14) {
    return numberToLE((value << 2) + 1, 2);
  } else if (value < 1 << 30) {
    return numberToLE((value << 2) + 2, 4);
  } else {
    let bytes = 0;
    for (let v = value; v > 0; v = Math.floor(v / 256)) {
      ++bytes;
    }
    // @ts-ignore
    return new Uint8Array([3 + ((bytes - 4) << 2), ...numberToLE(value, bytes)]);
  }
}

function u8aToCN(buff: Uint8Array): [number, number] {
  let res;
  let len;
  if (buff[0] % 4 === 0) {
    // one byte
    res = buff[0] >> 2;
    len = 1;
  } else if (buff[0] % 4 === 1) {
    res = leToNumber(buff.slice(0, 2), false) >> 2;
    len = 2;
  } else if (buff[0] % 4 === 2) {
    res = leToNumber(buff.slice(0, 4), false) >> 2;
    len = 4;
  } else {
    const n = (buff[0] >> 2) + 4;
    res = leToNumber(buff.slice(1, n + 1), false);
    len = 1 + n;
  }
  return [res, len];
}

/*
unit ( empty tuple )
Example: const scheme = {type: 'unit'}
*/

// tslint:disable-next-line:no-empty
function unitEncodeTo(data: any, schema: object, output: number[]) {}

function unitDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  return [null, 0];
}

/*
u8
Example: const scheme = {type: 'u8'}
*/
function u8EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 1)));
}

function u8DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 1);
  const result = leToNumber(use, false);
  return [result, 1];
}

/*
i8
Example: const scheme = {type: 'i8'}
*/
function i8EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 1)));
}

function i8DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 1);
  const result = leToNumber(use, true);
  return [result, 1];
}

/*
u16
Example: const scheme = {type: 'u16'}
*/
function u16EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 2)));
}

function u16DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 2);
  const result = leToNumber(use, false);
  return [result, 2];
}

/*
i16
Example: const scheme = {type: 'i16'}
*/
function i16EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 2)));
}

function i16DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 2);
  const result = leToNumber(use, true);
  return [result, 2];
}

/*
u32
Example: const scheme = {type: 'u32'}
*/
function u32EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 4)));
}

function u32DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 4);
  const result = leToNumber(use, false);
  return [result, 4];
}

/*
i32
Example: const scheme = {type: 'i32'}
*/
function i32EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 4)));
}

function i32DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 4);
  const result = leToNumber(use, true);
  return [result, 4];
}

/*
u64
Example: const scheme = {type: 'u64'}
*/
function u64EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 8)));
}

function u64DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 8);
  const result = leToNumber(use, false);
  return [result, 8];
}

/*
i64
Example: const scheme = {type: 'i64'}
*/
function i64EncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(numberToLE(data, 8)));
}

function i64DecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 8);
  const result = leToNumber(use, true);
  return [result, 8];
}

/*
bool
Example: const scheme = {type: 'bool'}
*/
function boolEncodeTo(data: any, schema: object, output: number[]) {
  output.push(...[data === true ? 1 : 0]);
}

function boolDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 1);
  const result = use[0] === 1;
  return [result, 1];
}

/*
cn (compact number)
Example: const scheme = {type: 'cn'}
*/
function cnEncodeTo(data: any, schema: object, output: number[]) {
  output.push(...Array.from(cnToU8a(data)));
}

function cnDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const use = data.slice(offset, offset + 16); // max u128
  const decoded = u8aToCN(use);
  return decoded;
}

/*
str
Example: const scheme = {type: 'str'}
*/
function strEncodeTo(data: any, schema: object, output: number[]) {
  const arr = strToU8a(data);
  cnEncodeTo(arr.length, { type: 'cn' }, output);
  output.push(...Array.from(arr));
}

function strDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  let fullLen = 0;
  const decoded = cnDecodeFrom(data, { type: 'cn' }, offset);
  const len = decoded[0];
  const next = data.slice(offset + decoded[1], offset + decoded[1] + len);
  fullLen += decoded[1] + len;
  const result = u8aToStr(next);
  return [result, fullLen];
}

/*
hex
Example: const scheme = {type: 'hex'}
*/
function hexEncodeTo(data: any, schema: object, output: number[]) {
  const arr = hexToU8a(data);
  cnEncodeTo(arr.length, { type: 'cn' }, output);
  output.push(...Array.from(arr));
}

function hexDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  let fullLen = 0;
  const decoded = cnDecodeFrom(data, { type: 'cn' }, offset);
  const len = decoded[0];
  const next = data.slice(offset + decoded[1], offset + decoded[1] + len);
  fullLen += decoded[1] + len;
  const result = u8aToHex(next);
  return [result, fullLen];
}

/*
vec
Example: const scheme = {type: 'vec', element: <element schema>}
*/
function vecEncodeTo(data: any, schema: object, output: number[]) {
  const arr = data;
  const elementSchema = schema['element' as keyof object];
  cnEncodeTo(arr.length, { type: 'cn' }, output);
  for (const element of arr) {
    encodeTo(element, elementSchema, output);
  }
}

function vecDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const elementSchema = schema['element' as keyof object];
  const oriOffset = offset;
  let decoded = cnDecodeFrom(data, { type: 'cn' }, offset);
  const len = decoded[0];
  offset += decoded[1];
  const result = [];
  for (let i = 0; i < len; ++i) {
    decoded = decodeFrom(data, elementSchema, offset);
    result.push(decoded[0]);
    offset += decoded[1];
  }
  return [result, offset - oriOffset];
}

/*
struct
Example: const scheme = {type: 'struct',
  fields: {
    <field a name>: <field a schema>,
    <field b name>: <field b schema>
  }
}
*/
function structEncodeTo(data: any, schema: object, output: number[]) {
  const fields = schema['fields' as keyof object];
  for (const fieldName of Object.keys(fields)) {
    const fieldSchema = fields[fieldName];
    const fieldData = data[fieldName];
    encodeTo(fieldData, fieldSchema, output);
  }
}

function structDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const fields = schema['fields' as keyof object];
  const oriOffset = offset;
  const result: { [k: string]: any } = {};
  for (const fieldName of Object.keys(fields)) {
    const fieldSchema = fields[fieldName];
    const decoded = decodeFrom(data, fieldSchema, offset);
    result[fieldName] = decoded[0];
    offset += decoded[1];
  }
  return [result, offset - oriOffset];
}

/*
enum
Example: const scheme = {type: 'enum',
  variants: {
    <variant a name>: {
      index: <variant a index>,
      schema: <variant a schema>
    },
    <variant b name>: {
      index: <variant b index>,
      schema: <variant b schema>
    },
  }
}
*/
function enumEncodeTo(data: any, schema: object, output: number[]) {
  const variants = schema['variants' as keyof object];

  const variantName = Object.keys(data)[0];
  const variantData = data[variantName];
  const variant = variants[variantName] as { [k: string]: any };
  const variantIndex = variant.index;
  const variantSchema = variant.schema;
  u8EncodeTo(variantIndex, { type: 'u8' }, output);
  encodeTo(variantData, variantSchema, output);
}

function enumDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const variants = schema['variants' as keyof object];
  const oriOffset = offset;

  let decoded = u8DecodeFrom(data, { type: 'u8' }, offset);
  const variantIndex = decoded[0];
  offset += decoded[1];

  const result: { [k: string]: any } = {};
  for (const variantName of Object.keys(variants)) {
    const variant = variants[variantName] as { [k: string]: any };
    if (variant.index === variantIndex) {
      const variantSchema = variant.schema;
      decoded = decodeFrom(data, variantSchema, offset);
      result[variantName] = decoded[0];
      offset += decoded[1];
      break;
    }
  }
  return [result, offset - oriOffset];
}

/*
struct
Example: const scheme = {type: 'tuple',
  elements: [
    <element a schema>,
    <element b schema>
  ]
}
*/
function tupleEncodeTo(data: any, schema: object, output: number[]) {
  const elements = schema['elements' as keyof object] as [];
  for (let i = 0; i < elements.length; ++i) {
    const elementSchema = elements[i];
    const elementData = data[i];
    encodeTo(elementData, elementSchema, output);
  }
}

function tupleDecodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const elements = schema['elements' as keyof object] as [];
  const oriOffset = offset;
  const result: any[] = [];
  for (const elementSchema of elements) {
    const decoded = decodeFrom(data, elementSchema, offset);
    result.push(decoded[0]);
    offset += decoded[1];
  }
  return [result, offset - oriOffset];
}

function encodeTo(data: any, schema: object, output: number[]) {
  const type = schema['type' as keyof object];
  switch (type) {
    case 'unit': {
      unitEncodeTo(data, schema, output);
      break;
    }
    case 'u8': {
      u8EncodeTo(data, schema, output);
      break;
    }
    case 'i8': {
      i8EncodeTo(data, schema, output);
      break;
    }
    case 'u16': {
      u16EncodeTo(data, schema, output);
      break;
    }
    case 'i16': {
      i16EncodeTo(data, schema, output);
      break;
    }
    case 'u32': {
      u32EncodeTo(data, schema, output);
      break;
    }
    case 'i32': {
      i32EncodeTo(data, schema, output);
      break;
    }
    case 'u64': {
      u64EncodeTo(data, schema, output);
      break;
    }
    case 'i64': {
      i64EncodeTo(data, schema, output);
      break;
    }
    case 'bool': {
      boolEncodeTo(data, schema, output);
      break;
    }
    case 'cn': {
      cnEncodeTo(data, schema, output);
      break;
    }
    case 'str': {
      strEncodeTo(data, schema, output);
      break;
    }
    case 'hex': {
      hexEncodeTo(data, schema, output);
      break;
    }
    case 'vec': {
      vecEncodeTo(data, schema, output);
      break;
    }
    case 'struct': {
      structEncodeTo(data, schema, output);
      break;
    }
    case 'enum': {
      enumEncodeTo(data, schema, output);
      break;
    }
    case 'tuple': {
      tupleEncodeTo(data, schema, output);
      break;
    }
  }
}

function decodeFrom(data: Uint8Array, schema: object, offset: number): [any, number] {
  const type = schema['type' as keyof object];
  switch (type) {
    case 'unit': {
      const decoded = unitDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'u8': {
      const decoded = u8DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'i8': {
      const decoded = i8DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'u16': {
      const decoded = u16DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'i16': {
      const decoded = i16DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'u32': {
      const decoded = u32DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'i32': {
      const decoded = i32DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'u64': {
      const decoded = u64DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'i64': {
      const decoded = i64DecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'bool': {
      const decoded = boolDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'cn': {
      const decoded = cnDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'str': {
      const decoded = strDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'hex': {
      const decoded = hexDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'vec': {
      const decoded = vecDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'struct': {
      const decoded = structDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'enum': {
      const decoded = enumDecodeFrom(data, schema, offset);
      return decoded;
    }
    case 'tuple': {
      const decoded = tupleDecodeFrom(data, schema, offset);
      return decoded;
    }
  }
  return [null, 0];
}

function encode(data: any, schema: object): Uint8Array {
  const output: number[] = [];
  encodeTo(data, schema, output);
  return new Uint8Array(output);
}

function decode(data: Uint8Array, schema: object): [any, number] {
  return decodeFrom(data, schema, 0);
}

export { hexToU8a, u8aToHex, encode, decode };
