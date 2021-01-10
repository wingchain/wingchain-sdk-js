"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sdk = void 0;
var schema_1 = require("./schema");
var codec_1 = require("./codec");
var Module = /** @class */ (function () {
    function Module(client, name) {
        this.client = client;
        this.name = name;
    }
    Module.prototype.call = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var id, fullMethod;
            var _a;
            return __generator(this, function (_b) {
                id = Date.now();
                fullMethod = this.name + '_' + method;
                return [2 /*return*/, (_a = this.client).call.apply(_a, __spreadArrays([id, fullMethod], params))];
            });
        });
    };
    return Module;
}());
var Chain = /** @class */ (function (_super) {
    __extends(Chain, _super);
    function Chain() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chain.prototype.getHeaderByNumber = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call.apply(this, __spreadArrays(['getHeaderByNumber'], params))];
            });
        });
    };
    Chain.prototype.getHeaderByHash = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call.apply(this, __spreadArrays(['getHeaderByHash'], params))];
            });
        });
    };
    Chain.prototype.getBlockByNumber = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call.apply(this, __spreadArrays(['getBlockByNumber'], params))];
            });
        });
    };
    Chain.prototype.getBlockByHash = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call.apply(this, __spreadArrays(['getBlockByHash'], params))];
            });
        });
    };
    Chain.prototype.getTransactionByHash = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var tx, moduleMap, schema, paramsSchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call.apply(this, __spreadArrays(['getTransactionByHash'], params))];
                    case 1:
                        tx = _a.sent();
                        if (!(tx && tx.call)) {
                            return [2 /*return*/, tx];
                        }
                        moduleMap = schema_1.callSchemaMap[tx.call.module];
                        schema = moduleMap[tx.call.method];
                        paramsSchema = schema.params;
                        tx.call.params = codec_1.decode(codec_1.hexToU8a(tx.call.params), paramsSchema)[0];
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    Chain.prototype.getRawTransactionByHash = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call.apply(this, __spreadArrays(['getRawTransactionByHash'], params))];
            });
        });
    };
    Chain.prototype.getReceiptByHash = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var options, receipt, moduleMap, schema, resultSchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = params.length > 1 ? params.pop() : {};
                        return [4 /*yield*/, this.call.apply(this, __spreadArrays(['getReceiptByHash'], params))];
                    case 1:
                        receipt = _a.sent();
                        if (options.module && options.method) {
                            moduleMap = schema_1.callSchemaMap[options.module];
                            schema = moduleMap[options.method];
                            resultSchema = schema.result;
                            if (receipt.result && receipt.result.Ok) {
                                receipt.result.Ok = codec_1.decode(codec_1.hexToU8a(receipt.result.Ok), resultSchema)[0];
                            }
                        }
                        return [2 /*return*/, receipt];
                }
            });
        });
    };
    Chain.prototype.sendRawTransaction = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call.apply(this, __spreadArrays(['sendRawTransaction'], params))];
            });
        });
    };
    Chain.prototype.getTransactionInTxPool = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var tx, moduleMap, schema, paramsSchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call.apply(this, __spreadArrays(['getTransactionInTxPool'], params))];
                    case 1:
                        tx = _a.sent();
                        if (!(tx && tx.call)) {
                            return [2 /*return*/, tx];
                        }
                        moduleMap = schema_1.callSchemaMap[tx.call.module];
                        schema = moduleMap[tx.call.method];
                        paramsSchema = schema.params;
                        tx.call.params = codec_1.decode(codec_1.hexToU8a(tx.call.params), paramsSchema)[0];
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    Chain.prototype.executeCall = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var moduleMap, schema, paramsSchema, resultSchema, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(params.length > 0 && params[0] && params[0].call)) {
                            return [2 /*return*/, null];
                        }
                        moduleMap = schema_1.callSchemaMap[params[0].call.module];
                        schema = moduleMap[params[0].call.method];
                        paramsSchema = schema.params;
                        resultSchema = schema.result;
                        params[0].call.params = codec_1.u8aToHex(codec_1.encode(params[0].call.params, paramsSchema));
                        return [4 /*yield*/, this.call.apply(this, __spreadArrays(['executeCall'], params))];
                    case 1:
                        result = _a.sent();
                        result = codec_1.decode(codec_1.hexToU8a(result), resultSchema)[0];
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Chain.prototype.buildTransaction = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var moduleMap, schema, paramsSchema, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(params.length > 0 && params[0] && params[0].call)) {
                            return [2 /*return*/, null];
                        }
                        moduleMap = schema_1.callSchemaMap[params[0].call.module];
                        schema = moduleMap[params[0].call.method];
                        paramsSchema = schema.params;
                        params[0].call.params = codec_1.u8aToHex(codec_1.encode(params[0].call.params, paramsSchema));
                        return [4 /*yield*/, this.call.apply(this, __spreadArrays(['buildTransaction'], params))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Chain;
}(Module));
var Network = /** @class */ (function (_super) {
    __extends(Network, _super);
    function Network() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Network.prototype.getState = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return this.call.apply(this, __spreadArrays(['getState'], params));
    };
    return Network;
}(Module));
var Sdk = /** @class */ (function () {
    function Sdk(client) {
        this.chain = new Chain(client, 'chain');
        this.network = new Network(client, 'network');
    }
    return Sdk;
}());
exports.Sdk = Sdk;
