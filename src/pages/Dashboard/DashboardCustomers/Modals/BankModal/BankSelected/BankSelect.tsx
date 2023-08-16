import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { banksSelectColumns } from './utils/columnsSelect'
import { useState, useEffect } from 'react'
import Table from '../../../../../../ui/Table'
import Container from '../../../../../../ui/Container'
import { useQuery } from 'react-query'
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
  const [banks, setBanks] = useState([])

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '340px' : '200px'}
        columns={banksSelectColumns}
        loading={load}
        isArrayEmpty={!banks.length}
        emptyState={
          <EmptyStateCell colSpan={banksSelectColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      ></Table>
    </Container>
  )
}

export default BankSelected
