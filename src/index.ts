import { Plugin } from 'vite'
import fsPromises from 'fs/promises'
import mime from 'mime'
import asyncBlob from './async-blob.js'
import asyncBuffer from './async-buffer.js'
import syncBlob from './sync-blob.js'
import syncBuffer from './sync-buffer.js'

export default function bufferImport() : Plugin<{}> {
  return {
    name: 'vite-plugin-buffer-import',
    enforce: 'pre',
    async load(id, options) {
      const [path, query] = id.split('?')
      if (typeof path !== 'string' || typeof query !== 'string')
        return null
      const data = await fsPromises.readFile(path)
      const base64 = data.toString('base64')
      const mimeType = mime.getType(path) ?? 'application/octet-stream';

      // TODO: Make pre-generated AST works
      // TODO: Optimize large chunk
      switch (query) {
        case 'blob': {
          return asyncBlob(base64, mimeType)
        } case 'buffer': {
          return asyncBuffer(base64, mimeType)
        } case 'bufferSync': {
          return syncBuffer(base64, mimeType)
        } case 'blobSync': {
          return syncBlob(base64, mimeType)
        } default: {
          return null;
        }
      }
    },
  }
}
