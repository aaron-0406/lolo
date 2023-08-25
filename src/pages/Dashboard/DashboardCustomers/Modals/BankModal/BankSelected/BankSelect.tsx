import { useQuery } from 'react-query'
import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { getAllCHBsByCustomerId } from '../../../../../../shared/services/dash/customer-has-bank.service'
import { BankType } from '../../../../../../shared/types/dash/bank.type'
import { SelectedElementType } from '../bankModal.type'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/responsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'
import Table from '../../../../../../ui/Table'
import Container from '../../../../../../ui/Container'
import { banksSelectColumns } from './utils/columnsSelect'
import { KEY_DASH_CUSTOMER_BANK_CACHE } from './utils/dash-customer-banks.cache'
import { CustomerHasBankType } from '../../../../../../shared/types/dash/customer-has-bank'
import { AxiosResponse } from 'axios'
import notification from '../../../../../../ui/notification'

type BankSelectedProps = {
  setGlobalElement: (element: SelectedElementType) => void
}

const BankSelected = ({ setGlobalElement }: BankSelectedProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

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
    <Container width={greaterThanMobile ? '49%' : '100%'} height="100%">
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
            return (
              <tr
                className="styled-data-table-row"
                key={key}
                onClick={() => {
                  onHandleClick({ bank: record, key: 'SELECTED_BANK' })
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
