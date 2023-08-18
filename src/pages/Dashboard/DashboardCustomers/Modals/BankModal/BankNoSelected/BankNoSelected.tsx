import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { banksNoSelectColumns } from './utils/columnsNoSelect'
import { useState, useEffect } from 'react'
import Table from '../../../../../../ui/Table'
import TextField from '../../../../../../ui/fields/TextField'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import dashBanksCache from './utils/dash-banks.cache'
import { getAllBanks } from '../../../../../../shared/services/bank.service'
import { useQuery, useQueryClient } from 'react-query'
import { BankType } from '../../../../../../shared/types/bank.type'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import BodyCell from '../../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../../ui/Table/EmptyStateCell'

const BankNoSelected = () => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [load, setLoad] = useState(false)
  const [banks, setBanks] = useState<Array<BankType>>([])

  const queryClient = useQueryClient()

  const {
    actions: { createBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashBanksCache(queryClient)

  const { isLoading, refetch } = useQuery(
    'KEY_DASH_BANKS_CACHE',
    async () => {
      return await getAllBanks()
    },
    {
      onSuccess: ({ data }) => {
        data = data.filter((bank: BankType) =>
          !selectedCustomer.customerBanks.some((bankSelect: BankType) => bankSelect.id === bank.id)
        )
        setBanks(data)
        createBankCache(data)
      },
      enabled: false,
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '340px' : '200px'}
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
          banks.map((record: BankType, key) => {
            return (
              <tr className="styled-data-table-row" key={key}>
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
      <Container display="flex" justifyContent="space-between" gap="10px">
        <TextField onChange={onHandleChange} width="100%" placeholder="Agregar Banco: " />
        <Button size="small" shape="round" trailingIcon="ri-add-fill"></Button>
      </Container>
    </Container>
  )
}

export default BankNoSelected
