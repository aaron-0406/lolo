import styled, { css } from "styled-components";
import Container from "../../Container";

type ModalFooterProps = {
  children?: React.ReactNode | boolean;
};

const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  const { children = false } = props;

  if (typeof children === "boolean" && children === false) {
    return null;
  }

  return (
    <>
      <StyledContainerFooter
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="16px"
        height="80px"
        width="100%"
      >
        {children}
      </StyledContainerFooter>
    </>
  );
};

export default ModalFooter;

const StyledContainerFooter = styled(Container)`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors["Neutral4"]};
  `}
`;
