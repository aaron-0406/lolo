import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import Container from "../Container";

type TableProps = {
  rows: ReactNode[];
  columns: ReactNode;
  count: number;
};

const Table: React.FC<TableProps> = (props) => {
  const { columns, rows, count } = props;
  return (
    <StyledContainer width="100%" height="100%">
      <StyledTable>
        <StyledHead>{columns}</StyledHead>
        <StyledBody>{count > 0 && rows}</StyledBody>
      </StyledTable>
    </StyledContainer>
  );
};

export default Table;

const StyledContainer = styled(Container)`
  overflow-y: auto;

  ${({ theme }) => css`
    border: 2px solid ${theme.colors.Neutral4};

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.Neutral5};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.Neutral4};
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }
  `}
`;

const StyledTable = styled.table`
  ${({ theme }) => css`
    min-width: 100%;
    position: relative;
    border-radius: 10px;
    overflow-y: auto;
    border-bottom-width: 0px;
  `}
`;

const StyledHead = styled.thead`
  ${({ theme }) => css`
    width: 100%;
    position: sticky;
    top: 0;
    background-color: ${theme.colors.Primary5};
  `}
`;
const StyledBody = styled.tbody`
  ${({ theme }) => css`
    width: 100%;
  `}
`;
