import MiyaLogo from 'assets/134321870.png?preset=icon&resize=true'
import MintIcon from 'assets/create_new.png?preset=icon&resize=true'
import ExecutableIcon from 'assets/executable.png?preset=icon&resize=true'
import GearIcon from 'assets/executable_gear.png?preset=icon&resize=true'

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
    label: 'MiyaNet Explorer',
    icon: MiyaLogo[0],
    minSize: {
      width: 800,
      height: 720,
    },
  },
  mint: {
    id: 'mint',
    path: '/mint',
    label: 'MiyaMints Setup Wizard',
    icon: MintIcon[0],
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
  swap: {
    id: 'swap',
    path: '/swap',
    label: 'MiyaSwaps Marketplace',
    icon: MintIcon[0],
    minSize: {
      width: 600,
      height: 475,
    },
  },
}

export default Pages
