import { FC } from "react";
import styled, { css } from "styled-components";
import Row from "../../../../../../ui/Table/Row";
import { ProductCastigoRowProps } from "./ProductCastigoRow.type";

const ProductCastigoRow: FC<ProductCastigoRowProps> = (props) => {
  const {
    product: { code, clientCode, state,name },
    index,
  } = props;
  return (
    <StyledTr index={index}>
      <Row>{index + 1}</Row>
      <Row>{clientCode}</Row>
      <Row>{code}</Row>
      <Row>{name}</Row>
      <Row>{state} {"> CASTIGO"}</Row>
    </StyledTr>
  );
};

export default ProductCastigoRow;

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`;
