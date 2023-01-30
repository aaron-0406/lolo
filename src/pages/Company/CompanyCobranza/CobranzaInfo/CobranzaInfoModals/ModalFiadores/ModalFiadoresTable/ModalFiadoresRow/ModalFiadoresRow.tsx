import { useFormContext } from "react-hook-form";
import styled, { css } from "styled-components";
import Container from "../../../../../../../../ui/Container";
import Text from "../../../../../../../../ui/Text";
import { GuarantorFormType } from "../../hookforms.interfaces";

type ModalFiadoresRowProps = {
  id: number;
  guarantorId: number;
  name: string;
  email?: string;
  phone?: string;
  selected?: boolean;
  onClick?: (guarantorId: number) => void;
};

const ModalFiadoresRow = (props: ModalFiadoresRowProps) => {
  const { setValue } = useFormContext<GuarantorFormType>();

  const {
    id,
    guarantorId,
    name,
    email,
    phone,
    onClick,
    selected = false,
  } = props;

  const onClickRow = () => {
    onClick?.(guarantorId);
    setValue("name", name);
    setValue("phone", phone === null ? "" : phone);
    setValue("email", email === null ? "" : email);
    setValue("id", guarantorId);
  };

  return (
    <StyledContainer
      $selected={selected}
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

const StyledContainer = styled(Container)<{ $selected: boolean }>`
  ${({ theme, $selected }) => css`
    cursor: pointer;
    border-bottom: 2px solid ${theme.colors.Neutral4};
    background-color: ${$selected ? theme.colors.Neutral3 : "#fff"};
    &:hover {
      background-color: ${theme.colors.Neutral3};
    }
  `}
`;
