document.getElementById('testA')
?.addEventListener('click', async ev => {
  console.time()
  const getBuffer = (await import('./test.bin?buffer')).default;
  const buffer = await getBuffer()
  console.log(buffer.byteLength)
  console.log(new Uint8Array(buffer.slice(-1)).at(0))
  console.timeEnd()
})

document.getElementById('testB')
?.addEventListener('click', async ev => {
  console.log('This test is not avaliable')
  // console.time()
  // const byteArray = (await import('./test.bin?byteArray')).default;
  // console.log(byteArray.byteLength)
  // console.log(new Uint8Array(byteArray.slice(-1)).at(0))
  // console.timeEnd()
})

document.getElementById('testC')
?.addEventListener('click', async ev => {
  console.time()
  const buffer = (await import('./test.bin?bufferSync')).default;
  console.log(buffer.byteLength)
  console.log(new Uint8Array(buffer.slice(-1)).at(0))
  console.timeEnd()
})
