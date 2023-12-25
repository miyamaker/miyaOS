import { useMemo, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { goerli } from 'viem/chains'
import type { Address } from 'wagmi'
import { mainnet, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { ConnectedButton } from '@/components/Button'

import { useMaxSupply } from '../useMaxSupply'
import { useTotalSupply } from '../useTotalSupply'
import TableInput from './TableInput'

const validate = z
  .number()
  .int()
  .nonnegative()

  .transform((value) => parseUnits(String(value), 0))

export default function MaxSupplyRow({
  collection,
  active,
  onActive,
}: {
  collection: Address
  active: boolean
  onActive: () => void
}) {
  const { maxSupply, decreaseSupply, refetch } = useMaxSupply({ address: collection })
  const totalSupply = useTotalSupply({ address: collection })

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
    setInput(maxSupply.toString())
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
    const validateWithMax = z.bigint().gt(0n).gte(totalSupply).lt(maxSupply)
    const { success, ...rest } = validateWithMax.safeParse(parseUnits(input || '0', 0))
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
      const result = await decreaseSupply(validated)
      setTxHash(result.hash)
    } catch (e) {
      setTransacting(false)
      // warn message
    }
  }

  return (
    <tr>
      <td>Supply</td>
      {active ? (
        <td onClick={() => openInput()}>
          <TableInput value={input} onChange={(e) => handleInput(e.target.value)} />
        </td>
      ) : (
        <td onClick={() => openInput()}>
          {formatUnits(totalSupply, 0)}/{formatUnits(maxSupply, 0)}
        </td>
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
