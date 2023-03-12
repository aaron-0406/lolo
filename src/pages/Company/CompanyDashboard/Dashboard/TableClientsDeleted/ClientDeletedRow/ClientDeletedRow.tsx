import { FC } from "react";
import styled, { css } from "styled-components";
import Row from "../../../../../../ui/Table/Row";
import { ClientDeletedRowProps } from "./ClientDeletedRow.type";

const ClientDeletedRow: FC<ClientDeletedRowProps> = (props) => {
  const {
    client: { code, name },
    index,
  } = props;
  return (
    <StyledTr index={index}>
      <Row>{index + 1}</Row>
      <Row>{code}</Row>
      <Row>{name}</Row>
    </StyledTr>
  );
};

export default ClientDeletedRow;

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`;
