import type { Address } from 'viem'
import { parseEther } from 'viem'
import { useContractWrite } from 'wagmi'

export function useMintWithFee({ address, payAmount = '0.01' }: { address: Address; payAmount: string }) {
  const { writeAsync } = useContractWrite({
    address,
    functionName: 'mint',
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    value: parseEther(payAmount),
  })

  const mint = async (amount: number) => writeAsync({ args: [amount] })

  return { mint }
}
