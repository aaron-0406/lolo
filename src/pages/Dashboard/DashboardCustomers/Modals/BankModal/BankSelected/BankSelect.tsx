import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { banksSelectColumns } from './utils/columnsSelect'
import { useState, useEffect } from 'react'
import Table from '../../../../../../ui/Table'
import Container from '../../../../../../ui/Container'
import { getCHBById } from '../../../../../../shared/services/dash/customer-has-bank.service'
import { useQuery } from 'react-query'
import { CustomerHasBankType } from '../../../../../../shared/types/dash/customer-has-bank'
import { BankType } from '../../../../../../shared/types/dash/bank.type'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'

const BankSelected = () => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [load, setLoad] = useState(false)

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '340px' : '200px'}
        columns={banksSelectColumns}
        loading={load}
        isArrayEmpty={!selectedCustomer.customerBanks.length}
        emptyState={
          <EmptyStateCell colSpan={banksSelectColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!selectedCustomer.customerBanks?.length &&
          selectedCustomer.customerBanks.map((record: BankType, key) => {
            return (
              <tr className="styled-data-table-row" key={key}>
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default BankSelected
