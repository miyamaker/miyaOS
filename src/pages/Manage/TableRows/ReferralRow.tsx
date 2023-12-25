import { useMemo, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { goerli } from 'viem/chains'
import type { Address } from 'wagmi'
import { mainnet, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { ConnectedButton } from '@/components/Button'

import { useReferralFee } from '../useReferralFee'
import TableInput from './TableInput'

const validate = z
  .number()
  .nonnegative()
  .refine(
    (n) => {
      return (n.toString().split('.')[1] || '').length <= 2
    },
    { message: 'Max precision is 2 decimal places' }
  )

export default function AllocationRow({
  collection,
  active,
  onActive,
}: {
  collection: Address
  active: boolean
  onActive: () => void
}) {
  const { referralFee, setReferralFee, refetch } = useReferralFee({ address: collection })

  const [transacting, setTransacting] = useState(false)
  const [txHash, setTxHash] = useState('')

  useWaitForTransaction({
    hash: (txHash as Address) || '0x',
    enabled: !!txHash,
    onSuccess: () => {
      setTransacting(false)
      setTxHash('')
      refetch()
    },
    onReplaced: () => {
      setTransacting(false)
      setTxHash('')
    },
  })

  const [input, setInput] = useState('')

  const openInput = () => {
    setInput(formatUnits(referralFee, 2))
    onActive()
  }

  const handleInput = (input: string) => {
    try {
      validate.parse(input === '' ? 0 : +input)
      setInput(input)
    } catch (e) {
      //
    }
  }

  const [isValidated, validated, errors] = useMemo(() => {
    const validateWithMax = z.bigint().lte(10000n)
    const { success, ...rest } = validateWithMax.safeParse(parseUnits(input || '0', 2))
    if (success && 'data' in rest) {
      return [success, rest.data]
    }

    if ('error' in rest) {
      const { formErrors } = rest.error

      return [success, 0n, formErrors]
    }

    return [success, 0n]
  }, [input])

  const handleUpdate = async () => {
    if (!isValidated) return
    setTransacting(true)
    try {
      const result = await setReferralFee(validated)
      setTxHash(result.hash)
    } catch (e) {
      setTransacting(false)
      // warn message
    }
  }

  return (
    <tr>
      <td>Referral fee</td>
      {active ? (
        <td onClick={() => openInput()}>
          <TableInput value={input} onChange={(e) => handleInput(e.target.value)} />
        </td>
      ) : (
        <td onClick={() => openInput()}>{formatUnits(referralFee, 2)}%</td>
      )}
      <td style={{ padding: 0 }}>
        <ConnectedButton
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          disabled={transacting || (active && !isValidated)}
          onClick={() => (active ? handleUpdate() : openInput())}
          withChain={[mainnet.id, goerli.id]}
        >
          {active ? (transacting ? 'Updating...' : `Update`) : 'Edit'}
        </ConnectedButton>
      </td>
    </tr>
  )
}
