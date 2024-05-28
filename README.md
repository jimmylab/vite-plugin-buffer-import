# vite-plugin-buffer-imports

Import asset as buffer in vite with url query

# Usage

`vite.config.ts`:
```typescript
import bufferImport from 'vite-plugin-buffer-import'

export default defineConfig(function () {
  return {
    plugins: [
      bufferImport(),
    ]
  }
})
```

```js
// Recommended
import getBuffer from 'src/assets/file.encrypted?buffer'
import getBlob from 'src/assets/paper.docx?blob'
import arrayBuffer from 'src/assets/sprite.png?bufferSync'
import blob from 'src/assets/sprite.png?blobSync'

// Decoding slower, but non-blocking (fetch API backend)
(async () => {
  const buf = await getBuffer();

  const blobURL = URL.createObjectURL(await getBlob());
  document.querySelector('img')
    .style.backgroundImage = `url('${dataUrl}')`
}) ();

// Synchronized decoding, async import is recommended
// Returns buffer (or blob) instantly, note that huge chunks may freeze the browser
(async () => {
  const buf = await import('src/assets/file.encrypted?bufferSync');
  document.querySelector('img')
    .style.backgroundImage = `url('${dataUrl}')`
}) ();
```
For typescript intellisense, add the following line to `src/vite-env.d.ts`

```typescript
/// <reference types="vite-plugin-buffer-import/client" />
```

