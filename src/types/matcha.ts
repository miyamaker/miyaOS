/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Address } from 'wagmi'

// https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-price#response
export interface PriceResponse {
  chainId: number
  price: string
  estimatedPriceImpact: string
  value: string
  gasPrice: string
  gas: string
  estimatedGas: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: Address
  buyAmount: string
  sellTokenAddress: Address
  sellAmount: string
  sources: any[]
  allowanceTarget: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  expectedSlippage: string | null
}

// https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote#response
export interface QuoteResponse {
  chainId: number
  price: string
  guaranteedPrice: string
  estimatedPriceImpact: string
  to: string
  from: string
  data: Address
  value: string
  gas: string
  estimatedGas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: Address
  sellTokenAddress: Address
  buyAmount: string
  sellAmount: string
  sources: any[]
  orders: any[]
  allowanceTarget: string
  decodedUniqueId: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
  expectedSlippage: string | null
}
