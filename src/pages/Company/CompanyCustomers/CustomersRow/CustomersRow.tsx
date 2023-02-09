import moment from "moment";
import styled, { css } from "styled-components";
import { device } from "../../../../shared/breakpoints/reponsive";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";
import Container from "../../../../ui/Container";
import Text from "../../../../ui/Text";

type CustomersRowProps = {
  code: string;
  name: string;
  negotiationName: string;
  negotiationId: number;
  createdAt?: Date;
  onClick?: (code: string) => void;
};

const CustomersRow = (props: CustomersRowProps) => {
  const { code, name, negotiationName, createdAt, onClick } = props;

  const isGreaterThanTableL = useMediaQuery(device.tabletL);

  const onClickRow = () => {
    onClick?.(code);
  };

  return (
    <StyledContainer
      width="100%"
      height="60px"
      display="flex"
      onClick={onClickRow}
      gap="10px"
    >
      <Container
        width="25%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {code}
      </Container>
      <Container
        width={!isGreaterThanTableL ? "50%" : "40%"}
        height="100%"
        display="flex"
        alignItems="center"
      >
        <Text.Body size="m" weight="regular" ellipsis>
          {name}
        </Text.Body>
      </Container>
      <Container width="25%" height="100%" display="flex" alignItems="center">
        {negotiationName}
      </Container>

      {isGreaterThanTableL && (
        <Container width="10%" height="100%" display="flex" alignItems="center">
          {moment(createdAt).format("DD-MM-YYYY")}
        </Container>
      )}
    </StyledContainer>
  );
};

export default CustomersRow;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.Neutral4};

    &:hover {
      background-color: ${theme.colors.Neutral2};
    }
  `}
`;
