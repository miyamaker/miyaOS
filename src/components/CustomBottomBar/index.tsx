import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Paper from '../TaskBar/MenuComponents/book.png'
// Import your icons/images here
import Tree from '../TaskBar/MenuComponents/discord.png'
import Setting from '../TaskBar/MenuComponents/settings.png'
import Shutdown from '../TaskBar/MenuComponents/shutdown.png'
import { StartMenuListItem } from '../TaskBar/MenuComponents/startMenuListItem'

interface CustomBottomBarProps {
  setSelected: (selected: string) => void
  bottomBarVisible: boolean
}

const ParentContainer = styled.div`
  /* Add any additional styling for the parent container */
  margin-top: 137px; /* Adjust the margin-top value as needed */
`

const BottomBarMenuStyled = styled.div`
  /* Customize the styling for the menu items */
  background-color: #adaac9;
  width: 20%; /* Adjust as needed */
  border-bottom: 2px solid #555;
  border-right: 3px solid #090808;
`

const CustomBottomBar: React.FC<CustomBottomBarProps> = ({ setSelected, bottomBarVisible }) => {
  const [showSide, setShowSide] = useState(false)

  const settingsSubMenu = (
    <div>
      {/* Additional menu items for the "Settings" sub-menu */}
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
    { menu: 'farm', icon: Tree, name: '<u>D</u>iscord' },
    { menu: 'paper', icon: Paper, name: '<u>D</u>ocs' },
    {
      menu: 'cp',
      icon: Setting,
      name: '<u>S</u>ettings',
      haveSub: true,
      subMenu: settingsSubMenu,
    },
    { menu: 'shutdown', icon: Shutdown, name: '<u>C</u>onnect Wallet' },
  ]

  if (!bottomBarVisible) {
    return null // Hide the component if bottomBarVisible is false
  }

  return (
    <ParentContainer>
      <BottomBarMenuStyled>
        {menuItems.map((item, index) => (
          <StartMenuListItem
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
