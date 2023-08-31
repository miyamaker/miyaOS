import axios from 'axios'
import { useEffect, useState } from 'react'
import type { BaseError, TransactionReceipt } from 'viem'
import type { Address } from 'wagmi'
import {
  erc20ABI,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

import { HighlightButton } from '@/components/Button'
import type { PriceResponse, QuoteResponse } from '@/types/matcha'

import * as S from './Swap.styles'

const ZERO_EX_ADDRESS = '0xdef1c0ded9bec7f1a1670819833240f027b25eff'
const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n
const ZERO_EX_API_KEY = import.meta.env.VITE_ZERO_EX_API_KEY

export default function ApproveOrReviewButton({
  takerAddress,
  // previewMode,
  price,
}: {
  price?: PriceResponse
  takerAddress: Address
  // previewMode: boolean
}) {
  const [txnHash, setTxnHash] = useState<TransactionReceipt | undefined>()
  const [quote, setQuote] = useState<QuoteResponse | undefined>()

  const [success, setSuccess] = useState(false)
  const fetchQuote = async () => {
    const headers = { '0x-api-key': ZERO_EX_API_KEY }

    const params = {
      sellToken: price?.sellTokenAddress,
      buyToken: price?.buyTokenAddress,
      sellAmount: price?.sellAmount,
      takerAddress,
    }

    const res = await axios.get('https://api.0x.org/swap/v1/quote', {
      params,
      headers,
    })
    setQuote(res.data)
  }

  const { config: swapConfig } = usePrepareSendTransaction({
    account: takerAddress,
    to: quote?.to, // The address of the contract to send call data to, in this case 0x Exchange Proxy
    data: quote?.data, // The call data required to be sent to the to contract address.
    value: quote ? BigInt(quote?.value) : undefined,
    gasPrice: quote ? BigInt(quote?.gasPrice) : undefined,
    // value: quote?.value,
    // gasPrice: quote?.gasPrice,
    chainId: quote?.chainId,
  })

  const { sendTransaction } = useSendTransaction(swapConfig, {
    onSuccess(data) {
      console.log(data)
      setSuccess(true)
    },
  })

  async function performSwap() {
    try {
      await fetchQuote()
      sendTransaction?.()
    } catch (err) {
      console.error('Failed to perform swap:', err)
    }
  }

  // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
  const { data: allowance, refetch } = useContractRead({
    address: price?.sellTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [takerAddress, ZERO_EX_ADDRESS],
  })

  // 2. (only if no allowance): write to erc20, approve 0x Exchange Proxy to spend max integer
  const { config } = usePrepareContractWrite({
    address: price?.sellTokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [ZERO_EX_ADDRESS, MAX_ALLOWANCE],
  })

  const { data: writeContractResult, writeAsync: approveAsync, error } = useContractWrite(config)

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      setTxnHash(data)
      refetch()
    },
  })

  useEffect(() => {
    if (allowance && allowance !== 0n && price) {
      fetchQuote()
    }
  }, [price, allowance])

  if (allowance === 0n && approveAsync) {
    return (
      <>
        <HighlightButton
          type="button"
          onClick={async () => {
            await approveAsync()
          }}
        >
          {isApproving ? 'Approving...' : 'Approve'}
        </HighlightButton>
        {error && <div>Error... {(error as BaseError).shortMessage}</div>}
      </>
    )
  }

  return (
    <S.BottomFlex>
      <HighlightButton type="button" disabled={!price} onClick={() => performSwap()}>
        Swap
      </HighlightButton>
      {success && <p>Much Success!</p>}
      {error && <div>Error... {(error as BaseError).shortMessage}</div>}
    </S.BottomFlex>
  )
}
