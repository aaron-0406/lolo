import React from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Container from '@/ui/Container'
import HeaderCell from '@/ui/Table/HeaderCell'
import { SelectItem } from '@/ui/Select/interfaces'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  onChangeCheckBoxAll?: (state: boolean) => void
  loading?: boolean
  error?: boolean | undefined
  leftSpace?: number
  rightSpace?: number
  isArrayEmpty?: boolean
  isCheckboxChecked?: boolean
  emptyState?: React.ReactNode
  emptyFirstState?: React.ReactNode
  children?: React.ReactNode
}

const Table: React.FC<TableProps> = ({
  columns,
  filterOptions,
  selectedFilterOptions,
  onChangeFilterOptions,
  onChangeCheckBoxAll,
  loading,
  error,
  children,
  top,
  rightSpace,
  leftSpace,
  emptyState,
  emptyFirstState,
  isArrayEmpty = false,
  isCheckboxChecked = false,
}) => {
  const hasFilter = selectedFilterOptions?.length && selectedFilterOptions?.some((filter) => filter.options.length)
  return (
    <StyledContentTable id="main-layout-content-internal" top={top} leftSpace={leftSpace} rightSpace={rightSpace}>
      <StyledOrderTable>
        <thead className="table-header">
          <tr>
            {columns.map(({ justifyContent = 'left', textTransform, width, title, id, isThereFilter }, index) => {
              const filterOption = filterOptions?.find((option) => option.identifier === id)
              const options = filterOption?.options

              const selectedOption = selectedFilterOptions?.find((option) => option.identifier === id)
              const selectedOptions = selectedOption?.options

              return (
                <HeaderCell
                  key={index}
                  isThereFilter={isThereFilter}
                  width={loading ? '' : width}
                  justifyContent={justifyContent}
                  textTransform={textTransform}
                  options={options}
                  selectedOptions={selectedOptions}
                  onChangeCheckBoxAll={onChangeCheckBoxAll}
                  onChangeFilterOptions={(options) => onChangeFilterOptions?.({ identifier: id, options })}
                >
                  {title}
                </HeaderCell>
              )
            })}
          </tr>
        </thead>
        <tbody className="table-body">
          {!!loading
            ? columns.map((_, index) => (
                <tr key={index}>
                  {columns.map((column, index) => (
                    <td key={index}>
                      <Container width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                        <Skeleton
                          width={
                            column.width ? parseInt(column.width.replace('%', '')) * (window.innerWidth / 100) : 170
                          }
                          height={40}
                          className="skeleton"
                          baseColor="#f0f0f0"
                          highlightColor="#e6e6e6"
                        />
                      </Container>
                    </td>
                  ))}
                </tr>
              ))
            : null}
          {!error && !loading && children}

          {!!isCheckboxChecked ? (
            <tr>
              <td></td>
            </tr>
          ) : null}
          {!!error && !loading && (
            <tr className="row-error">
              <td colSpan={columns.length}>
                <>Error</>
              </td>
            </tr>
          )}
          {hasFilter && isArrayEmpty && !loading ? emptyState : null}
          {!hasFilter && isArrayEmpty && !loading ? emptyFirstState : null}
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

    .active {
      background: ${theme.colors['Neutral2']};
    }

    .skeleton {
      gap: 10px;
    }
    .table-body {
      width: 100%;
      height: 100%;
    }
  `}
`

const StyledContentTable = styled(Container)<{ top?: string; leftSpace?: number; rightSpace?: number }>`
  ${({ top, leftSpace, rightSpace }) => css`
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    height: ${top ? `calc(100vh - ${top})` : '100%'};

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
