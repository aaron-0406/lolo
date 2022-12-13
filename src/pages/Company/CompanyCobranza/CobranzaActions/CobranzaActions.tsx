import styled, { css } from "styled-components";
import { device } from "../../../../shared/breakpoints/reponsive";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";
import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";

const CobranzaActions = () => {
  const greaterThanDesktopS = useMediaQuery(device.desktopS);

  return (
    <StyledContainer
      width="100%"
      height="75px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overFlowX="auto"
      gap="20px"
    >
      <Button
        width="125px"
        label={greaterThanDesktopS && "Agregar"}
        shape={greaterThanDesktopS ? "default" : "round"}
        trailingIcon="ri-add-fill"
      />
      <Button
        width="140px"
        label={greaterThanDesktopS && "Modificar"}
        shape={greaterThanDesktopS ? "default" : "round"}
        trailingIcon="ri-edit-2-line"
      />
      <Button
        width="125px"
        label={greaterThanDesktopS && "Eliminar"}
        shape={greaterThanDesktopS ? "default" : "round"}
        display="danger"
        trailingIcon="ri-close-line"
      />
      <Button
        width="100px"
        shape="round"
        display="warning"
        trailingIcon="ri-delete-bin-line"
      />
    </StyledContainer>
  );
};

export default CobranzaActions;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletL} {
      gap: 10px;
    }

    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`;
