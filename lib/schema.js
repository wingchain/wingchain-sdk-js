"use strict";
// export class CallSchema {
//   params: object;
//   result: object;
//
//   constructor(params: object, result: object) {
//     this.params = params;
//     this.result = result;
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.callSchemaMap = void 0;
var adminSchema = {
    type: 'struct',
    fields: {
        threshold: { type: 'u32' },
        members: {
            type: 'vec',
            element: {
                type: 'tuple',
                elements: [{ type: 'hex' }, { type: 'u32' }],
            },
        },
    },
};
exports.callSchemaMap = {
    balance: {
        init: {
            params: {
                type: 'struct',
                fields: {
                    endow: {
                        type: 'vec',
                        element: {
                            type: 'tuple',
                            elements: [
                                {
                                    type: 'hex',
                                },
                                {
                                    type: 'u64',
                                },
                            ],
                        },
                    },
                },
            },
            result: {
                type: 'unit',
            },
        },
        get_balance: {
            params: {
                type: 'unit',
            },
            result: {
                type: 'u64',
            },
        },
        transfer: {
            params: {
                type: 'struct',
                fields: {
                    recipient: {
                        type: 'hex',
                    },
                    value: {
                        type: 'u64',
                    },
                },
            },
            result: {
                type: 'unit',
            },
        },
    },
    contract: {
        init: {
            params: {
                type: 'struct',
                fields: {
                    max_stack_height: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u32' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                    initial_memory_pages: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u32' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                    max_memory_pages: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u32' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                    max_share_value_len: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u64' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                    max_share_size: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u64' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                    max_nest_depth: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u32' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                },
            },
            result: {
                type: 'unit',
            },
        },
        get_version: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: {
                        type: 'hex',
                    },
                },
            },
            result: {
                type: 'enum',
                variants: { Some: { index: 1, schema: { type: 'u32' } }, None: { index: 0, schema: { type: 'unit' } } },
            },
        },
        get_admin: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: {
                        type: 'hex',
                    },
                },
            },
            result: {
                type: 'enum',
                variants: {
                    Some: {
                        index: 1,
                        schema: adminSchema,
                    },
                    None: { index: 0, schema: { type: 'unit' } },
                },
            },
        },
        get_code: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: {
                        type: 'hex',
                    },
                    version: {
                        type: 'enum',
                        variants: {
                            Some: {
                                index: 1,
                                schema: { type: 'u32' },
                            },
                            None: {
                                index: 0,
                                schema: { type: 'unit' },
                            },
                        },
                    },
                },
            },
            result: {
                type: 'enum',
                variants: {
                    Some: {
                        index: 1,
                        schema: { type: 'hex' },
                    },
                    None: {
                        schema: { type: 'unit' },
                    },
                },
            },
        },
        get_code_hash: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: {
                        type: 'hex',
                    },
                    version: {
                        type: 'enum',
                        variants: {
                            Some: {
                                index: 1,
                                schema: { type: 'u32' },
                            },
                            None: {
                                index: 0,
                                schema: { type: 'unit' },
                            },
                        },
                    },
                },
            },
            result: {
                type: 'enum',
                variants: {
                    Some: {
                        index: 1,
                        schema: { type: 'hex' },
                    },
                    None: {
                        schema: { type: 'unit' },
                    },
                },
            },
        },
        create: {
            params: {
                type: 'struct',
                fields: {
                    code: { type: 'hex' },
                    init_method: { type: 'str' },
                    init_params: { type: 'hex' },
                    init_pay_value: { type: 'u64' },
                },
            },
            result: {
                type: 'hex',
            },
        },
        update_admin: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: { type: 'hex' },
                    admin: adminSchema,
                },
            },
            result: {
                type: 'unit',
            },
        },
        update_admin_vote: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: { type: 'hex' },
                    proposal_id: { type: 'u32' },
                },
            },
            result: { type: 'unit' },
        },
        update_code: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: { type: 'hex' },
                    code: { type: 'hex' },
                },
            },
            result: {
                type: 'unit',
            },
        },
        update_code_vote: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: { type: 'hex' },
                    proposal_id: { type: 'u32' },
                },
            },
            result: { type: 'unit' },
        },
        execute: {
            params: {
                type: 'struct',
                fields: {
                    contract_address: { type: 'hex' },
                    method: { type: 'str' },
                    params: { type: 'hex' },
                    pay_value: { type: 'u64' },
                },
            },
            result: {
                type: 'hex',
            },
        },
    },
    poa: {
        init: {
            params: {
                type: 'struct',
                fields: {
                    block_interval: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u64' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                    authority: {
                        type: 'hex',
                    },
                },
            },
            result: {
                type: 'unit',
            },
        },
        get_meta: {
            params: {
                type: 'unit',
            },
            result: {
                type: 'struct',
                fields: {
                    block_interval: {
                        type: 'enum',
                        variants: { Some: { index: 1, schema: { type: 'u64' } }, None: { index: 0, schema: { type: 'unit' } } },
                    },
                },
            },
        },
        get_authority: {
            params: {
                type: 'unit',
            },
            result: {
                type: 'hex',
            },
        },
    },
    system: {
        init: {
            params: {
                type: 'struct',
                fields: {
                    chain_id: {
                        type: 'str',
                    },
                    timestamp: {
                        type: 'u64',
                    },
                    max_until_gap: {
                        type: 'u64',
                    },
                    max_execution_gap: {
                        type: 'i8',
                    },
                },
            },
            result: {
                type: 'unit',
            },
        },
        get_meta: {
            params: {
                type: 'unit',
            },
            result: {
                type: 'struct',
                fields: {
                    chain_id: {
                        type: 'str',
                    },
                    timestamp: {
                        type: 'u64',
                    },
                    max_until_gap: {
                        type: 'u64',
                    },
                    max_execution_gap: {
                        type: 'i8',
                    },
                },
            },
        },
    },
};
