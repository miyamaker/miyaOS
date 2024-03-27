import { useState } from 'react'
import { MdArrowRight } from 'react-icons/md'
import styled from 'styled-components/macro'

// Define interface for props
interface IStartMenuListItemProps {
  haveSub: boolean | undefined
  onSelected: (selected: string) => void
  onShowSide: (showSide: boolean) => void
  icon: any
  name: string
  menu: string
  subMenu?: React.ReactNode // Allow subMenu to be optional
}

// Include the Google Font VT323 using createGlobalStyle

// Define styled components
const StartMenuListItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-family: 'font-windows';
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  position: relative; /* Added position relative */

  &:hover {
    background-color: #39327a;
    border: none; /* Add this line to remove the border on hover */
    color: white;
  }
`

const MenuItemText = styled.div`
  font-size: 22px;
  margin-left: 16px; /* Adjust margin as needed */
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 39px;
  height: 39px;

  img {
    border: none; /* Remove the border */
  }

  &:hover {
    img {
      border: none; /* Remove the border on hover */
    }
  }
`

const ArrowContainer = styled.div`
  margin-left: auto; /* Move to the right end */
  transform: scale(3); /* Adjust the scale as needed */
  margin-top: 6px;
`

const SubMenuContainer = styled.div<{ show?: boolean }>`
  position: absolute;
  top: 0;
  left: 100%; /* Position to the right of the menu item */
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: #adaac9;
  color: black;
  /* Additional styling for the submenu */
`

// Export the functional component
export const StartMenuListItem = ({
  haveSub,
  onSelected,
  onShowSide,
  icon,
  name,
  menu,
  subMenu,
}: IStartMenuListItemProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false)

  return (
    <>
      <StartMenuListItemContainer
        onMouseEnter={() => {
          if (haveSub) {
            setShowSubMenu(true)
            onShowSide(true)
          }
        }}
        onMouseLeave={() => {
          if (haveSub) {
            setShowSubMenu(false)
            onShowSide(false)
          }
        }}
        onClick={() => {
          if (!haveSub) {
            onSelected(menu)
          }
        }}
      >
        <IconContainer>
          <img src={icon} alt="icon" />
        </IconContainer>
        <MenuItemText>
          <span dangerouslySetInnerHTML={{ __html: name }}></span>
        </MenuItemText>
        <ArrowContainer>{haveSub && <MdArrowRight className="text-black" />}</ArrowContainer>
        <SubMenuContainer show={showSubMenu}>{subMenu}</SubMenuContainer>
      </StartMenuListItemContainer>
    </>
  )
}
