import Love from 'assets/love.jpg?preset=avatar&resize=true'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/macro'
import { goerli } from 'viem/chains'
import type { Address } from 'wagmi'
import {
  mainnet,
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import ComputerIcon from '@/assets/computer.png'
import GearIcon from '@/assets/gears.png'
import MiladyIcon from '@/assets/milady_pixelated.png'
import { ConnectedButton, HighlightButton, LinkButton } from '@/components/Button'
import Radio from '@/components/Radio'
import { Separator } from '@/components/Separator'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import { DEFAULT_PARENT, DEFAULT_VAULT, FACTORY_CONTRACT } from '@/constants/contracts'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'

import { abi, BASE_FORM, DEFAULT_FORM } from './constants'
import FormInput from './FormInput'
import {
  partialSchemaPageOne,
  partialSchemaPageTwo,
  schema,
  setAllocationValidate,
  setDescriptionValidate,
  setNameValidate,
  setPriceValidate,
  setRoyaltyValidate,
  setSupplyValidate,
  setSymbolValidate,
  setVaultIdValidate,
} from './validators'

type Form = {
  name: string
  description: string
  image: string
  externalLink: string
  symbol: string
  baseURI: string
  maxSupply: string
  royalty: string
  allocation: string
  owner: string
  alignedNft: string
  tokenPrice: string
  vaultId: string
}

const page = Pages.mint

const TextContainer = styled.div`
  padding: 8px;
  padding-bottom: 0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`

const ResponsiveImage = styled.img`
  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: none;
`}
`

export default function MintPage() {
  // Network
  const { chain } = useNetwork()
  const factory = FACTORY_CONTRACT[chain?.id || mainnet.id] || FACTORY_CONTRACT[mainnet.id]!

  // Account
  const { isConnected, address } = useAccount()

  // Window mgmt
  const [fullscreen, toggleFullscreen] = useFullscreen('mint')
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: 'mint' }))
  const minimize = () => dispatch(minimizeWindow({ value: 'mint' }))

  // Pagination
  const [index, setIndex] = useState(0)

  // Setup type
  const [selectedType, setSelectedType] = useState('standard')

  // Unformatted form
  const [form, setForm] = useState<Form>(DEFAULT_FORM.standard)

  // Transaction
  const [isTransacting, setTransacting] = useState(false)

  const [transactionHash, setTransactionHash] = useState('')
  const [result, setResult] = useState<any>()
  const [error, setError] = useState<Error | null>(null)

  const transaction = useWaitForTransaction({ hash: transactionHash as `0x${string}`, enabled: !!transactionHash })

  useEffect(() => {
    if (transaction.isError) {
      setError(transaction.error)
      setTransacting(false)
    }

    if (transaction.isSuccess) {
      setResult(transaction.data)
      setTransacting(false)
    }
  }, [transaction.status])
  useEffect(() => {
    setForm({
      ...(DEFAULT_FORM[selectedType as 'standard' | 'advanced' | 'milady'] as Form),
      alignedNft: DEFAULT_PARENT[chain?.id || mainnet.id] || DEFAULT_PARENT[mainnet.id]!,
      vaultId: DEFAULT_VAULT[chain?.id || mainnet.id] || DEFAULT_VAULT[mainnet.id]!,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType])

  useEffect(() => {
    if (isConnected && address && selectedType !== 'advanced') setForm((prev) => ({ ...prev, owner: address }))
  }, [isConnected, address, selectedType])

  useEffect(() => {
    if (chain?.id && selectedType === 'milady')
      setForm((prev) => ({
        ...prev,
        alignedNft: DEFAULT_PARENT[chain.id] || DEFAULT_PARENT[mainnet.id]!,
        vaultId: DEFAULT_VAULT[chain.id] || DEFAULT_VAULT[mainnet.id]!,
      }))
  }, [chain?.id, selectedType])

  const [isValidated, validated, pageOneValidated, pageTwoValidated, errors] = useMemo(() => {
    const { success, ...rest } = schema.safeParse(form)
    const { success: OneValidated } = partialSchemaPageOne.safeParse(form)
    const { success: TwoValidated } = partialSchemaPageTwo.safeParse(form)
    if (success && 'data' in rest) {
      const {
        name,
        symbol,
        description,
        image,
        externalLink,
        baseURI,
        maxSupply,
        royalty,
        allocation,
        owner,
        alignedNft,
        tokenPrice,
        vaultId,
      } = rest.data

      const json = {
        name,
        description,
        image,
        external_link: externalLink,
        collaborators: [],
      }

      return [
        success,
        [
          name,
          symbol,
          baseURI,
          `data:application/json;utf8,${JSON.stringify(json)}`,
          maxSupply,
          royalty,
          allocation,
          owner,
          alignedNft,
          tokenPrice,
          vaultId,
        ],
        OneValidated,
        TwoValidated,
      ]
    }

    if ('error' in rest) {
      const { formErrors } = rest.error
      return [false, BASE_FORM, OneValidated, TwoValidated, formErrors]
    }

    return [false, BASE_FORM, OneValidated, TwoValidated]
  }, [form])

  const isNextDisabled = useMemo(() => {
    if (index === 0 && !selectedType) return true
    if (index === 1 && !pageOneValidated) return true
    if (index === 2 && !pageTwoValidated) return true
    if (index === 3 && !isValidated) return true
    if (index === 4) return true
    return false
  }, [index, isValidated, pageOneValidated, pageTwoValidated, selectedType])

  const setName = (value: string) => {
    try {
      const result = setNameValidate.parse(value)
      setForm((prev) => ({ ...prev, name: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const setDescription = (value: string) => {
    try {
      const result = setDescriptionValidate.parse(value)
      setForm((prev) => ({ ...prev, description: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const setSymbol = (value: string) => {
    try {
      const result = setSymbolValidate.parse(value)
      setForm((prev) => ({ ...prev, symbol: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const setBaseURI = (value: string) => {
    setForm((prev) => ({ ...prev, baseURI: value }))
  }

  const setImage = (value: string) => {
    setForm((prev) => ({ ...prev, image: value }))
  }

  const setExternalLink = (value: string) => {
    setForm((prev) => ({ ...prev, externalLink: value }))
  }

  const setOwner = (value: string) => {
    setForm((prev) => ({ ...prev, owner: value }))
  }

  const setAlignedNft = (value: string) => {
    setForm((prev) => ({ ...prev, alignedNft: value }))
  }

  const setMaxSupply = (value: string) => {
    try {
      const result = setSupplyValidate.parse(value)
      setForm((prev) => ({ ...prev, maxSupply: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const setTokenPrice = (value: string) => {
    try {
      const result = setPriceValidate.parse(value)
      setForm((prev) => ({ ...prev, tokenPrice: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const setRoyalty = (value: string) => {
    try {
      const result = setRoyaltyValidate.parse(value)
      setForm((prev) => ({ ...prev, royalty: value }))
    } catch (e) {
      console.log(e)
    }
  }

  const setAllocation = (value: string) => {
    try {
      const result = setAllocationValidate.parse(value)
      setForm((prev) => ({ ...prev, allocation: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const setVaultId = (value: string) => {
    try {
      const result = setVaultIdValidate.parse(value)
      setForm((prev) => ({ ...prev, vaultId: result }))
    } catch (e) {
      console.log(e)
    }
  }

  const PageZero = useMemo(() => {
    return (
      <TextContainer>
        <p>Welcome to the MiyaMints Setup wizard.</p>
        <p>
          This wizard will help you set up a collection with{' '}
          <a href="https://github.com/Zodomo/ERC721M" target="_blank" rel="noopener noreferrer">
            ERC-721M
          </a>
          .
        </p>
        <p>The software is currently undergoing development and testing.</p>
        <div
          style={{
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingLeft: '4px',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            <HighlightButton
              onClick={() => setSelectedType('standard')}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '6px 6px',
                gap: '0.75rem',
                maxWidth: '6rem',
                minWidth: '6rem',
                flex: '1 0 auto',
              }}
            >
              <img src={ComputerIcon} alt="" style={{ maxWidth: '32px', border: 'none' }} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Radio checked={selectedType === 'standard'} onChange={() => null} />
                Standard
              </div>
            </HighlightButton>
            <div>
              <b>Standard</b>
              <p style={{ marginLeft: 0 }}>A standard deploy flow, simplified for quick use</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <HighlightButton
              onClick={() => setSelectedType('advanced')}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '6px 6px',
                gap: '0.75rem',
                maxWidth: '6rem',
                minWidth: '6rem',
                flex: '1 0 auto',
              }}
            >
              <img src={GearIcon} alt="" style={{ maxWidth: '32px', border: 'none' }} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Radio checked={selectedType === 'advanced'} onChange={() => null} />
                Advanced
              </div>
            </HighlightButton>
            <div>
              <b>Advanced</b>
              <p style={{ marginLeft: 0 }}>All the choices at your disposal, custom owner, custom vaults</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <HighlightButton
              onClick={() => setSelectedType('milady')}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: '6px 6px',
                gap: '0.75rem',
                maxWidth: '6rem',
                minWidth: '6rem',
                flex: '0 0 auto',
              }}
            >
              <img src={MiladyIcon} alt="" style={{ maxWidth: '32px', border: 'none' }} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Radio checked={selectedType === 'milady'} onChange={() => null} />
                Milady
              </div>
            </HighlightButton>
            <div>
              <b>Milady</b>
              <p style={{ marginLeft: 0 }}>Milady</p>
            </div>
          </div>
        </div>
      </TextContainer>
    )
  }, [selectedType])

  const PageOne = useMemo(() => {
    return (
      <TextContainer style={{ width: '100%' }}>
        <p>Your collection basic info</p>
        <div style={{ margin: '8px' }}>
          <FormInput
            label="Name*"
            inputKey="name"
            onChange={(e) => setName(e.target.value)}
            value={form.name}
            error={errors ? errors.fieldErrors.name : undefined}
          />
          <FormInput
            label="Symbol*"
            inputKey="symbol"
            onChange={(e) => setSymbol(e.target.value)}
            value={form.symbol}
            error={errors ? errors.fieldErrors.symbol : undefined}
          />
          <FormInput
            label="Description"
            inputKey="description"
            onChange={(e) => setDescription(e.target.value)}
            value={form.description}
            error={errors ? errors.fieldErrors.description : undefined}
          />
          <FormInput
            label="Collection Image"
            inputKey="image"
            onChange={(e) => setImage(e.target.value)}
            value={form.image}
            error={errors ? errors.fieldErrors.image : undefined}
          />
          <FormInput
            label="Website"
            inputKey="externalLink"
            onChange={(e) => setExternalLink(e.target.value)}
            value={form.externalLink}
            error={errors ? errors.fieldErrors.externalLink : undefined}
          />
        </div>
      </TextContainer>
    )
  }, [errors, form.description, form.externalLink, form.image, form.name, form.symbol])

  const PageTwo = useMemo(() => {
    return (
      <TextContainer style={{ width: '100%' }}>
        <p>Technical details</p>{' '}
        <div style={{ margin: '8px' }}>
          {selectedType === 'advanced' && (
            <FormInput
              label="Owner*"
              inputKey="owner"
              onChange={(e) => setOwner(e.target.value)}
              value={form.owner}
              error={errors ? errors.fieldErrors.owner : undefined}
              helpText="NFT Contract owner, set as your connected wallet by default"
            />
          )}
          <FormInput
            label="Max Supply*"
            inputKey="maxSupply"
            onChange={(e) => setMaxSupply(e.target.value)}
            value={form.maxSupply}
            error={errors ? errors.fieldErrors.maxSupply : undefined}
          />
          <FormInput
            label="Base URI"
            inputKey="baseUri"
            onChange={(e) => setBaseURI(e.target.value)}
            value={form.baseURI}
            error={errors ? errors.fieldErrors.baseURI : undefined}
            helpText="ipfs, arweave or http link to your metadata folder. Can be changed or uploaded later."
          />
          <FormInput
            label="Royalties"
            inputKey="royalty"
            onChange={(e) => setRoyalty(e.target.value)}
            value={form.royalty}
            error={errors ? errors.fieldErrors.royalty : undefined}
            helpText="Fee percentage on secondary market sales"
          />
          <FormInput
            label="Price"
            inputKey="price"
            onChange={(e) => setTokenPrice(e.target.value)}
            value={form.tokenPrice}
            error={errors ? errors.fieldErrors.tokenPrice : undefined}
            helpText="Mint price, in Ether"
          />
        </div>
      </TextContainer>
    )
  }, [errors, form.baseURI, form.maxSupply, form.owner, form.royalty, form.tokenPrice, selectedType])

  const PageThree = useMemo(() => {
    return (
      <TextContainer style={{ width: '100%' }}>
        <p>State which collection you are making a derivative of and change your params</p>
        <div style={{ margin: '8px' }}>
          <FormInput
            label="Aligned to Collection*"
            inputKey="alignedNft"
            onChange={(e) => setAlignedNft(e.target.value)}
            disabled={selectedType === 'milady'}
            value={form.alignedNft}
            error={errors ? errors.fieldErrors.alignedNft : undefined}
            helpText="The collection you want your nft to be a derivative of"
          />
          {selectedType === 'advanced' && (
            <FormInput
              label="Vault Id*"
              inputKey="vaultId"
              onChange={(e) => setVaultId(e.target.value)}
              value={form.vaultId}
              error={errors ? errors.fieldErrors.vaultId : undefined}
              helpText="The parent collection NFTX vault, automatically populated if we find a match"
            />
          )}
          <FormInput
            label="Allocation*"
            inputKey="allocation"
            onChange={(e) => setAllocation(e.target.value)}
            value={form.allocation}
            error={errors ? errors.fieldErrors.allocation : undefined}
            helpText="The percentage of mint proceeds that will be used to buy NFTX liquidity. Minimum 5%"
          />
        </div>
      </TextContainer>
    )
  }, [errors, form.alignedNft, form.allocation, form.vaultId, selectedType])

  const PageFour = useMemo(() => {
    return (
      <TextContainer style={{ width: '100%' }}>
        <p>Summary</p>
        <p>Name: {form.name}</p>
        <p>Description: {form.description || 'Not Set'}</p>
        <p>Symbol: ${form.symbol}</p>
        <p>Image: {form.image || 'Not Set'}</p>
        <p>Website: {form.externalLink || 'Not Set'}</p>
        <p>Owner: {form.owner}</p>
        <p>Max Supply: {form.maxSupply}</p>
        <p>Base URI: {form.baseURI || 'Not Set'}</p>
        <p>Royalties: {form.royalty || '0'}%</p>
        <p>Price: {form.tokenPrice || '0'} ETH</p>
        <p>Aligned Collection: {form.alignedNft}</p>
        {selectedType === 'advanced' && <p>NFTX Vault Id: {form.vaultId}</p>}
        <p>Allocation: {form.allocation || '0'}%</p>
        {result && (
          <LinkButton target="_blank" href={`https://goerli.etherscan.io/address/${result.logs[0].address}`}>
            View contract
          </LinkButton>
        )}
      </TextContainer>
    )
  }, [form, selectedType])

  const prepare = usePrepareContractWrite({
    address: factory as Address,
    functionName: 'deploy',
    abi,
    args: validated,
  })

  const { writeAsync } = useContractWrite(prepare.config)
  const handleCreation = async () => {
    if (isConnected && isValidated && prepare.isSuccess && !!writeAsync) {
      setTransacting(true)
      setError(null)
      try {
        const res = await writeAsync()
        setTransactionHash(res.hash)
      } catch (e) {
        setTransacting(false)
      }
    }
  }

  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        fullscreen={fullscreen}
        fullscreenBtn
        onFullscreen={() => toggleFullscreen()}
        minimizeBtn
        onMinimize={(e) => {
          if (e.cancelable) e.stopPropagation()
          minimize()
        }}
      >
        {page?.label}
      </TitleBar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          gap: '1rem',
          height: 'calc(100% - 1.5rem)',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '0.5rem', flex: '1 0 auto' }}>
          <ResponsiveImage
            src={Love[0]?.src}
            alt="SchizoPoster #4760"
            width={240}
            height={360}
            style={{ maxWidth: '240px', margin: '0' }}
          />
          {index === 0 && PageZero}
          {index === 1 && PageOne}
          {index === 2 && PageTwo}
          {index === 3 && PageThree}
          {index === 4 && PageFour}
        </div>
        <Separator />
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <HighlightButton
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled={index === 0 && !!result}
              onClick={() => setIndex((prev) => prev - 1)}
            >
              <span>{'<'}</span> Prev
            </HighlightButton>
            {index !== 4 ? (
              <ConnectedButton
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                disabled={isNextDisabled}
                onClick={() => setIndex((prev) => prev + 1)}
                withChain={[mainnet.id, goerli.id]}
              >
                <span>Next</span> <span>{'>'}</span>
              </ConnectedButton>
            ) : (
              <ConnectedButton
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                disabled={!isValidated || isTransacting || !!result}
                onClick={() => handleCreation()}
                withChain={[mainnet.id, goerli.id]}
              >
                {isTransacting ? 'Deploying...' : `Deploy on ${chain?.name}`}
              </ConnectedButton>
            )}
          </div>
          <HighlightButton className="heavy" onClick={() => close()}>
            Cancel
          </HighlightButton>
        </div>
      </div>
    </WindowWrapper>
  )
}
