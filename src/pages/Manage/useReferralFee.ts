import { type Address } from 'viem'
import { useContractRead, useContractWrite } from 'wagmi'

export function useReferralFee({ address }: { address?: Address }) {
  const { data: referralFee, refetch } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'referralFee',
    abi: [
      {
        inputs: [],
        name: 'referralFee',
        outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  const { writeAsync } = useContractWrite({
    address,
    functionName: 'setReferralFee',
    abi: [
      {
        inputs: [{ internalType: 'uint16', name: '_price', type: 'uint16' }],
        name: 'setReferralFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  })

  const setReferralFee = async (input: bigint) => writeAsync({ args: [input] })

  return { referralFee: (referralFee as bigint) || 0n, setReferralFee, refetch }
}
