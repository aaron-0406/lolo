import styled, { css } from "styled-components";
import Container from "../../../../ui/Container";
import Text from "../../../../ui/Text";

type CustomersRowProps = {
  code: string;
  name: string;
  state: string;
  createdAt?: Date;
};

const CustomersRow = (props: CustomersRowProps) => {
  const { code, name, state, createdAt } = props;

  return (
    <StyledContainer width="100%" height="60px" display="flex">
      <Container
        width="20%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {code}
      </Container>
      <Container width="30%" height="100%" display="flex" alignItems="center">
        <Text.Body size="m" weight="regular" ellipsis>
          {name}
        </Text.Body>
      </Container>
      <Container width="25%" height="100%" display="flex" alignItems="center">
        {state}
      </Container>
      <Container width="25%" height="100%" display="flex" alignItems="center">
        {String(createdAt)}
      </Container>
    </StyledContainer>
  );
};

export default CustomersRow;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-bottom: 2px solid ${theme.colors.Neutral4};
  `}
`;
