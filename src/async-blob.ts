import { ProgramNode, SourceDescription } from 'rollup'

export default function asyncBlob(base64: string, mime: string) : SourceDescription {
  const value = `data:${mime};base64,${base64}`;
  const code =
`export default function() {
  return (
    fetch('${value}')
    .then(res => res.blob())
  )
}`

  const ast: ProgramNode = {
    type: "Program",
    start: 0,
    end: 96 + mime.length + base64.length,
    body: [
      {
        type: "ExportDefaultDeclaration",
        declaration: {
          type: "FunctionDeclaration",
          id: {
            type: "Identifier",
            name: "arrayBuffer"
          },
          generator: false,
          async: false,
          params: [],
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ReturnStatement",
                argument: {
                  type: "CallExpression",
                  callee: {
                    type: "MemberExpression",
                    object: {
                      type: "CallExpression",
                      callee: {
                        type: "Identifier",
                        name: "fetch"
                      },
                      arguments: [
                        {
                          type: "Literal",
                          value,
                        }
                      ],
                      optional: false
                    },
                    property: {
                      type: "Identifier",
                      name: "then"
                    },
                    computed: false,
                    optional: false
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      expression: true,
                      generator: false,
                      async: false,
                      params: [
                        {
                          type: "Identifier",
                          name: "res"
                        }
                      ],
                      body: {
                        type: "CallExpression",
                        callee: {
                          type: "MemberExpression",
                          object: {
                            type: "Identifier",
                            name: "res"
                          },
                          property: {
                            type: "Identifier",
                            name: "blob"
                          },
                          computed: false,
                          optional: false
                        },
                        arguments: [],
                        optional: false
                      }
                    }
                  ],
                  optional: false
                }
              }
            ]
          }
        }
      }
    ],
    sourceType: "module"
  }

  return {
    code,
    // ast,
    map: { mappings: '' }
  }
}
