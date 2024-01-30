import { values } from 'lodash'
import type { Address } from 'viem'
import { formatUnits } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useTokenIds({ nft, address, chainId }: { nft: Address; address: Address; chainId?: number }) {
  const { data } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'getActiveTokenIds',
    abi,
    args: [nft],
  })

  const list = data || []
  const ids = values(list).map((id: bigint) => Number(formatUnits(id, 0)))

  return {
    tokenIds: [...ids] as number[],
  }
}
