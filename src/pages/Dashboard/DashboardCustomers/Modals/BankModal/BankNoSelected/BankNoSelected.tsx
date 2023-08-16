import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { banksNoSelectColumns } from './utils/columnsNoSelect'
import { useState, useEffect } from 'react'
import Table from '../../../../../../ui/Table'
import TextField from '../../../../../../ui/fields/TextField'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import { useQuery } from 'react-query'
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
  const [banks, setBanks] = useState([])
  const [filter, setFilter] = useState('')

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  return (
    <Container width="49%">
      <Table
        top={greaterThanMobile ? '340px' : '200px'}
        columns={banksNoSelectColumns}
        loading={load}
        isArrayEmpty={!banks.length}
        emptyState={
          <EmptyStateCell colSpan={banksNoSelectColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      ></Table>
      <Container display="flex" justifyContent="space-between" gap="10px">
        <TextField onChange={onChangeSearch} width="100%" placeholder="Agregar Banco: " />
        <Button size="small" shape="round" trailingIcon="ri-add-fill"></Button>
      </Container>
    </Container>
  )
}

export default BankNoSelected
