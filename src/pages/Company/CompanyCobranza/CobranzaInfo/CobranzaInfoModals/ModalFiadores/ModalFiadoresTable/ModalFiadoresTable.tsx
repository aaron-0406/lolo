import styled, { css } from "styled-components";
import Container from "../../../../../../../ui/Container";
import ModalFiadoresRow from "./ModalFiadoresRow";

const ModalFiadoresTable = () => {
  return (
    <StyledContainer width="100%" height="calc(100% - 350px)">
      <ModalFiadoresRow id={1} code="123" name={"Aaron Paredes Cabrera"} />
    </StyledContainer>
  );
};

export default ModalFiadoresTable;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 2px solid ${theme.colors.Neutral4};
  `}
`;
