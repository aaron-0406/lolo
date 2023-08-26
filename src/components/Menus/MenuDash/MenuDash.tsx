import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useDashContext } from '@/contexts/DashProvider'
import paths from '../../../shared/routes/paths'
import storage from '../../../shared/utils/storage'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'
import { device } from '@/breakpoints/responsive'
import { getDashItems } from './utils/get-dash-items'

type MenuProps = {
  children: JSX.Element
}

const MenuDash: React.FC<MenuProps> = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  const {
    auth: { setAuthenticate },
    dashCustomer: {
      selectedCustomer: { urlIdentifier },
    },
    clearAll,
  } = useDashContext()

  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const items = getDashItems()

  const onClickToggle = () => {
    if (!greaterThanTabletL) {
      setToggleMenu(!toggleMenu)
    }
  }

  const logOut = () => {
    clearAll()
    storage.clear()
    setAuthenticate(false)
  }

  return (
    <StyledMenu width="100%" display="flex" flexDirection="column" position="relative">
      <Container
        className="layout__header"
        width="100%"
        height="50px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="35px"
        padding="15px"
      >
        <Container display="flex" gap="35px">
          <Icon remixClass="ri-menu-line" size={30} onClick={onClickToggle} />

          <Text.Body size="l" weight="bold" ellipsis>
            LOLO BANK
          </Text.Body>
        </Container>
        
        <Container>
          <Text.Body size="m" weight="bold" color="Success5">
            {urlIdentifier}
          </Text.Body>
        </Container>
      </Container>

      <Container width="100%" height="calc(100vh - 50px)" display="flex" flexDirection="row">
        <Container className={`layout__menu ${!greaterThanTabletL && !toggleMenu && 'hide-component'}`} width="100%">
          <ul className="nav">
            {items.map((item) => {
              if (item.admin) {
                return (
                  <Link key={item.id} to={item.path} className="nav__items" onClick={onClickToggle}>
                    <Icon remixClass={item.remixClass} />
                    <Text.Body size="m" weight="bold" color="Neutral0">
                      {item.title}
                    </Text.Body>
                  </Link>
                )
              }
              if (!item.admin) {
                return (
                  <Link key={item.id} to={item.path} className="nav__items" onClick={onClickToggle}>
                    <Icon remixClass={item.remixClass} />
                    <Text.Body size="m" weight="bold" color="Neutral0">
                      {item.title}
                    </Text.Body>
                  </Link>
                )
              }
              return <></>
            })}
            <Link to={paths.dash.login} className="nav__items" onClick={logOut}>
              <Icon remixClass="ri-logout-circle-line" />
              <Text.Body size="m" weight="bold" color="Neutral0">
                CERRAR SESIÓN
              </Text.Body>
            </Link>
          </ul>
        </Container>

        <Container
          className={`layout__content ${toggleMenu && 'hide-component'}`}
          width={!greaterThanTabletL ? '100%' : 'calc(100% - 60px)'}
          height="100%"
        >
          {children}
        </Container>
      </Container>
    </StyledMenu>
  )
}

export default MenuDash

const StyledMenu = styled(Container)`
  ${({ theme }) => css`
    .layout__header {
      box-shadow: ${theme.shadows.elevationMedium};
    }

    .layout__menu {
      transition: width 0.3s ease;
      background-color: ${theme.colors.Primary5};
      top: 50px;

      .nav {
        height: calc(100vh - 50px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style-type: none;
        color: ${theme.colors.Neutral0};

        .nav__items {
          cursor: pointer;
          width: 100%;
          height: 60px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          gap: 18px;

          :hover {
            background-color: ${theme.colors.Neutral5};
          }
        }
      }
    }

    @media ${theme.device.tabletL} {
      .layout__menu {
        width: 60px;
        position: static;

        &:hover {
          width: 200px;
        }
      }
    }
  `}
`
