import React from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Container from '../../Container'
import HeaderCell from './HeaderCell'

export type ColumProps = {
  id: string
  title: string
  width?: string
  textAlign?: CSS.Property.TextAlign
  textTransform?: CSS.Property.TextTransform
}

type TableProps = {
  top?: string
  columns: Array<ColumProps>
  loading?: boolean
  error?: boolean | undefined
  leftSpace?: number
  rightSpace?: number
  isArrayEmpty?: boolean
  emptyState?: React.ReactNode
  children?: React.ReactNode
}

const Table: React.FC<TableProps> = ({
  columns,
  loading,
  error,
  children,
  top,
  rightSpace,
  leftSpace,
  emptyState,
  isArrayEmpty = false,
}) => {
  return (
    <StyledContentTable id="main-layout-content-internal" top={top} leftSpace={leftSpace} rightSpace={rightSpace}>
      <StyledOrderTable>
        <thead className="table-header">
          <tr>
            {columns.map(({ textAlign = 'left', textTransform, width, title }, index) => {
              return (
                <HeaderCell key={index} width={width} textAlign={textAlign} textTransform={textTransform}>
                  {title}
                </HeaderCell>
              )
            })}
          </tr>
        </thead>

        <tbody className="table-body">
          {!!loading && (
            <tr>
              <td colSpan={columns.length}>
                <>Loading skeleton</>
              </td>
            </tr>
          )}
          {!error && !loading && children}
          {!!error && !loading && (
            <tr className="row-error">
              <td colSpan={columns.length}>
                {/* <RetryPage error={error} reload={errorRefetch} fullScreen /> */}
                <>Error</>
              </td>
            </tr>
          )}
          {isArrayEmpty && !loading && emptyState}
        </tbody>
      </StyledOrderTable>
    </StyledContentTable>
  )
}

export default Table

const StyledOrderTable = styled.table`
  ${({ theme }) => css`
    width: 100%;
    table-layout: auto;

    th,
    td {
      height: 56px;
      padding-left: 16px;
      padding-right: 16px;
      cursor: pointer;
    }

    thead {
      border-bottom: 1px solid ${theme.colors['Neutral3']};
    }

    th {
      position: sticky;
      top: 0;
      z-index: 2;
      background: ${theme.colors['Neutral2']};
    }

    tr:not([role='row-error']):not([role='row-empty']):hover {
      background: ${theme.colors['Neutral1']};
    }
  `}
`

const StyledContentTable = styled(Container)<{ top?: string; leftSpace?: number; rightSpace?: number }>`
  ${({ top, leftSpace, rightSpace }) => css`
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    height: ${top ? `calc(100vh - ${top})` : '0'};

    th:last-child,
    td:last-child {
      padding-right: ${rightSpace ?? 16}px;
    }

    th:first-child,
    td:first-child {
      padding-left: ${leftSpace ?? 16}px;
    }
  `}
`
