import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Paper from '../TaskBar/MenuComponents/book.png'
import Tree from '../TaskBar/MenuComponents/discord.png'
import Setting from '../TaskBar/MenuComponents/settings.png'
import Shutdown from '../TaskBar/MenuComponents/shutdown.png'
import { StartMenuListItem } from '../TaskBar/MenuComponents/startMenuListItem'

interface CustomBottomBarProps {
  setSelected: (selected: string) => void
  bottomBarVisible: boolean
}

const ParentContainer = styled.div`
  margin-top: 137px;
`

const BottomBarMenuStyled = styled.div`
  background-color: #adaac9;
  width: 20%;
  border-bottom: 2px solid #555;
  border-right: 3px solid #090808;
`

const CustomBottomBar: React.FC<CustomBottomBarProps> = ({ setSelected, bottomBarVisible }) => {
  const [showSide, setShowSide] = useState(false)

  const settingsSubMenu = (
    <div>
      <StartMenuListItem
        haveSub={false}
        onSelected={(selected) => setSelected(selected)}
        onShowSide={(showSide) => setShowSide(showSide)}
        icon={Setting}
        name="<u>C</u>ollections"
        menu="submenu"
      />
      {/* Add more sub-menu items as needed */}
    </div>
  )

  const menuItems = [
    { id: '1', menu: 'farm', icon: Tree, name: '<u>D</u>iscord' },
    { id: '2', menu: 'paper', icon: Paper, name: '<u>D</u>ocs' },
    {
      id: '3',
      menu: 'cp',
      icon: Setting,
      name: '<u>A</u>pplications',
      haveSub: true,
      subMenu: settingsSubMenu,
    },
    { id: '4', menu: 'shutdown', icon: Shutdown, name: '<u>C</u>onnect Wallet' },
  ]

  if (!bottomBarVisible) {
    return null // Hide the component if bottomBarVisible is false
  }

  return (
    <ParentContainer>
      <BottomBarMenuStyled>
        {menuItems.map((item) => (
          <StartMenuListItem
            key={item.id}
            haveSub={item.haveSub}
            onSelected={(selected) => setSelected(selected)}
            onShowSide={(showSide) => setShowSide(showSide)}
            icon={item.icon}
            name={item.name}
            menu={item.menu}
            subMenu={item.subMenu}
          />
        ))}
      </BottomBarMenuStyled>
    </ParentContainer>
  )
}

export default CustomBottomBar
