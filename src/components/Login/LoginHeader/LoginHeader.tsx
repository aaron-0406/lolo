import styled, { css } from "styled-components";
import Container from "../../../ui/Container";
import Text from "../../../ui/Text";

type LoginHeaderProps = {
  title: string;
};

const LoginHeader: React.FC<LoginHeaderProps> = ({ title }) => {
  return (
    <StyledContainer
      className="login__header"
      width="100%"
      height="56px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text.Body size="l" weight="bold">
        {title}
      </Text.Body>
    </StyledContainer>
  );
};

export default LoginHeader;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-bottom: 2px solid ${theme.colors.Neutral4};
  `}
`;
