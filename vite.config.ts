import bufferImport from './src/index.ts'
import { UserConfig, defineConfig } from 'vite'
import { stat, writeFile } from 'fs/promises'
import { randomBytes } from 'crypto'

const DEST = 'test/test.bin'
const SIZE = 4//1 << 20;


export default defineConfig(async function() {
  try {
    const binFileStat = await stat(DEST)
    if (binFileStat.size !== SIZE) throw Error('Size mismatch')
  } catch (error) {
    console.warn('[Warning]: test.bin not exist or valid, try generate')
    const buf = randomBytes(SIZE)
    await writeFile(DEST, buf)
  } finally {
    console.error('[Error] binary generate failed!')
  }
  let config: UserConfig = {
    root: 'test',
    plugins: [
      bufferImport()
    ],
    publicDir: false,
    server: {
      open: true,
    },
    build: {
    }
  }
  return config
})