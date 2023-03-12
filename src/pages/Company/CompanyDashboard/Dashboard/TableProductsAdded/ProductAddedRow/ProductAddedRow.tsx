import { FC } from "react";
import styled, { css } from "styled-components";
import Row from "../../../../../../ui/Table/Row";
import { ProductAddedRowProps } from "./ProductAddedRow.type";

const ProductAddedRow: FC<ProductAddedRowProps> = (props) => {
  const {
    product: { code, clientCode, clientName },
    index,
  } = props;
  return (
    <StyledTr index={index}>
      <Row>{index + 1}</Row>
      <Row>{clientCode}</Row>
      <Row>{code}</Row>
      <Row>{clientName}</Row>
    </StyledTr>
  );
};

export default ProductAddedRow;

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`;
