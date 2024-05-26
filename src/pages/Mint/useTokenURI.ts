import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

export function useTokenURI({ address, tokenId }: { address: Address; tokenId: string }) {
  const { data: tokenURI, status } = useContractRead({
    address,
    enabled: !!address,
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
    args: [tokenId],
  })

  return {
    tokenURI: tokenURI as string | '',
    status,
  }
}
