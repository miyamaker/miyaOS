import { useState } from 'react'
import { goerli } from 'viem/chains'
import type { Address } from 'wagmi'
import { mainnet, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { ConnectedButton } from '@/components/Button'

import { useName } from '../useName'
import TableInput from './TableInput'

export default function NameRow({
  collection,
  active,
  onActive,
}: {
  collection: Address
  active: boolean
  onActive: (input: string) => void
}) {
  const { realName, setRealName, refetch } = useName({ address: collection })
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
    setInput(realName)
    onActive('realName')
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

  const handleUpdate = () => {
    setTransacting(true)
    try {
      const result = setRealName() // @TODO
    } catch (e) {
      setTransacting(false)
      // warn message
    }
  }

  return (
    <tr>
      <td>Name</td>
      {active ? (
        <td onClick={() => openInput()}>
          <TableInput value={input} onChange={(e) => handleInput(e.target.value)} />
        </td>
      ) : (
        <td onClick={() => openInput()}>{realName}</td>
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
          disabled={transacting}
          onClick={() => (active ? handleUpdate() : openInput())}
          withChain={[mainnet.id, goerli.id]}
        >
          {active ? (transacting ? 'Updating...' : `Update`) : 'Edit'}
        </ConnectedButton>
      </td>
    </tr>
  )
}
