/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
import { createContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { goerli } from 'viem/chains'
import type { Address } from 'wagmi'
import { mainnet, useAccount, useContractRead, useWaitForTransaction } from 'wagmi'

import { ConnectedButton, HighlightButton } from '@/components/Button'
import FormInput from '@/components/FormInput'
import { Separator } from '@/components/Separator'
import Tabs from '@/components/Tabs'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { updateManagedCollection } from '@/store/experience/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'

import AllocationRow from './TableRows/AllocationRow'
import BaseUriRow from './TableRows/BaseUriRow'
import MaxSupplyRow from './TableRows/MaxSupplyRow'
import NameRow from './TableRows/NameRow'
import PriceRow from './TableRows/PriceRow'
import ReferralRow from './TableRows/ReferralRow'
import { useAlignedNft } from './useAlignedNft'
import { useBaseUri } from './useBaseUri'
import { useContractUri } from './useContractUri'
import { useMintOpen } from './useMintOpen'
import { useSymbol } from './useSymbol'

const ManageContext = createContext<{ collection: Address | undefined; errors: Record<string, unknown> }>({
  collection: undefined,
  errors: {},
})

const page = Pages.manager

const SunkenPanel = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 2px groove transparent;
  border-image: svg-load('./icon/sunken-panel-border.svg') 2;
  overflow: auto;
  background-color: #fff;

  table {
    border-collapse: collapse;
    position: relative;
    text-align: left;
    white-space: nowrap;
    background-color: #fff;
  }

  table > thead > tr > * {
    position: sticky;
    top: 0;
    height: 20px;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
    background: #9991c7;
    font-weight: 900;
    box-sizing: border-box;
    font-weight: normal;
    padding: 0 6px;
  }

  table.interactive > tbody > tr {
    cursor: pointer;
  }

  table > tbody > tr.highlighted {
    color: #fff;
    background-color: #000080;
  }

  table > tbody > tr > * {
    padding: 0 6px;
    height: 21px;
  }
`

export default function ManagePage() {
  // Network
  const [params, setParams] = useSearchParams()
  const [contextState, setContextState] = useState({
    collection: (params.get('collection') as Address | null) || undefined,
    errors: {},
  })

  const dispatch = useAppDispatch()
  const collection = useAppSelector((state) => state.experience.managedCollection)

  const [tab, setTab] = useState('metadata')

  useEffect(() => {
    const paramsCollection = params.get('collection')
    if (paramsCollection) dispatch(updateManagedCollection({ value: paramsCollection as Address }))
  }, [params])

  // Account
  const { isConnected, address } = useAccount()

  // Window mgmt
  const [fullscreen, toggleFullscreen] = useFullscreen('manager')
  const close = () => {
    dispatch(closeWindow({ value: 'manager' }))
    dispatch(updateManagedCollection({ value: undefined }))
  }

  const minimize = () => dispatch(minimizeWindow({ value: 'manager' }))

  const alignedNft = useAlignedNft({ address: collection })
  const symbol = useSymbol({ address: collection })
  const { uriLocked, lockUri, refetch: refetchUriLocked } = useBaseUri({ address: collection })
  const { mintOpen, openMint, refetch: refetchMintOpen } = useMintOpen({ address: collection })

  const is721m = useMemo(() => {
    // check if it's a collection from factory
    return !!alignedNft
  }, [alignedNft])

  const { data: owner, refetch: refetchOwner } = useContractRead({
    functionName: 'owner',
    address: collection,
    abi: [
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: 'result', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    enabled: !!(collection && is721m),
  })

  const isOwner = useMemo(() => {
    refetchOwner()
    return owner === address
  }, [address, owner, refetchOwner])

  const metadata = useContractUri({
    address: collection,
  })

  const [openInput, setOpenInput] = useState('')

  const PropertyTab = useMemo(() => {
    if (!collection) return <></>
    return (
      <div>
        <SunkenPanel>
          <table className="interactive" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <NameRow
                collection={collection}
                active={openInput === 'realName'}
                onActive={() => setOpenInput('realName')}
              />
              <tr>
                <td>Symbol</td>
                <td>{symbol}</td>
                <td style={{ padding: 0 }}>
                  <ConnectedButton
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                    disabled={true}
                    onClick={() => null}
                  >
                    Locked
                  </ConnectedButton>
                </td>
              </tr>
              <tr>
                <td>Parent</td>
                <td>{alignedNft}</td>
                <td style={{ padding: 0 }}>
                  <ConnectedButton
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                    disabled={true}
                    onClick={() => null}
                  >
                    Locked
                  </ConnectedButton>
                </td>
              </tr>
              <BaseUriRow
                collection={collection}
                active={openInput === 'baseUri'}
                onActive={() => setOpenInput('baseUri')}
              />
              <MaxSupplyRow
                collection={collection}
                active={openInput === 'maxSupply'}
                onActive={() => setOpenInput('maxSupply')}
              />
              <AllocationRow
                collection={collection}
                active={openInput === 'allocation'}
                onActive={() => setOpenInput('allocation')}
              />
              <PriceRow collection={collection} active={openInput === 'price'} onActive={() => setOpenInput('price')} />
              <ReferralRow
                collection={collection}
                active={openInput === 'referral'}
                onActive={() => setOpenInput('referral')}
              />
            </tbody>
          </table>
        </SunkenPanel>
      </div>
    )
  }, [alignedNft, collection, openInput, symbol])

  const [transacting, setTransacting] = useState('')
  const [txHash, setTxHash] = useState('')

  useWaitForTransaction({
    hash: (txHash as Address) || '0x',
    enabled: !!txHash,
    onSuccess: () => {
      if (transacting === 'lockUri') {
        refetchUriLocked()
      }

      if (transacting === 'openMint') {
        refetchMintOpen()
      }

      setTransacting('')
      setTxHash('')
    },
    onReplaced: () => {
      setTransacting('')
      setTxHash('')
    },
  })

  const handleLockUri = async () => {
    if (uriLocked) return
    setTransacting('lockUri')
    try {
      const res = await lockUri()
      setTxHash(res.hash)
    } catch (e) {
      setTransacting('')
    }
  }

  const handleOpenMint = async () => {
    if (mintOpen) return
    setTransacting('openMint')
    try {
      const res = await openMint()
      setTxHash(res.hash)
    } catch (e) {
      setTransacting('')
    }
  }

  const ActionTab = useMemo(() => {
    if (!collection) return <></>
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <b>Warning: The following actions are permanent!</b>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Lock Base URI</label>
          <ConnectedButton
            style={{
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            disabled={!!transacting || uriLocked}
            onClick={() => handleLockUri()}
            withChain={[mainnet.id, goerli.id]}
          >
            {transacting === 'lockUri' ? 'Updating...' : uriLocked ? 'Locked' : 'Lock'}
          </ConnectedButton>
          <small>Locks the current images to the nfts permanently.</small>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Open mint</label>
          <ConnectedButton
            style={{
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            disabled={!!transacting || mintOpen}
            onClick={() => handleOpenMint()}
            withChain={[mainnet.id, goerli.id]}
          >
            {transacting === 'openMint' ? 'Updating...' : mintOpen ? 'Already open' : 'Open'}
          </ConnectedButton>
          <small>Starts minting phase.</small>
        </div>
      </div>
    )
  }, [collection, mintOpen, transacting, uriLocked])

  const [form, setForm] = useState<{
    name: string
    description: string
    image: string
    external_link: string
    collaborators: Address[]
  }>({
    name: metadata.name,
    description: metadata.description,
    image: metadata.image,
    external_link: metadata.external_link,
    collaborators: metadata.collaborators,
  })

  const handleInputName = (input: string) => {
    setForm((prev) => ({ ...prev, name: input }))
  }

  const handleInputDescription = (input: string) => {
    setForm((prev) => ({ ...prev, description: input }))
  }

  const handleInputImage = (input: string) => {
    setForm((prev) => ({ ...prev, image: input }))
  }

  const handleInputExternalLink = (input: string) => {
    setForm((prev) => ({ ...prev, external_link: input }))
  }

  const handleUpdateMetadata = async () => {
    setTransacting('metadata')
    try {
      const contractURI = `data:application/json;utf8,${JSON.stringify(form)}`

      const result = await metadata.setContractUri(contractURI)
      setTxHash(result.hash)
    } catch (e) {
      setTransacting('')
    }
  }

  const MetadataTab = useMemo(() => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '240px' }}>
        <FormInput
          label="Name"
          inputKey="name"
          value={form.name}
          onChange={(e) => handleInputName(e.target.value)}
          error={undefined}
        />

        <FormInput
          label="Description"
          inputKey="description"
          value={form.description}
          onChange={(e) => handleInputDescription(e.target.value)}
          error={undefined}
        />

        <FormInput
          label="Image"
          inputKey="image"
          value={form.image}
          onChange={(e) => handleInputImage(e.target.value)}
          error={undefined}
        />

        <FormInput
          label="External Link"
          inputKey="externalLink"
          value={form.external_link}
          onChange={(e) => handleInputExternalLink(e.target.value)}
          error={undefined}
        />

        <ConnectedButton
          style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          disabled={!!transacting}
          onClick={() => handleUpdateMetadata()}
          withChain={[mainnet.id, goerli.id]}
        >
          {transacting === 'metadata' ? 'Updating...' : 'Update'}
        </ConnectedButton>
      </div>
    )
  }, [form.description, form.external_link, form.image, form.name, transacting])

  const [collectionInput, setCollectionInput] = useState('')

  const handleManageCollection = () => {
    dispatch(updateManagedCollection({ value: collectionInput as Address }))
    setParams((prev) => ({ ...prev, collection: collectionInput }))
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
        {collection && isOwner && is721m ? (
          <ManageContext.Provider value={contextState}>
            <div style={{ display: 'flex', marginBottom: '0.5rem', flex: '1 0 auto' }}>
              <Tabs
                active={tab}
                fillHeight
                fillWidth
                tabs={[
                  {
                    title: 'Metadata',
                    id: 'metadata',
                    children: MetadataTab,
                  },
                  {
                    title: 'Properties',
                    id: 'properties',
                    children: PropertyTab,
                  },
                  {
                    title: 'Actions',
                    id: 'advanced',
                    children: ActionTab,
                  },
                ]}
                onChange={(t) => setTab(t)}
              />
            </div>
            <Separator />
            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '2rem' }}>
              <HighlightButton className="heavy" onClick={() => close()}>
                Cancel
              </HighlightButton>
            </div>
          </ManageContext.Provider>
        ) : collection ? (
          <div style={{ textAlign: 'center' }}>
            <p>No collection to manage.</p>
            <b>Why are you seeing this message?</b>
            <p>You might have input the wrong address.</p>
            <p>You might be on the wrong chain.</p>
            <p>You might not be the owner of this collection.</p>
          </div>
        ) : (
          <div>
            <p>No collection selected</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '0 8px' }}>
              <FormInput
                label="Collection"
                inputKey="collection"
                value={collectionInput}
                onChange={(e) => setCollectionInput(e.target.value)}
                error={undefined}
              />
              <HighlightButton
                style={{ height: 'fit-content', marginTop: '-4px' }}
                onClick={() => handleManageCollection()}
              >
                Manage
              </HighlightButton>
            </div>
          </div>
        )}
      </div>
    </WindowWrapper>
  )
}
