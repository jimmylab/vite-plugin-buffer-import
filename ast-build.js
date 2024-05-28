// import { SourceDescription } from 'rollup'

// The template
/*
export default function arrayBuffer() {
 return (
   fetch('data:${mime};base64,${base64}')
   .then(res => res.blob())
 )
}
*/

const inputVars = ['base64', 'mime'];

function deep(ast1, ast2, level = 1) {
  const placeHolders = inputVars.map(v => '${' + v + '}');
  let serialized = '';
  if (level <= 1) {
    serialized += 'export function ast(' + inputVars.map((_, i) => `${inputVars[i]}: string`).join(', ') + ') {\n'
    serialized += inputVars.map((_, i) => `  const L${i} = ${inputVars[i]}.length;\n`).join('')
    serialized += '  return '
  }
  serialized += '{'
  let isFirst = true;
  const indent = '  '.repeat(level + 1)
  for (const k of Object.keys(ast1)) {
    const v1 = ast1[k];
    const v2 = ast2[k];
    if (!isFirst) serialized += ','
    serialized += '\n' + indent;
    serialized += /^\w+$/.test(k) ? `${k}: ` : JSON.stringify(k) + ': ';
    if (
      (k === 'start' || k === 'end') &&
      (typeof v1 === 'number' && typeof v2 === 'number')
    ) {
      const diff = v2 - v1;
      if (!diff) {
        serialized += String(v1)
      } else {
        let placeholderLen = 0;
        let expr = ''
        for (let i = 0; i < diff; i++) {
          expr += ` + L${i}`
          placeholderLen += placeHolders[i].length;
        }
        serialized += `${v1 - placeholderLen}` + expr
      }
    } else if (Array.isArray(v1) && Array.isArray(v2)) {
      const arrIndent = indent + '  '
      serialized += '['
      for (let i = 0, N = v1.length; i < N; i++) {
        if (i > 0) serialized += ','
        serialized += '\n' + arrIndent
        let e1 = v1[i];
        let e2 = v2[i];
        serialized += deep(e1, e2, level + 2)
      }
      if (v1.length > 0) serialized += '\n' + indent
      serialized += ']'
    } else if (typeof v1 === 'object') {
      if (v1 == null) serialized += 'null'
      else serialized += deep(v1, v2, level + 1)
    } else if (typeof v1 === 'string') {
      serialized += JSON.stringify(v1)
    } else {
      serialized += String(v1)
    }
    isFirst = false;
  }
  if (!isFirst) serialized += '\n' + '  '.repeat(level);
  serialized += '}';
  if (level <= 1) {
    serialized += '\n}\n'
  }
  return serialized;
}


const ast1 = {
  "type": "Program",
  "start": 0,
  "end": 124,
  "body": [
    {
      "type": "ExportDefaultDeclaration",
      "start": 0,
      "end": 124,
      "declaration": {
        "type": "FunctionDeclaration",
        "start": 15,
        "end": 124,
        "id": {
          "type": "Identifier",
          "start": 24,
          "end": 35,
          "name": "arrayBuffer"
        },
        "expression": false,
        "generator": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 38,
          "end": 124,
          "body": [
            {
              "type": "ReturnStatement",
              "start": 41,
              "end": 122,
              "argument": {
                "type": "CallExpression",
                "start": 53,
                "end": 119,
                "callee": {
                  "type": "MemberExpression",
                  "start": 53,
                  "end": 100,
                  "object": {
                    "type": "CallExpression",
                    "start": 53,
                    "end": 91,
                    "callee": {
                      "type": "Identifier",
                      "start": 53,
                      "end": 58,
                      "name": "fetch"
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 59,
                        "end": 90,
                        "value": "data:${mime};base64,${base64}",
                        "raw": "'data:${mime};base64,${base64}'"
                      }
                    ],
                    "optional": false
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 96,
                    "end": 100,
                    "name": "then"
                  },
                  "computed": false,
                  "optional": false
                },
                "arguments": [
                  {
                    "type": "ArrowFunctionExpression",
                    "start": 101,
                    "end": 118,
                    "id": null,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 101,
                        "end": 104,
                        "name": "res"
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 108,
                      "end": 118,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 108,
                        "end": 116,
                        "object": {
                          "type": "Identifier",
                          "start": 108,
                          "end": 111,
                          "name": "res"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 112,
                          "end": 116,
                          "name": "blob"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "arguments": [],
                      "optional": false
                    }
                  }
                ],
                "optional": false
              }
            }
          ]
        }
      }
    }
  ],
  "sourceType": "module"
}

const ast2 = {
  "type": "Program",
  "start": 0,
  "end": 126,
  "body": [
    {
      "type": "ExportDefaultDeclaration",
      "start": 0,
      "end": 126,
      "declaration": {
        "type": "FunctionDeclaration",
        "start": 15,
        "end": 126,
        "id": {
          "type": "Identifier",
          "start": 24,
          "end": 35,
          "name": "arrayBuffer"
        },
        "expression": false,
        "generator": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 38,
          "end": 126,
          "body": [
            {
              "type": "ReturnStatement",
              "start": 41,
              "end": 124,
              "argument": {
                "type": "CallExpression",
                "start": 53,
                "end": 121,
                "callee": {
                  "type": "MemberExpression",
                  "start": 53,
                  "end": 102,
                  "object": {
                    "type": "CallExpression",
                    "start": 53,
                    "end": 93,
                    "callee": {
                      "type": "Identifier",
                      "start": 53,
                      "end": 58,
                      "name": "fetch"
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 59,
                        "end": 92,
                        "value": "data:${mime_};base64,${base64_}",
                        "raw": "'data:${mime_};base64,${base64_}'"
                      }
                    ],
                    "optional": false
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 98,
                    "end": 102,
                    "name": "then"
                  },
                  "computed": false,
                  "optional": false
                },
                "arguments": [
                  {
                    "type": "ArrowFunctionExpression",
                    "start": 103,
                    "end": 120,
                    "id": null,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 103,
                        "end": 106,
                        "name": "res"
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 110,
                      "end": 120,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 110,
                        "end": 118,
                        "object": {
                          "type": "Identifier",
                          "start": 110,
                          "end": 113,
                          "name": "res"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 114,
                          "end": 118,
                          "name": "blob"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "arguments": [],
                      "optional": false
                    }
                  }
                ],
                "optional": false
              }
            }
          ]
        }
      }
    }
  ],
  "sourceType": "module"
}

console.log(
  deep(ast1, ast2)
)
