import { useQuery, useQueryClient } from 'react-query'
import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { banksNoSelectColumns } from './utils/columnsNoSelect'
import { useState, useEffect } from 'react'
import Table from '../../../../../../ui/Table'
import TextField from '../../../../../../ui/fields/TextField'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import { KEY_DASH_BANKS_CACHE } from './utils/dash-banks.cache'
import { getAllBanks } from '../../../../../../shared/services/dash/bank.service'
import { BankType } from '../../../../../../shared/types/dash/bank.type'
import elementSelect from '../elementSelect'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'
import dashCustomerBankCache from '../BankSelected/utils/dash-customer-banks.cache'

type BankNoSelectedType = {
  setGlobalElement: (element: elementSelect) => void
}

const BankNoSelected = ({ setGlobalElement }: BankNoSelectedType) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()

  const {
    data: dataCHB,
  } = dashCustomerBankCache(queryClient)

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [banks, setBanks] = useState<Array<BankType>>(selectedCustomer.customerBanks)

  const { isLoading, refetch } = useQuery(
    [KEY_DASH_BANKS_CACHE],
    async () => {
      return await getAllBanks()
    },
    {
      onSuccess: (data) => {
        console.log(data, "2")
          setBanks(data?.data.filter((bank: BankType) => !dataCHB?.data.some((cb) => cb.idBank === bank.id)) ?? [])
      },
      enabled: false,
    }
  )

  console.log(dataCHB?.data, "1")

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const onHandleClick = (element: elementSelect) => {
    setGlobalElement(element)
  }

  useEffect(() => {
    if(dataCHB?.data){
      refetch()
    }
  }, [refetch, dataCHB?.data])

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '280px' : '200px'}
        columns={banksNoSelectColumns}
        loading={isLoading}
        isArrayEmpty={!banks.length}
        emptyState={
          <EmptyStateCell colSpan={banksNoSelectColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!banks.length &&
          banks.map((record: BankType, key: number) => {
            return (
              <tr
                className="styled-data-table-row"
                key={key}
                onClick={() => {
                  onHandleClick({ bank: record, key: 'BNS' })
                }}
              >
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
      <Container display="flex" justifyContent="space-between" padding="10px">
        <TextField onChange={onHandleChange} width="100%" placeholder="Agregar Banco: " />
        <Button size="small" shape="round" trailingIcon="ri-add-fill"></Button>
      </Container>
    </Container>
  )
}

export default BankNoSelected
