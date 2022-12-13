import styled, { css } from "styled-components";
import { device } from "../../../shared/breakpoints/reponsive";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";
import Container from "../../../ui/Container";

type LayoutCobranzaProps = {
  leftHeader: React.ReactNode;
  leftActions: React.ReactNode;
  leftContent: React.ReactNode;
  rightComments: React.ReactNode;
};

const LayoutCobranza: React.FC<LayoutCobranzaProps> = (props) => {
  const { leftHeader, leftActions, leftContent, rightComments } = props;

  const greaterThanTabletL = useMediaQuery(device.tabletL);

  return (
    <StyledContainer
      width="100%"
      height="100%"
      padding="15px"
      display="flex"
      gap="30px"
    >
      <Container
        className="container__left"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        {leftHeader}

        {leftActions}

        {leftContent}
      </Container>

      <Container
        width="300px"
        className={`container__right ${
          !greaterThanTabletL && "hide-component"
        }`}
        backgroundColor="#eff0f6ff"
        padding="20px"
      >
        {rightComments}
      </Container>
    </StyledContainer>
  );
};

export default LayoutCobranza;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    .container__right {
      border-radius: 8px;
      border: 1px solid ${theme.colors.Neutral4};
    }

    @media ${theme.device.tabletS} {
      padding: 30px;
    }

    @media ${theme.device.tabletL} {
      .container__left {
        width: calc(100% - 300px);
      }
    }

    @media ${theme.device.desktopS} {
      .container__left {
        width: calc(100% - 400px);
      }

      .container__right {
        width: 400px;
      }
    }
  `}
`;
