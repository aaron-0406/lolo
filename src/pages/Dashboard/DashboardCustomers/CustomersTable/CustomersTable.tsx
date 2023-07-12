import { Dispatch, FC, useState, useEffect } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { getCustomerAll } from '../../../../shared/services/customer.service'
import { CustomerType } from '../../../../shared/types/customer.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Tables/Table'
import { customersColumns } from './utils/columns'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'
import Button from '../../../../ui/Button'
import CustomerModal from '../CustomersModal'
import useModal from '../../../../shared/hooks/useModal'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  load: boolean
  setLoadingGlobal: (state: boolean) => void
}

const CustomersTable: FC<CustomersTableProps> = ({ opts, setOpts, load, setLoadingGlobal }) => {
  const [customers, setCustomers] = useState([])
  const [urlEdit, setUrlEdit] = useState('')
  const [customersCount, setCustomersCount] = useState<number>(0)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const handleClickButton = (url: string) => {
    setUrlEdit(url)
    showModalAdd()
  }
  const handleClickModal = () => {
    setUrlEdit('')
    hideModalAdd()
  }

  const { refetch } = useQuery(
    'get-customer-all',
    async () => {
      return await getCustomerAll()
    },
    {
      onSuccess: ({ data }) => {
        if (opts.filter !== '') {
          data = data.filter((filt: CustomerType) => {
            return filt.companyName.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
        }
        setCustomers(data)
        setCustomersCount(data.length)
        setLoadingGlobal(false)
      },
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch, load, opts])

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
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Button
                      onClick={() => {
                        handleClickButton(record.urlIdentifier)
                      }}
                      shape="round"
                      leadingIcon="ri-pencil-fill"
                    />
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>
      <CustomerModal visible={visibleModalAdd} onClose={handleClickModal} edits={{ edit: true, url: urlEdit }} />
    </Container>
  )
}

export default CustomersTable
