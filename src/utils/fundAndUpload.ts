import type { Chain } from 'wagmi'

import getIrys from './getIrys'

type Tag = {
  name: string
  value: string
}

const GATEWAY_BASE = (import.meta.env.VITE_IRYS_GATEWAY || 'https://gateway.irys.xyz/').endsWith('/')
  ? import.meta.env.VITE_IRYS_GATEWAY || 'https://gateway.irys.xyz/'
  : `${import.meta.env.VITE_IRYS_GATEWAY || 'https://gateway.irys.xyz/'}/`

// Function Overloading
async function fundAndUploadMultipleFiles(
  files: File[],
  tags: Tag[],
  url?: string,
  token?: string,
  chain?: Chain
): Promise<string[]> {
  const irys = await getIrys(url, token, chain)

  try {
    let size = 0
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      size += file.size
    }

    const price = await irys.getPrice(size)

    const balance = await irys.getLoadedBalance()

    if (price.isGreaterThanOrEqualTo(balance)) {
      console.log('Funding node.')
      await irys.fund(price)
    } else {
      console.log('Funding not needed, balance sufficient.')
    }

    const receipt = await irys.uploadFolder(files, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tags,
    })
    console.log('folder uploaded ', receipt)
    console.log(`Uploaded successfully. ${GATEWAY_BASE}${receipt.manifestId}`)

    return [receipt?.manifestId || '', receipt?.id || '']
  } catch (e) {
    console.log('Error uploading single file ', e)
  }

  return ['', '']
}

async function fundAndUploadSingleFile(
  file: File,
  tags: Tag[],
  url?: string,
  token?: string,
  chain?: Chain
): Promise<string> {
  const irys = await getIrys(url, token, chain)

  try {
    const price = await irys.getPrice(file?.size)
    const balance = await irys.getLoadedBalance()
    console.log(file.size)
    console.log(price)
    console.log(balance)
    if (price.isGreaterThanOrEqualTo(balance)) {
      console.log('Funding node.')
      await irys.fund(price)
    } else {
      console.log('Funding not needed, balance sufficient.')
    }

    const receipt = await irys.uploadFile(file, {
      tags,
    })
    console.log(`Uploaded successfully. ${GATEWAY_BASE}${receipt.id}`)

    return receipt.id
  } catch (e) {
    console.log('Error uploading single file ', e)
  }

  return ''
}

async function fundAndUpload(file: File, tags: Tag[], url?: string, token?: string, chain?: Chain): Promise<string>
async function fundAndUpload(files: File[], tags: Tag[], url?: string, token?: string, chain?: Chain): Promise<string[]>
async function fundAndUpload(
  files: File | File[],
  tags: Tag[],
  url?: string,
  token?: string,
  chain?: Chain
): Promise<string | string[]> {
  if (Array.isArray(files)) {
    return fundAndUploadMultipleFiles(files, tags, url, token, chain)
  }

  return fundAndUploadSingleFile(files, tags, url, token, chain)
}

export { fundAndUpload }
