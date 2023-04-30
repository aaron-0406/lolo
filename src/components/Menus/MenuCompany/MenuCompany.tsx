import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../../../shared/breakpoints/reponsive";
import { useLoloContext } from "../../../shared/contexts/LoloProvider";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";
import paths from "../../../shared/routes/paths";
import { getAllCities } from "../../../shared/services/city.service";
import { getAllUsersByID } from "../../../shared/services/customer-user.service";
import storage from "../../../shared/utils/storage";
import Container from "../../../ui/Container";
import Icon from "../../../ui/Icon";
import Text from "../../../ui/Text";
import { getMenuItems } from "./utils/get-menu-items";
type MenuCompanyProps = {
  children: JSX.Element;
  urlIdentifier: string;
};

const MenuCompany: React.FC<MenuCompanyProps> = ({
  children,
  urlIdentifier,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const {
    client: { customer },
    city: { setCities },
    user: { setUsers },
    customerUser: { user },
    auth: { setAuthenticate },
  } = useLoloContext();

  const greaterThanTabletL = useMediaQuery(device.tabletL);
  const items = getMenuItems(urlIdentifier);

  const onClickToggle = () => {
    if (!greaterThanTabletL) {
      setToggleMenu(!toggleMenu);
    }
  };

  const { isLoading: isLoadingCities } = useQuery(
    "query-get-all-cities",
    async () => {
      return await getAllCities();
    },
    {
      onSuccess: (response) => {
        setCities(response.data);
      },
    }
  );

  const { isLoading: isLoadingUsers } = useQuery(
    "query-get-all-users-by-id",
    async () => {
      return await getAllUsersByID(customer.id);
    },
    {
      onSuccess: (response) => {
        setUsers(response.data);
      },
    }
  );

  if (isLoadingCities || isLoadingUsers) {
    return <div>Loading</div>;
  }

  // Log Out
  const logOut = () => {
    storage.clear();
    setAuthenticate(false);
  };

  return (
    <StyledMenu
      width="100%"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <Container
        className="layout__header"
        width="100%"
        height="50px"
        display="flex"
        alignItems="center"
        gap="35px"
        padding="15px"
      >
        <Icon remixClass="ri-menu-line" size={30} onClick={onClickToggle} />

        <Text.Body size="l" weight="bold" ellipsis>
          {customer.companyName}
        </Text.Body>
      </Container>

      <Container
        width="100%"
        height="calc(100vh - 50px)"
        display="flex"
        flexDirection="row"
      >
        <Container
          className={`layout__menu ${
            !greaterThanTabletL && !toggleMenu && "hide-component"
          }`}
          width="100%"
        >
          <ul className="nav">
            {items.map((item) => {
              if (user.privilege === "EDITOR" && item.admin) {
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="nav__items"
                    onClick={onClickToggle}
                  >
                    <Icon remixClass={item.remixClass} />
                    <Text.Body size="m" weight="bold" color="Neutral0">
                      {item.title}
                    </Text.Body>
                  </Link>
                );
              }
              if (!item.admin) {
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="nav__items"
                    onClick={onClickToggle}
                  >
                    <Icon remixClass={item.remixClass} />
                    <Text.Body size="m" weight="bold" color="Neutral0">
                      {item.title}
                    </Text.Body>
                  </Link>
                );
              }
              return <></>;
            })}
            <Link
              to={paths.company.login(urlIdentifier)}
              className="nav__items"
              onClick={logOut}
            >
              <Icon remixClass="ri-logout-circle-line" />
              <Text.Body size="m" weight="bold" color="Neutral0">
                CERRAR SESIÓN
              </Text.Body>
            </Link>
          </ul>
        </Container>

        <Container
          className={`layout__content ${toggleMenu && "hide-component"}`}
          width="100%"
          height="100%"
        >
          {children}
        </Container>
      </Container>
    </StyledMenu>
  );
};

export default MenuCompany;

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
`;
