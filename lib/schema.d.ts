export declare const callSchemaMap: {
    balance: {
        init: {
            params: {
                type: string;
                fields: {
                    endow: {
                        type: string;
                        element: {
                            type: string;
                            elements: {
                                type: string;
                            }[];
                        };
                    };
                };
            };
            result: {
                type: string;
            };
        };
        get_balance: {
            params: {
                type: string;
            };
            result: {
                type: string;
            };
        };
        transfer: {
            params: {
                type: string;
                fields: {
                    recipient: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
    };
    contract: {
        init: {
            params: {
                type: string;
                fields: {
                    max_stack_height: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    initial_memory_pages: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    max_memory_pages: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    max_share_value_len: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    max_share_size: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    max_nest_depth: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            result: {
                type: string;
            };
        };
        get_version: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
                variants: {
                    Some: {
                        index: number;
                        schema: {
                            type: string;
                        };
                    };
                    None: {
                        index: number;
                        schema: {
                            type: string;
                        };
                    };
                };
            };
        };
        get_admin: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
                variants: {
                    Some: {
                        index: number;
                        schema: {
                            type: string;
                            fields: {
                                threshold: {
                                    type: string;
                                };
                                members: {
                                    type: string;
                                    element: {
                                        type: string;
                                        elements: {
                                            type: string;
                                        }[];
                                    };
                                };
                            };
                        };
                    };
                    None: {
                        index: number;
                        schema: {
                            type: string;
                        };
                    };
                };
            };
        };
        get_code: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    version: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            result: {
                type: string;
                variants: {
                    Some: {
                        index: number;
                        schema: {
                            type: string;
                        };
                    };
                    None: {
                        schema: {
                            type: string;
                        };
                    };
                };
            };
        };
        get_code_hash: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    version: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            result: {
                type: string;
                variants: {
                    Some: {
                        index: number;
                        schema: {
                            type: string;
                        };
                    };
                    None: {
                        schema: {
                            type: string;
                        };
                    };
                };
            };
        };
        create: {
            params: {
                type: string;
                fields: {
                    code: {
                        type: string;
                    };
                    init_method: {
                        type: string;
                    };
                    init_params: {
                        type: string;
                    };
                    init_pay_value: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
        update_admin: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    admin: {
                        type: string;
                        fields: {
                            threshold: {
                                type: string;
                            };
                            members: {
                                type: string;
                                element: {
                                    type: string;
                                    elements: {
                                        type: string;
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
            result: {
                type: string;
            };
        };
        update_admin_vote: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    proposal_id: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
        update_code: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    code: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
        update_code_vote: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    proposal_id: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
        execute: {
            params: {
                type: string;
                fields: {
                    contract_address: {
                        type: string;
                    };
                    method: {
                        type: string;
                    };
                    params: {
                        type: string;
                    };
                    pay_value: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
    };
    poa: {
        init: {
            params: {
                type: string;
                fields: {
                    block_interval: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    authority: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
        get_meta: {
            params: {
                type: string;
            };
            result: {
                type: string;
                fields: {
                    block_interval: {
                        type: string;
                        variants: {
                            Some: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                            None: {
                                index: number;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        get_authority: {
            params: {
                type: string;
            };
            result: {
                type: string;
            };
        };
    };
    system: {
        init: {
            params: {
                type: string;
                fields: {
                    chain_id: {
                        type: string;
                    };
                    timestamp: {
                        type: string;
                    };
                    max_until_gap: {
                        type: string;
                    };
                    max_execution_gap: {
                        type: string;
                    };
                };
            };
            result: {
                type: string;
            };
        };
        get_meta: {
            params: {
                type: string;
            };
            result: {
                type: string;
                fields: {
                    chain_id: {
                        type: string;
                    };
                    timestamp: {
                        type: string;
                    };
                    max_until_gap: {
                        type: string;
                    };
                    max_execution_gap: {
                        type: string;
                    };
                };
            };
        };
    };
};
