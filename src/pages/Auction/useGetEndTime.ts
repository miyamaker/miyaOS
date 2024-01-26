// eslint-disable-next-line no-restricted-imports
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useGetEndTime({ address, chainId }: { address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'endTime',
    abi,
  })

  return {
    endTime: (data || 0) as number,
    refetch,
  }
}
