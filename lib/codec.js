"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.u8aToHex = exports.hexToU8a = void 0;
function hexToU8a(v) {
    v = v.replace('0x', '');
    return Uint8Array.from(Buffer.from(v, 'hex'));
}
exports.hexToU8a = hexToU8a;
function u8aToHex(v) {
    return '0x' + Buffer.from(v).toString('hex');
}
exports.u8aToHex = u8aToHex;
function strToU8a(str) {
    var utf8 = unescape(encodeURIComponent(str));
    var arr = [];
    for (var i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i));
    }
    return new Uint8Array(arr);
}
function u8aToStr(arr) {
    var str = String.fromCharCode.apply(null, Array.from(arr));
    str = decodeURIComponent(escape(str));
    return str;
}
function leToNumber(le, signed) {
    var negative = signed && le[le.length - 1] >= 128;
    var r = 0;
    var a = 1;
    le.forEach(function (x) {
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
function numberToLE(val, bytes) {
    var flip = false;
    if (val < 0) {
        val = -val - 1;
        flip = true;
    }
    var r = new Uint8Array(bytes);
    for (var o = 0; o < bytes; ++o) {
        r[o] = val % 256;
        if (flip) {
            r[o] = ~r[o] & 0xff;
        }
        val /= 256;
    }
    return r;
}
function cnToU8a(value) {
    if (value < 1 << 6) {
        return new Uint8Array([value << 2]);
    }
    else if (value < 1 << 14) {
        return numberToLE((value << 2) + 1, 2);
    }
    else if (value < 1 << 30) {
        return numberToLE((value << 2) + 2, 4);
    }
    else {
        var bytes = 0;
        for (var v = value; v > 0; v = Math.floor(v / 256)) {
            ++bytes;
        }
        // @ts-ignore
        return new Uint8Array(__spreadArrays([3 + ((bytes - 4) << 2)], numberToLE(value, bytes)));
    }
}
function u8aToCN(buff) {
    var res;
    var len;
    if (buff[0] % 4 === 0) {
        // one byte
        res = buff[0] >> 2;
        len = 1;
    }
    else if (buff[0] % 4 === 1) {
        res = leToNumber(buff.slice(0, 2), false) >> 2;
        len = 2;
    }
    else if (buff[0] % 4 === 2) {
        res = leToNumber(buff.slice(0, 4), false) >> 2;
        len = 4;
    }
    else {
        var n = (buff[0] >> 2) + 4;
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
function unitEncodeTo(data, schema, output) { }
function unitDecodeFrom(data, schema, offset) {
    return [null, 0];
}
/*
u8
Example: const scheme = {type: 'u8'}
*/
function u8EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 1)));
}
function u8DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 1);
    var result = leToNumber(use, false);
    return [result, 1];
}
/*
i8
Example: const scheme = {type: 'i8'}
*/
function i8EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 1)));
}
function i8DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 1);
    var result = leToNumber(use, true);
    return [result, 1];
}
/*
u16
Example: const scheme = {type: 'u16'}
*/
function u16EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 2)));
}
function u16DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 2);
    var result = leToNumber(use, false);
    return [result, 2];
}
/*
i16
Example: const scheme = {type: 'i16'}
*/
function i16EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 2)));
}
function i16DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 2);
    var result = leToNumber(use, true);
    return [result, 2];
}
/*
u32
Example: const scheme = {type: 'u32'}
*/
function u32EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 4)));
}
function u32DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 4);
    var result = leToNumber(use, false);
    return [result, 4];
}
/*
i32
Example: const scheme = {type: 'i32'}
*/
function i32EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 4)));
}
function i32DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 4);
    var result = leToNumber(use, true);
    return [result, 4];
}
/*
u64
Example: const scheme = {type: 'u64'}
*/
function u64EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 8)));
}
function u64DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 8);
    var result = leToNumber(use, false);
    return [result, 8];
}
/*
i64
Example: const scheme = {type: 'i64'}
*/
function i64EncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(numberToLE(data, 8)));
}
function i64DecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 8);
    var result = leToNumber(use, true);
    return [result, 8];
}
/*
bool
Example: const scheme = {type: 'bool'}
*/
function boolEncodeTo(data, schema, output) {
    output.push.apply(output, [data === true ? 1 : 0]);
}
function boolDecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 1);
    var result = use[0] === 1;
    return [result, 1];
}
/*
cn (compact number)
Example: const scheme = {type: 'cn'}
*/
function cnEncodeTo(data, schema, output) {
    output.push.apply(output, Array.from(cnToU8a(data)));
}
function cnDecodeFrom(data, schema, offset) {
    var use = data.slice(offset, offset + 16); // max u128
    var decoded = u8aToCN(use);
    return decoded;
}
/*
str
Example: const scheme = {type: 'str'}
*/
function strEncodeTo(data, schema, output) {
    var arr = strToU8a(data);
    cnEncodeTo(arr.length, { type: 'cn' }, output);
    output.push.apply(output, Array.from(arr));
}
function strDecodeFrom(data, schema, offset) {
    var fullLen = 0;
    var decoded = cnDecodeFrom(data, { type: 'cn' }, offset);
    var len = decoded[0];
    var next = data.slice(offset + decoded[1], offset + decoded[1] + len);
    fullLen += decoded[1] + len;
    var result = u8aToStr(next);
    return [result, fullLen];
}
/*
hex
Example: const scheme = {type: 'hex'}
*/
function hexEncodeTo(data, schema, output) {
    var arr = hexToU8a(data);
    cnEncodeTo(arr.length, { type: 'cn' }, output);
    var bufferSize = 1024;
    for (var i = 0; i < arr.length; i += bufferSize) {
        var buffer = arr.slice(i, i + bufferSize);
        output.push.apply(output, Array.from(buffer));
    }
}
function hexDecodeFrom(data, schema, offset) {
    var fullLen = 0;
    var decoded = cnDecodeFrom(data, { type: 'cn' }, offset);
    var len = decoded[0];
    var next = data.slice(offset + decoded[1], offset + decoded[1] + len);
    fullLen += decoded[1] + len;
    var result = u8aToHex(next);
    return [result, fullLen];
}
/*
vec
Example: const scheme = {type: 'vec', element: <element schema>}
*/
function vecEncodeTo(data, schema, output) {
    var arr = data;
    var elementSchema = schema['element'];
    cnEncodeTo(arr.length, { type: 'cn' }, output);
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var element = arr_1[_i];
        encodeTo(element, elementSchema, output);
    }
}
function vecDecodeFrom(data, schema, offset) {
    var elementSchema = schema['element'];
    var oriOffset = offset;
    var decoded = cnDecodeFrom(data, { type: 'cn' }, offset);
    var len = decoded[0];
    offset += decoded[1];
    var result = [];
    for (var i = 0; i < len; ++i) {
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
function structEncodeTo(data, schema, output) {
    var fields = schema['fields'];
    for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
        var fieldName = _a[_i];
        var fieldSchema = fields[fieldName];
        var fieldData = data[fieldName];
        encodeTo(fieldData, fieldSchema, output);
    }
}
function structDecodeFrom(data, schema, offset) {
    var fields = schema['fields'];
    var oriOffset = offset;
    var result = {};
    for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
        var fieldName = _a[_i];
        var fieldSchema = fields[fieldName];
        var decoded = decodeFrom(data, fieldSchema, offset);
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
function enumEncodeTo(data, schema, output) {
    var variants = schema['variants'];
    var variantName = Object.keys(data)[0];
    var variantData = data[variantName];
    var variant = variants[variantName];
    var variantIndex = variant.index;
    var variantSchema = variant.schema;
    u8EncodeTo(variantIndex, { type: 'u8' }, output);
    encodeTo(variantData, variantSchema, output);
}
function enumDecodeFrom(data, schema, offset) {
    var variants = schema['variants'];
    var oriOffset = offset;
    var decoded = u8DecodeFrom(data, { type: 'u8' }, offset);
    var variantIndex = decoded[0];
    offset += decoded[1];
    var result = {};
    for (var _i = 0, _a = Object.keys(variants); _i < _a.length; _i++) {
        var variantName = _a[_i];
        var variant = variants[variantName];
        if (variant.index === variantIndex) {
            var variantSchema = variant.schema;
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
function tupleEncodeTo(data, schema, output) {
    var elements = schema['elements'];
    for (var i = 0; i < elements.length; ++i) {
        var elementSchema = elements[i];
        var elementData = data[i];
        encodeTo(elementData, elementSchema, output);
    }
}
function tupleDecodeFrom(data, schema, offset) {
    var elements = schema['elements'];
    var oriOffset = offset;
    var result = [];
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var elementSchema = elements_1[_i];
        var decoded = decodeFrom(data, elementSchema, offset);
        result.push(decoded[0]);
        offset += decoded[1];
    }
    return [result, offset - oriOffset];
}
function encodeTo(data, schema, output) {
    var type = schema['type'];
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
function decodeFrom(data, schema, offset) {
    var type = schema['type'];
    switch (type) {
        case 'unit': {
            var decoded = unitDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'u8': {
            var decoded = u8DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'i8': {
            var decoded = i8DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'u16': {
            var decoded = u16DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'i16': {
            var decoded = i16DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'u32': {
            var decoded = u32DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'i32': {
            var decoded = i32DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'u64': {
            var decoded = u64DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'i64': {
            var decoded = i64DecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'bool': {
            var decoded = boolDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'cn': {
            var decoded = cnDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'str': {
            var decoded = strDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'hex': {
            var decoded = hexDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'vec': {
            var decoded = vecDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'struct': {
            var decoded = structDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'enum': {
            var decoded = enumDecodeFrom(data, schema, offset);
            return decoded;
        }
        case 'tuple': {
            var decoded = tupleDecodeFrom(data, schema, offset);
            return decoded;
        }
    }
    return [null, 0];
}
function encode(data, schema) {
    var output = [];
    encodeTo(data, schema, output);
    return new Uint8Array(output);
}
exports.encode = encode;
function decode(data, schema) {
    return decodeFrom(data, schema, 0);
}
exports.decode = decode;
