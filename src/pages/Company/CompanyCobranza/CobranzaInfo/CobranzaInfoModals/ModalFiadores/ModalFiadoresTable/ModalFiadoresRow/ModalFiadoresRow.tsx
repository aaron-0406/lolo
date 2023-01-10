import styled, { css } from "styled-components";
import Container from "../../../../../../../../ui/Container";
import Text from "../../../../../../../../ui/Text";

type ModalFiadoresRowProps = {
  id: number;
  code: string;
  name: string;
  onClick?: (code: string) => void;
};

const ModalFiadoresRow = (props: ModalFiadoresRowProps) => {
  const { id, code, name, onClick } = props;

  const onClickRow = () => {
    onClick?.(code);
  };

  return (
    <StyledContainer
      width="100%"
      height="60px"
      display="flex"
      onClick={onClickRow}
    >
      <Container
        width="20%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {id}
      </Container>
      <Container width="80%" height="100%" display="flex" alignItems="center">
        <Text.Body size="m" weight="regular" ellipsis>
          {name}
        </Text.Body>
      </Container>
    </StyledContainer>
  );
};

export default ModalFiadoresRow;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.Neutral4};

    &:hover {
      background-color: ${theme.colors.Neutral3};
    }
  `}
`;
