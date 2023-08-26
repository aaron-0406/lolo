import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { device } from '@/breakpoints/responsive'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import paths from '../../../shared/routes/paths'
import { getAllCities } from '@/services/dash/city.service'
import { getAllUsersByID } from '@/services/dash/customer-user.service'
import storage from '../../../shared/utils/storage'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'
import { getMenuItems } from './utils/get-menu-items'

type MenuCompanyProps = {
  children: JSX.Element
  urlIdentifier: string
}

const MenuCompany: React.FC<MenuCompanyProps> = ({ children, urlIdentifier }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  const {
    client: { customer },
    city: { setCities },
    user: { setUsers },
    customerUser: { user },
    auth: { setAuthenticate },
    clearAll,
    bank: { selectedBank },
  } = useLoloContext()

  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const items = getMenuItems(urlIdentifier)

  const onClickToggle = () => {
    if (!greaterThanTabletL) {
      setToggleMenu(!toggleMenu)
    }
  }

  // Log Out
  const logOut = () => {
    clearAll()
    storage.clear()
    setAuthenticate(false)
  }

  const { refetch: refetchCities } = useQuery(
    'query-get-all-cities',
    async () => {
      return await getAllCities()
    },
    {
      enabled: false,
      onSuccess: (response) => {
        setCities(response.data)
        setIsLoadingCities(false)
      },
      onError: () => {
        setIsLoadingCities(false)
      },
    }
  )

  const { refetch: refetchUsers } = useQuery(
    'query-get-all-users-by-id',
    async () => {
      return await getAllUsersByID(customer.id)
    },
    {
      enabled: false,
      onSuccess: (response) => {
        setUsers(response.data)
        setIsLoadingUsers(false)
      },
      onError: () => {
        setIsLoadingUsers(false)
      },
    }
  )

  useEffect(() => {
    setIsLoadingCities(true)
    setIsLoadingUsers(true)

    refetchCities()
    refetchUsers()
    // eslint-disable-next-line
  }, [])

  if (isLoadingCities || isLoadingUsers) {
    return <div>Loading</div>
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
            {customer.companyName}
          </Text.Body>
        </Container>

        <Container margin="20px">
          <Text.Body size="m" weight="bold" color="Success5">
            {customer.customerBanks[Number(selectedBank?.idBank) - 1]?.name || ''}
          </Text.Body>
        </Container>
      </Container>

      <Container width="100%" height="calc(100vh - 50px)" display="flex" flexDirection="row">
        <Container className={`layout__menu ${!greaterThanTabletL && !toggleMenu && 'hide-component'}`} width="100%">
          <ul className="nav">
            {items.map((item) => {
              if (user.privilege === 'EDITOR' && item.admin) {
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
              return <div key={item.id}></div>
            })}
            <Link to={paths.company.login(urlIdentifier)} className="nav__items" onClick={logOut}>
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

export default MenuCompany

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
