import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { BankType } from '../../../../../../shared/types/bank.type'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'
import Table from '../../../../../../ui/Table'
import Container from '../../../../../../ui/Container'
import { banksSelectColumns } from './utils/columnsSelect'

type BankSelectedType = {
  setGlobalBank: (bank: BankType) => void
}

const BankSelected = ({setGlobalBank}: BankSelectedType) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const onHandleClick = (bank: BankType) => {
    setGlobalBank(bank)
  }

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
              <tr
                className="styled-data-table-row"
                key={key}
                onClick={() => {
                  onHandleClick(record)
                }}
              >
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default BankSelected
