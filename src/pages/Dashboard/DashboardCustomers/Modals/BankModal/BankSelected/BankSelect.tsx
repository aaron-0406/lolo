import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { useState, useEffect } from 'react'
import { getAllCHBsByCustomerId } from '../../../../../../shared/services/dash/customer-has-bank.service'
import { useQuery } from 'react-query'
import { BankType } from '../../../../../../shared/types/dash/bank.type'
import elementSelect from '../elementSelect'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'
import Table from '../../../../../../ui/Table'
import Container from '../../../../../../ui/Container'
import { banksSelectColumns } from './utils/columnsSelect'
import { KEY_DASH_CUSTOMER_BANK_CACHE } from './utils/dash-customer-banks.cache'

type BankSelectedType = {
  setGlobalElement: (element: elementSelect) => void
}

type response = {
  id: number
  idCustomer: number
  idBank: number
  bank: BankType
}

const BankSelected = ({ setGlobalElement }: BankSelectedType) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const [banks, setBanks] = useState<Array<BankType>>(selectedCustomer.customerBanks)

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const { isLoading, refetch } = useQuery(
    KEY_DASH_CUSTOMER_BANK_CACHE,
    async () => {
      return await getAllCHBsByCustomerId(selectedCustomer.id)
    },
    {
      onSuccess: ({ data }) => {
        data = data.map((e: response) => {
          return {
            id: e.bank.id,
            name: e.bank.name,
            description: e.bank.description,
            state: e.bank.state,
            createdAt: e.bank.createdAt,
            CUSTOMER_HAS_BANK: { id: e.id, idCustomer: e.idCustomer, idBank: e.idBank },
          }
        })
        setBanks(data)
      },
      enabled: false,
    }
  )

  const onHandleClick = (element: elementSelect) => {
    setGlobalElement(element)
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '230px' : '200px'}
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
                  onHandleClick({ bank: record, key: 'BS' })
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
