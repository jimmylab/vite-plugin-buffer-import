export default function asyncBlob(base64, mime) {
    const code = `import { decode } from 'base64-arraybuffer'
export default new Blob([
  decode('${base64}')
], {type: '${mime}'})`;
    const ast = {
        type: "Program",
        start: 0,
        end: 97 + base64.length + mime.length,
        body: [
            {
                type: "ImportDeclaration",
                specifiers: [
                    {
                        type: "ImportSpecifier",
                        imported: {
                            type: "Identifier",
                            name: "decode"
                        },
                        local: {
                            type: "Identifier",
                            name: "decode"
                        }
                    }
                ],
                source: {
                    type: "Literal",
                    value: "base64-arraybuffer",
                    raw: "'base64-arraybuffer'"
                }
            },
            {
                type: "ExportDefaultDeclaration",
                declaration: {
                    type: "NewExpression",
                    callee: {
                        type: "Identifier",
                        name: "Blob"
                    },
                    arguments: [
                        {
                            type: "ArrayExpression",
                            elements: [
                                {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "decode"
                                    },
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: base64,
                                        }
                                    ],
                                    optional: false
                                }
                            ]
                        },
                        {
                            type: "ObjectExpression",
                            properties: [
                                {
                                    type: "Property",
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: "Identifier",
                                        name: "type"
                                    },
                                    value: {
                                        type: "Literal",
                                        value: mime,
                                    },
                                    kind: "init"
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        sourceType: "module"
    };
    return {
        code,
        // ast,
        map: { mappings: '' }
    };
}
