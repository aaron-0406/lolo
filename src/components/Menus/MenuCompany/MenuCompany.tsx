import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
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
import { AxiosResponse } from 'axios'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { KEY_COBRANZA_URL_TAG_CODE_CACHE } from '@/pages/extrajudicial/ExtrajudicialTags/TagsTable/utils/company-tags.cache'
import { getExtTagGroupsByCHB } from '@/services/extrajudicial/ext-tag-group.service'
import notification from '@/ui/notification'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import MenuCompanyDropdown from './MenuCompanyDropdown'

type MenuCompanyProps = {
  children: JSX.Element
  urlIdentifier: string
}

const MenuCompany: React.FC<MenuCompanyProps> = ({ children, urlIdentifier }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [targetNavItem, setTargetNavItem] = useState<string>('')

  const location = useLocation()

  const {
    client: { customer },
    city: { setCities },
    user: { setUsers },
    customerUser: { user },
    auth: { setAuthenticate },
    clearAll,
    bank: { selectedBank },
  } = useLoloContext()

  const { clearAllFilters } = useFiltersContext()

  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const filtereditems = user.permissions?.filter((permission) => permission.code.length === 3) ?? []
  const items = filtereditems.map((item) => {
    return {
      ...item,
      link: item.link.replace(':urlIdentifier', urlIdentifier),
    }
  })

  const onSelectTargetNavItem = (id: string) => {
    setTargetNavItem(id)
    !greaterThanTabletL && setToggleMenu(!toggleMenu)
  }

  const onClickToggle = () => {
    !greaterThanTabletL && setToggleMenu(!toggleMenu)
  }

  // Log Out
  const logOut = () => {
    clearAll()
    storage.clear()
    setAuthenticate(false)
    clearAllFilters()
  }

  const { refetch: refetchCities } = useQuery(
    'query-get-all-cities',
    async () => {
      return await getAllCities(Number(customer.id))
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

  useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}-TAG-GROUP-WITH-ORDER`],
    async () => {
      return await getExtTagGroupsByCHB()
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const titleElement = document.getElementById('root-title')
  if (titleElement) {
    titleElement.textContent = customer.companyName ? `${customer.companyName} - Lolo Bank` : 'Lolo Bank'
  }

  const getBankName = () => {
    return (
      customer.customerBanks.find((customerBank) => {
        return customerBank.id == parseInt(selectedBank?.idBank)
      })?.name ?? ''
    )
  }

  useEffect(() => {
    setIsLoadingCities(true)
    setIsLoadingUsers(true)

    refetchCities()
    refetchUsers()

    const currentPermissionID = items.find((item) => item.link === location.pathname)?.id
    setTargetNavItem(currentPermissionID ?? '')
    // eslint-disable-next-line

    return () => {
      if (titleElement) {
        titleElement.textContent = 'Lolo Bank'
      }
    }
  }, [])

  useEffect(() => {
    if (greaterThanTabletL) {
      setToggleMenu(false)
    }
  }, [greaterThanTabletL])

  if (isLoadingCities || isLoadingUsers) {
    return <div>Loading</div>
  }

  return (
    <StyledMenu className={`hide-conponent`}>
      <Container className={`layout__main`}>
        <Container className={`layout__menu ${!greaterThanTabletL && !toggleMenu && 'layout__menu--close'}`}>
          <ul className="nav">
            {items.map((item, key) => (
              <Container key={key}>
                {!item.idPermissionMain && !item.isDropdown ? (
                  <Link
                    key={key}
                    to={item.link}
                    className={`nav__items ${targetNavItem === item.id ? ' nav__items--selected' : ''}`}
                    onClick={() => onSelectTargetNavItem(item.id)}
                  >
                    <Container display="flex" gap="22px">
                      <Icon remixClass={item.icon} size={18} color="Neutral3" />
                      <Text.Body size="m" weight="bold" color="Neutral0">
                        {item.name[0].toUpperCase() + item.name.slice(1).toLowerCase()}
                      </Text.Body>
                    </Container>
                  </Link>
                ) : null}
                {item.idPermissionMain && item.isDropdown ? (
                  <MenuCompanyDropdown
                    key={key}
                    permission={item}
                    permissions={items}
                    onSelectTargetNavItem={onSelectTargetNavItem}
                    targetNavItem={targetNavItem}
                  />
                ) : null}
              </Container>
            ))}
          </ul>
          <Link to={paths.company.login(urlIdentifier)} className="" onClick={logOut}>
            <Container
              display="flex"
              flexDirection="row"
              gap="22px"
              alignItems="start"
              justifyContent="start"
              minHeight={greaterThanTabletL ? '50px' : '100px'}
              padding="10px 15px 0px 15px"
            >
              <Icon remixClass="ri-logout-circle-line" color="Neutral3" />
              <Text.Body size="m" weight="bold" color="Neutral0">
                Cerrar Sesión
              </Text.Body>
            </Container>
          </Link>
        </Container>

        <Container
          id="LayoutContent"
          className={`layout__content ${!greaterThanTabletL && toggleMenu ? 'hide-component' : ''}`}
          width={!greaterThanTabletL ? '100%' : '100vw'}
        >
          <Container className="layout__content-header" gap={!greaterThanTabletL ? '20px' : '0px'}>
            <Text.Body size="l" weight="bold" color="Primary5" ellipsis={!greaterThanTabletL}>
              {customer.companyName}
            </Text.Body>
            {getBankName() ? (
              <Container className="layout__content-header-selected-bank">
                <Text.Body
                  size={!greaterThanTabletL ? 's' : 'm'}
                  weight="bold"
                  color="Neutral0"
                  ellipsis={!greaterThanTabletL}
                >
                  {getBankName()}
                </Text.Body>
              </Container>
            ) : null}

            {!greaterThanTabletL && !toggleMenu ? (
              <Icon remixClass="ri-menu-line" color="Primary5" size={24} onClick={onClickToggle} />
            ) : null}

            {!greaterThanTabletL && toggleMenu ? (
              <Icon remixClass="ri-close-line" color="Primary5" size={24} onClick={onClickToggle} />
            ) : null}
          </Container>

          {children}
        </Container>
      </Container>
    </StyledMenu>
  )
}

export default MenuCompany

const StyledMenu = styled(Container)`
  ${({ theme }) => css`
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    
  .layout__main{
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    }

    .layout__menu {
      background-color: ${theme.colors.Primary6};
      z-index: 10;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100vw;
      position: fixed;
      top: 50px;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      transform: translateX(0); 

      &.layout__menu--close {
        transform: translateX(-100%);
      }

        .nav {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          flex: 1;
          flex-direction: column;
          list-style-type: none;
          color: ${theme.colors.Neutral0};
  
          .nav__items {
            cursor: pointer;
            width: 100%;
            min-height: 50px;
            padding: 0 18px;
            display: flex;
            align-items: center;
            gap: 18px;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 15ms;
            :hover {
              background-color: ${theme.colors.Primary3};
            }
            &.nav__items--selected{
              background-color: ${theme.colors.Primary3};
            }
          }
        }
      }
      .layout__content{
        display: flex;
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;
        overflow-y: auto;
        max-height: 100dvb;
        background-color: ${theme.colors.Neutral0};
        color: ${theme.colors.Primary5};
        &.hide-component{
      overflow-y: hidden;
      max-height: 100vh;
      
    }

        .layout__content-header{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px 8px 20px;
          min-height: 50px;
          max-height: 50px;
          box-shadow: ${theme.shadows.elevationLow};

            .layout__content-header-selected-bank{
              border-radius: 8px;
              background-color: ${theme.colors.Primary5};
              display: flex;
              padding: 5px 10px 5px 10px;
              flex-direction: column;
              justify-content: center;
            }
        }
      }
        
    }


    @media ${theme.device.tabletL} {
      .layout__menu {
        width: 60px;
        top: 0;
        position: relative;
        max-height: 100vh;
        width: 220px;
        max-width: 220px;
        transform: translateX(0%);

        .nav{
          height: auto;
        }

        &:hover {
        }
      }

      .layout__header-selected-bank {
        display: block;
      }
    }
  `}
`
