export default function asyncBuffer(base64, mime) {
    const code = `import { decode } from 'base64-arraybuffer';
export default decode('${base64}')`;
    const ast = {
        type: "Program",
        start: 0,
        end: 67 + base64.length,
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
            }
        ],
        sourceType: "module"
    };
    return {
        code,
        // ast,
        map: { mappings: '' },
    };
}
