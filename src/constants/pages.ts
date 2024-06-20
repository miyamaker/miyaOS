import MiyaLogo from 'assets/134321870.png?preset=icon&resize=true'
import ExecutableIcon from 'assets/create_new.png?preset=icon&resize=true'
import GearIcon from 'assets/executable_gear.png?preset=icon&resize=true'
import FolderOpen from 'assets/folder_open.png?preset=thumbnail&resize=true'
import AuctionIcon from 'assets/icon/auction.png?preset=icon&resize=true'
import MintIcon from 'assets/launchpad_logo.png?preset=icon&resize=true'
import ManageIcon from 'assets/miya_website_logo_2-removebg-preview.png?preset=icon&resize=true'
import LaunchIcon from 'assets/miyamints1.png?preset=icon&resize=true'

export type Page = {
  id: string
  path: string
  label: string
  icon: ResizedImage | undefined
  minSize: {
    width: number
    height: number
  }
}

const Pages: Record<string, Page> = {
  home: {
    id: 'home',
    path: '/about',
    label: 'Net Explorer',
    icon: MiyaLogo[0],
    minSize: {
      width: 800,
      height: 720,
    },
  },
  mint: {
    id: 'mint',
    path: '/mint',
    label: 'Mint',
    icon: MintIcon[0],
    minSize: {
      width: 800,
      height: 720,
    },
  },
  myCollections: {
    id: 'myCollections',
    path: '/my-collections',
    label: 'My Collections',
    icon: FolderOpen[0],
    minSize: {
      width: 800,
      height: 720,
    },
  },
  launch: {
    id: 'launch',
    path: '/launch',
    label: 'Launch',
    icon: LaunchIcon[0],
    minSize: {
      width: 600,
      height: 575,
    },
  },
  components: {
    id: 'components',
    path: '/components',
    label: 'ComponentZ',
    icon: GearIcon[0],
    minSize: {
      width: 600,
      height: 475,
    },
  },
  uploader: {
    id: 'uploader',
    path: '/upload',
    label: 'Infinite Upload',
    icon: ExecutableIcon[0],
    minSize: {
      width: 600,
      height: 475,
    },
  },
  manager: {
    id: 'manager',
    path: '/manage',
    label: 'Manager',
    icon: ManageIcon[0],
    minSize: {
      width: 600,
      height: 475,
    },
  },
  auction: {
    id: 'auction',
    path: '/auction',
    label: 'Auction',
    icon: AuctionIcon[0],
    minSize: {
      width: 800,
      height: 720,
    },
  },
}

export default Pages
