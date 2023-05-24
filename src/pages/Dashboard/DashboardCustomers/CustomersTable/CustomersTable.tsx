import { Dispatch, FC, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useLoloContext } from '../../../../shared/contexts/LoloProvider'
import paths from '../../../../shared/routes/paths'
import { getCustomerAll } from '../../../../shared/services/customer.service'
import { CustomerType } from '../../../../shared/types/customer.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Tables/Table'
import { customersColumns } from './utils/columns'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  load: boolean
}

const CustomersTable: FC<CustomersTableProps> = ({ opts, setOpts, load }) => {
  const [customers, setCustomers] = useState([])
  const [customersCount, setCustomersCount] = useState<number>(0)

  useEffect(() => {
    let data = getCustomerAll()
    if (opts.filter === '') {
      data.then((responso) => {
        setCustomers(responso.data)
        setCustomersCount(responso.data.length)
      })
    } else {
      data.then((responso) => {
        let arr = responso.data.filter((a: CustomerType) => {
          let cadena = a.companyName.substring(0, opts.filter.length)
          return cadena === opts.filter
        })
        setCustomers(arr)
        setCustomersCount(arr.length)
      })
    }
  }, [opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={customersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={customersColumns}
        loading={load}
        isArrayEmpty={!customers.length}
        emptyState={
          <EmptyStateCell colSpan={customersColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!customers?.length &&
          customers.map((record: CustomerType) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${record.ruc || ''}`}</BodyCell>
                <BodyCell>{`${record.companyName || ''}`}</BodyCell>
                <BodyCell>{`${record.urlIdentifier || ''}`}</BodyCell>
                <BodyCell>{`${record.description || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default CustomersTable
