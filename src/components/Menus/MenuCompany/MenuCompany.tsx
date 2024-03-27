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
import { AxiosResponse } from 'axios'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import { KEY_COBRANZA_URL_TAG_CODE_CACHE } from '@/pages/extrajudicial/ExtrajudicialTags/TagsTable/utils/company-tags.cache'
import { getExtTagGroupsByCHB } from '@/services/extrajudicial/ext-tag-group.service'
import notification from '@/ui/notification'

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
  const filtereditems =
    user.permissions?.filter((permission) => permission.link !== '#' && permission.code.length === 3) ?? []
  const items = filtereditems.map((item) => {
    return {
      ...item,
      link: item.link.replace(':urlIdentifier', urlIdentifier),
    }
  })

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

  useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [`${KEY_COBRANZA_URL_TAG_CODE_CACHE}-TAG-GROUP-BY-CHB`],
    async () => {
      return await getExtTagGroupsByCHB(parseInt(selectedBank.idCHB.length ? selectedBank.idCHB : '0'))
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

  useEffect(() => {
    setIsLoadingCities(true)
    setIsLoadingUsers(true)

    refetchCities()
    refetchUsers()
    // eslint-disable-next-line

    return () => {
      if (titleElement) {
        titleElement.textContent = 'Lolo Bank'
      }
    }
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
        <Container width="100%" display="flex" gap="35px">
          <Icon remixClass="ri-menu-line" size={30} onClick={onClickToggle} />

          <Text.Body size="l" weight="bold" ellipsis>
            {customer.companyName}
          </Text.Body>
        </Container>

        <Text.Body className="layout__header-selected-bank" size="m" weight="bold" color="Success5">
          {customer.customerBanks[Number(selectedBank?.idBank) - 1]?.name ?? ''}
        </Text.Body>
      </Container>

      <Container width="100%" height="calc(100vh - 50px)" display="flex" flexDirection="row">
        <Container className={`layout__menu ${!greaterThanTabletL && !toggleMenu && 'hide-component'}`} width="100%">
          <ul className="nav">
            {items.map((item, key) => {
              return (
                <Link key={key} to={item.link} className="nav__items" onClick={onClickToggle}>
                  <Container display="flex" gap="22px">
                    <Icon remixClass={item.icon} size={20} color="Neutral3" />
                    <Text.Body size="m" weight="bold" color="Neutral0">
                      {item.name}
                    </Text.Body>
                  </Container>
                </Link>
              )
            })}
            <Link to={paths.company.login(urlIdentifier)} className="nav__items" onClick={logOut}>
              <Icon remixClass="ri-logout-circle-line" color="Neutral3" />
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

    .layout__header-selected-bank {
      display: none;
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

      .layout__header-selected-bank {
        display: block;
      }
    }
  `}
`
