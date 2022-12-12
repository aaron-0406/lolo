import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import paths from "../../../shared/routes/paths";
import Container from "../../../ui/Container";
import Icon from "../../../ui/Icon";
import Text from "../../../ui/Text";

type MenuCompanyProps = {
  children: JSX.Element;
  urlIdentifier: string;
};

const MenuCompany: React.FC<MenuCompanyProps> = ({
  children,
  urlIdentifier,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const items = [
    {
      id: 1,
      title: "PERFIL",
      remixClass: "ri-user-6-fill",
      path: paths.company.perfil(urlIdentifier),
    },
    {
      id: 2,
      title: "CLIENTES",
      remixClass: "ri-group-fill",
      path: paths.company.clientes(urlIdentifier),
    },
    {
      id: 3,
      title: "COBRANZA",
      remixClass: "ri-pie-chart-2-fill",
      path: paths.company.cobranza(urlIdentifier),
    },
  ];

  const onClickToggle = () => {
    setToggleMenu(!toggleMenu);
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

        <Text.Body size="l" weight="bold">
          HIDALGO VIDAL
        </Text.Body>
      </Container>

      <Container
        width="100%"
        height="calc(100vh - 50px)"
        display="flex"
        flexDirection="row"
      >
        <Container
          className={`layout__menu ${!toggleMenu && "hide-component"}`}
          width="100%"
          height="calc(100vh - 50px)"
          position="absolute"
        >
          <ul className="nav">
            {items.map((item) => {
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
            })}
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
      background-color: ${theme.colors.Neutral6};
      top: 50px;

      .nav {
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

    @media ${theme.device.desktopS} {
      .layout__menu {
        width: 60px;
        position: static;
        z-index: 10;

        &:hover {
          width: 200px;
        }
      }
    }
  `}
`;
