/// <reference types="vite/client" />

declare module '*?buffer' {
  const arrayBuffer: () => Promise<ArrayBuffer>;
  export default arrayBuffer;
}
declare module '*?bufferSync' {
  const buffer: ArrayBuffer;
  export default buffer;
}
declare module '*?blob' {
  const blob: () => Promise<Blob>;
  export default blob;
}
declare module '*?blobSync' {
  const blob: Blob;
  export default blob;
}
