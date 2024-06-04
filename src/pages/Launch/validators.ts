import type { Address } from 'viem'
import { isAddress, parseEther, parseUnits } from 'viem'
import { z } from 'zod'

// final validation for name to be a non-empty string
export const nameValidate = z.string().min(1).max(64)

// input validation fro name to be a string or empty (to allow for delete)
export const setNameValidate = z.union([nameValidate, z.literal('')])

// final validation for name to be a non-empty string
export const descriptionValidate = z.string().min(0).max(280)

// input validation fro name to be a string or empty (to allow for delete)
export const setDescriptionValidate = z.union([descriptionValidate, z.literal('')])

// final validation for symbol to be a non-empty string and transform to uppercase
export const symbolValidate = z
  .string()
  .min(1)
  .max(64)
  .transform((el) => el.toLocaleUpperCase())

// input validation for symbol to be a string or empty (to allow for delete)
export const setSymbolValidate = z.union([symbolValidate, z.literal('')])

// only digits regex
const integerRegex = /^[1-9]\d*$/

// final validation for supply to be a non-empty string of digits and transform to bigint
export const supplyValidate = z
  .string()
  .regex(integerRegex, 'Supply must be minimum 1')
  .transform<bigint>((el) => BigInt(el))

// input validation for supply to be "" or a string of only digits
export const setSupplyValidate = z.union([z.literal(''), z.string().regex(integerRegex)])

// only leading digits and . regex (0., 1.0, 0.0)
export const priceRegex = /^\d+\.\d*$/
export const finalPriceRegex = /^\d+\.\d+$/

// final validation for price to be either 0 or valid decimal number
export const priceValidate = z.union([
  z.literal('').transform(() => 0n),
  z.literal('0').transform(() => 0n),
  z
    .string()
    .regex(finalPriceRegex)
    .transform<bigint>((el) => parseEther(el)),
  z
    .string()
    .regex(integerRegex)
    .transform<bigint>((el) => BigInt(el)),
])

// input validation for token price to be "" or any decimal number
export const setPriceValidate = z.union([
  z.literal(''),
  z.literal('0'),
  z.string().regex(integerRegex),
  z.string().regex(priceRegex),
])

const finalTwoDecimalRegex = /^\d+\.\d{1,2}$/
const twoDecimalRegex = /^\d+\.\d{0,1,2}$/

export const royaltyValidate = z.union([
  z.literal('').transform(() => 0n),
  z.literal('0').transform(() => 0n),
  z
    .string()
    .regex(finalTwoDecimalRegex)
    .transform<bigint>((el) => parseUnits(el, 2))
    .pipe(z.bigint().max(10000n)),
  z
    .string()
    .regex(integerRegex)
    .transform<bigint>((el) => parseUnits(el, 2))
    .pipe(z.bigint().max(10000n)),
])

export const setRoyaltyValidate = z.union([
  z.literal(''),
  z.literal('0'),
  z.string().regex(priceRegex),
  z.string().regex(integerRegex),
])

export const uriValidate = z.union([
  z.literal(''),
  z.string().url(),
  z.string().startsWith('ipfs://'),
  z.string().startsWith('ar://'),
])

export const setUriValidate = z.string()

export const addressValidate = z.custom<Address>((el) => isAddress(el as string))
export const setAddressValidate = z.string()

export const vaultIdValidate = z
  .string()
  .regex(integerRegex)
  .transform((el) => BigInt(el))

export const setVaultIdValidate = z.union([z.literal(''), z.string().regex(integerRegex)])

export const allocationValidate = z.union([
  z
    .string()
    .regex(finalTwoDecimalRegex, 'Allocation must be a percentage between 5% and 100%')
    .transform<bigint>((el) => parseUnits(el, 2))
    .pipe(z.bigint().min(500n)),
  z
    .string()
    .regex(integerRegex, 'Allocation must be a percentage between 5% and 100%')
    .transform<bigint>((el) => parseUnits(el, 2))
    .pipe(z.bigint().min(500n)),
])

export const setAllocationValidate = z.union([
  z.literal(''),
  z.string().regex(twoDecimalRegex),
  z.string().regex(integerRegex),
])

export const schema = z
  .object({
    name: nameValidate,
    description: descriptionValidate,
    symbol: symbolValidate,
    image: uriValidate,
    externalLink: uriValidate,
    baseURI: uriValidate,
    maxSupply: supplyValidate,
    royalty: royaltyValidate,
    allocation: allocationValidate,
    tokenPrice: priceValidate,
    alignedNft: addressValidate,
    owner: addressValidate,
    vaultId: vaultIdValidate,
  })
  .strict()

export const partialSchemaPageOne = z.object({
  name: nameValidate,
  description: descriptionValidate,
  symbol: symbolValidate,
  image: uriValidate,
  externalLink: uriValidate,
})

export const partialSchemaPageTwo = z.object({
  owner: addressValidate,
  maxSupply: supplyValidate,
  royalty: royaltyValidate,
  tokenPrice: priceValidate,
  baseURI: uriValidate,
})
