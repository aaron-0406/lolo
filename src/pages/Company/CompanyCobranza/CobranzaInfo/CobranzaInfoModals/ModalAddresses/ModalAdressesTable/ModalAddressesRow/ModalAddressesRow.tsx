import React from "react";
import { useFormContext } from "react-hook-form";
import styled, { css } from "styled-components";
import Container from "../../../../../../../../ui/Container";
import Text from "../../../../../../../../ui/Text";
import { DirectionFormType } from "../../hookforms.interfaces";

type ModalAddressesRowProps = {
  id: number;
  addressId: number;
  direction: string;
  selected?: boolean;
  onClick?: (addressId: number) => void;
};

const ModalAddressesRow: React.FC<ModalAddressesRowProps> = (props) => {
  const { setValue } = useFormContext<DirectionFormType>();

  const { id, addressId, direction, onClick, selected = false } = props;

  const onClickRow = () => {
    onClick?.(addressId);
    setValue("direction", direction);
    setValue("id", addressId);
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
          {direction}
        </Text.Body>
      </Container>
    </StyledContainer>
  );
};

export default ModalAddressesRow;

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
