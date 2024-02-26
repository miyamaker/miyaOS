import { values } from 'lodash'
import type { Address } from 'viem'
import { formatUnits } from 'viem'
import { useContractRead, useContractReads } from 'wagmi'

import { abi } from './constants'

export function useAllTokenIds({ nft, address }: { nft: Address; address: Address }) {
  const { data } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'getAllTokenIds',
    abi,
    args: [nft],
  })

  const list = data || []
  const ids = values(list).map((id: bigint) => Number(formatUnits(id, 0)))

  const { data: tokenURIData } = useContractReads({
    enabled: !!ids,
    contracts: ids.map((item) => ({
      address: nft,
      functionName: 'tokenURI',
      abi: [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'tokenURI',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      args: [item],
    })),
  })

  const tokenURIList = (tokenURIData?.map(({ result }) => result) as string[]) || []
  const tokenURIs = tokenURIList.map((item: string) => {
    const uri = item.replace('ipfs://', '')
    const cid = uri.split('/')[0]
    const tokenFile = uri.split('/')[1]
    return `https://${cid}.ipfs.nftstorage.link/${tokenFile}`
  })

  return {
    tokenIds: [...ids] as number[],
    tokenURIs,
  }
}
