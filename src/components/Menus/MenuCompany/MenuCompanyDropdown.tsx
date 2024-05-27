import Container from "@/ui/Container"
import { useEffect, useState } from "react"
import Icon from "@/ui/Icon"
import Text from "@/ui/Text"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

type Props = {
  permission: {
    id:string
    code: string
    link: string
    name: string
    icon: string
    idPermissionMain: string
    isDropdown: boolean
  }
  permissions: Array<{
    id:string
    code: string
    link: string
    name: string
    icon: string
    idPermissionMain: string
    isDropdown: boolean
  }>
  onSelectTargetNavItem: (id: string) => void
  targetNavItem:string
}
const MenuCompanyDropdown = ({ permission, permissions, onSelectTargetNavItem, targetNavItem }: Props) => {
  const childrens = permissions.filter((item) => item.idPermissionMain === permission.id)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onToggle = () => setIsOpen(!isOpen)

  useEffect(()=>{
    const isChildSelected = childrens.some((item) => item.id === targetNavItem)
    if(isChildSelected){
      setIsOpen(true)
    }
  },[])
  return (
    <StyledDropdown width="100%" display="flex" flexDirection="column">
      <Container className="dropdown__header">
        <Container className="dropdown__toggle" onClick={onToggle}>
          <Text.Body size="m" weight="bold" color="Neutral0" ellipsis>
            {permission.name[0].toUpperCase() + permission.name.slice(1).toLowerCase()}
          </Text.Body>
          <Icon
            remixClass="ri-arrow-down-s-line"
            color="Neutral0"
            className={
              'dropdown__toggle-icon ' + (isOpen ? 'dropdown__toggle-icon--open' : 'dropdown__toggle-icon--close')
            }
          />
        </Container>
      </Container>
      {isOpen ? (
        <Container className="dropdown__content" flexDirection="column">
          {childrens.map((item, key) => (
            <Link
              className={`dropdown__item-link ${targetNavItem === item.id ? 'dropdown__item--selected' : ''}`}
              key={key}
              to={item.link}
              onClick={() => onSelectTargetNavItem(item.id)}
            >
              <Container display="flex" gap="22px" padding="0px 15px 0px 15px" className="nav__items" height="50px">
                <Icon remixClass={item.icon} size={20} color="Neutral0" />
                <Text.Body size="s" weight="bold" color="Neutral0">
                  {item.name[0].toUpperCase() + item.name.slice(1).toLowerCase()}
                </Text.Body>
              </Container>
            </Link>
          ))}
        </Container>
      ) : null}
    </StyledDropdown>
  )
}

const StyledDropdown = styled(Container)`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;

    .dropdown__header {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 35px;
      padding: 0px 15px 0px 15px;
      cursor: pointer;

      .dropdown__toggle {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 35px;

        .dropdown__toggle-icon {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        .dropdown__toggle-icon--close {
          rotate: -90deg;
        }
        .dropdown__toggle-icon--open {
          rotate: 0deg;
        }
      }
    }
    .dropdown__content {
      padding: 0px 0px 0px 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .dropdown__item-link {
        width: 100%;
        display: flex;
        padding: 0px 15px 0px 15px;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: ${theme.colors.Primary3};
        }
        &.dropdown__item--selected{
              background-color: ${theme.colors.Primary3};
    }
      }
    }
  `}
`

export default MenuCompanyDropdown