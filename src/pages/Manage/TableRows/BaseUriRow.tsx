import { useMemo, useState } from 'react'
import { goerli } from 'viem/chains'
import type { Address } from 'wagmi'
import { mainnet, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { ConnectedButton } from '@/components/Button'
import { uriValidate } from '@/pages/Launch/validators'

import { useBaseUri } from '../useBaseUri'
import TableInput from './TableInput'

export default function BaseUriRow({
  collection,
  active,
  onActive,
}: {
  collection: Address
  active: boolean
  onActive: () => void
}) {
  const { baseUri, setBaseUri, uriLocked, refetch } = useBaseUri({ address: collection })

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
    if (uriLocked) return
    setInput(baseUri)
    onActive()
  }

  const handleInput = (input: string) => {
    const validate = z.string()
    try {
      validate.parse(input)
      setInput(input)
    } catch (e) {
      //
    }
  }

  const [isValidated, validated, errors] = useMemo(() => {
    const { success, ...rest } = uriValidate.safeParse(input)
    if (success && 'data' in rest) {
      return [success, rest.data]
    }

    if ('error' in rest) {
      const { formErrors } = rest.error

      return [success, '', formErrors]
    }

    return [success, '']
  }, [input])

  const handleUpdate = async () => {
    if (!isValidated) return
    setTransacting(true)
    try {
      const result = await setBaseUri(input)
      setTxHash(result.hash)
    } catch (e) {
      setTransacting(false)
      // warn message
    }
  }

  return (
    <tr>
      <td>BaseUri</td>
      {active ? (
        <td onClick={() => openInput()}>
          <TableInput value={input} onChange={(e) => handleInput(e.target.value)} />
        </td>
      ) : (
        <td onClick={() => openInput()}>{baseUri}</td>
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
          disabled={transacting || uriLocked || !isValidated}
          onClick={() => (active ? handleUpdate() : openInput())}
          withChain={[mainnet.id, goerli.id]}
        >
          {active ? (transacting ? 'Updating...' : `Update`) : 'Edit'}
        </ConnectedButton>
      </td>
    </tr>
  )
}
