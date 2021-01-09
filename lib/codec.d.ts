declare function hexToU8a(v: string): Uint8Array;
declare function u8aToHex(v: Uint8Array): string;
declare function encode(data: any, schema: object): Uint8Array;
declare function decode(data: Uint8Array, schema: object): [any, number];
export { hexToU8a, u8aToHex, encode, decode };
