import React from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Container from '../Container'
import HeaderCell from './HeaderCell'
import { SelectItem } from '../Select/interfaces'

export type ColumProps = {
  id: string
  title: React.ReactNode
  width?: string
  justifyContent?: CSS.Property.JustifyContent
  textTransform?: CSS.Property.TextTransform
  isThereFilter?: boolean
}

export type FilterOptionsProps = {
  identifier: string
  options: Array<SelectItem<any, any>>
}

type TableProps = {
  top?: string
  columns: Array<ColumProps>
  filterOptions?: Array<FilterOptionsProps>
  selectedFilterOptions?: Array<FilterOptionsProps>
  onChangeFilterOptions?: (filterOption: FilterOptionsProps) => void
  loading?: boolean
  error?: boolean | undefined
  leftSpace?: number
  rightSpace?: number
  isArrayEmpty?: boolean
  emptyState?: React.ReactNode
  children?: React.ReactNode
  resetFilters?: boolean
}

const Table: React.FC<TableProps> = ({
  columns,
  filterOptions,
  onChangeFilterOptions,
  loading,
  error,
  children,
  top,
  rightSpace,
  leftSpace,
  emptyState,
  isArrayEmpty = false,
  resetFilters,
}) => {
  return (
    <StyledContentTable id="main-layout-content-internal" top={top} leftSpace={leftSpace} rightSpace={rightSpace}>
      <StyledOrderTable>
        <thead className="table-header">
          <tr>
            {columns.map(({ justifyContent = 'left', textTransform, width, title, id, isThereFilter }, index) => {
              const filterOption = filterOptions?.find((option) => option.identifier === id)
              const options = filterOption?.options

              return (
                <HeaderCell
                  key={index}
                  isThereFilter={isThereFilter}
                  width={width}
                  justifyContent={justifyContent}
                  textTransform={textTransform}
                  options={options}
                  onChangeFilterOptions={(options) => onChangeFilterOptions?.({ identifier: id, options })}
                  resetFilters={resetFilters}
                >
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

    td {
      padding-left: 16px;
      padding-right: 16px;
      height: 56px;
      cursor: pointer;
    }

    thead {
      border-bottom: 1px solid ${theme.colors['Neutral3']};
    }

    th {
      height: 56px;
      cursor: pointer;
      position: sticky;
      top: 0;
      z-index: 2;
      background: ${theme.colors['Neutral3']};
    }

    tr:not([role='row-error']):not([role='row-empty']):hover {
      background: ${theme.colors['Neutral2']};
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
