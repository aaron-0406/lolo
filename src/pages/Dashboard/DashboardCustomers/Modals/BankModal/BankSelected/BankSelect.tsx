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
    'customer-has-bank-type',
    async () => {
      return await getAllCHBsByCustomerId(selectedCustomer.id)
    },
    {
      onSuccess: ({ data }) => {
        setBanks(data.map((e: response) => e.bank))
      },
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
