import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import type CSS from 'csstype'
import styled, { css } from 'styled-components'
import { useDashContext } from '@/contexts/DashProvider'
import { getAllCHBsByCustomerId } from '@/services/dash/customer-has-bank.service'
import { BankType } from '@/types/dash/bank.type'
import { SelectedElementType } from '../bankModal.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ClickOutSideComponent from '@/hooks/useClickOutside'
import { device } from '@/breakpoints/responsive'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import Table from '@/ui/Table'
import { banksSelectColumns } from './utils/columnsSelect'
import { KEY_DASH_CUSTOMER_BANK_CACHE } from './utils/dash-customer-banks.cache'
import { CustomerHasBankType } from '@/types/dash/customer-has-bank'
import notification from '@/ui/notification'

type BankSelectedProps = {
  setGlobalElement: (element: SelectedElementType) => void
}

const BankSelected = ({ setGlobalElement }: BankSelectedProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [rowKey, setRowKey] =  useState<number>(0)

  const { data, isLoading } = useQuery<AxiosResponse<Array<CustomerHasBankType & { bank: BankType }>, Error>>(
    [KEY_DASH_CUSTOMER_BANK_CACHE, selectedCustomer.id],
    async () => {
      return await getAllCHBsByCustomerId(selectedCustomer.id)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const banks =
    data?.data.map((e: CustomerHasBankType & { bank: BankType }) => {
      return {
        id: e.bank.id,
        name: e.bank.name,
        description: e.bank.description,
        state: e.bank.state,
        createdAt: e.bank.createdAt,
        CUSTOMER_HAS_BANK: { id: e.id, idCustomer: e.idCustomer, idBank: e.idBank },
      }
    }) ?? []

  const onHandleClick = (element: SelectedElementType) => {
    setGlobalElement(element)
  }

  return (
    <StyledContainer callback={() => {setRowKey(0)}} width={greaterThanMobile ? '49%' : '100%'} height="100%">
      <Table
        columns={banksSelectColumns}
        loading={isLoading}
        isArrayEmpty={!banks.length}
        emptyState={
          <EmptyStateCell colSpan={banksSelectColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!banks?.length &&
          banks.map((record: BankType, key) => {
            const className = rowKey === key + 1 && "active"
            return (
              <tr
              className= {`styled-data-table-row ${className}`}
                key={key}
                onClick={() => {
                  setRowKey(key + 1)
                  onHandleClick({ bank: record, key: 'SELECTED_BANK' })
                }}
              >
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </StyledContainer>
  )
}

export default BankSelected

const StyledContainer = styled(ClickOutSideComponent)<{ width?: CSS.Property.Width, height?: CSS.Property.Height }>`
  ${({ width, height }) => css`
    width: ${!!width ? width : 'auto'};
    height: ${!!height ? height : 'auto'};
  `}
`