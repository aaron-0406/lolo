import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { banksSelectColumns } from './utils/columnsSelect'
import Table from '../../../../../../ui/Table'
import Container from '../../../../../../ui/Container'
import { BankType } from '../../../../../../shared/types/bank.type'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'

const BankSelected = () => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '230px' : '200px'}
        columns={banksSelectColumns}
        loading={false}
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
