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
import CustomerModal from '../Modals/CustomersModal'
import useModal from '../../../../shared/hooks/useModal'
import UsersModal from '../Modals/UsersModal/UsersModal'
import { useDashContext } from '../../../../shared/contexts/DashProvider'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  loading: boolean
  setLoadingGlobal: (state: boolean) => void
}

const CustomersTable: FC<CustomersTableProps> = ({ opts, setOpts, loading, setLoadingGlobal }) => {
  const {
    dashCustomer: { setSelectedCustomer },
  } = useDashContext()

  const [customers, setCustomers] = useState([])
  const [urlEdit, setUrlEdit] = useState('')
  const [customersCount, setCustomersCount] = useState<number>(0)
  const [idCustomer, setIdCustomer] = useState(0)

  const { visible: visibleModalCustomer, showModal: showModalCustomer, hideModal: hideModalCustomer } = useModal()
  const { visible: visibleModalUser, showModal: showModalUser, hideModal: hideModalUser } = useModal()

  const handleClickButtonClient = (url: string) => {
    setUrlEdit(url)
    showModalCustomer()
  }

  const handleClickButtonCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer)
  }

  const onCloseModal = () => {
    setUrlEdit('')
    hideModalCustomer()
  }

  const handleClickButtonUser = (id: number) => {
    setIdCustomer(id)
    showModalUser()
  }

  const onCloseUser = () => {
    setIdCustomer(0)
    hideModalUser()
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
      enabled: false,
    }
  )

  useEffect(() => {
    if (loading) refetch()
  }, [refetch, loading, opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={customersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={customersColumns}
        loading={loading}
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
              <tr
                className="styled-data-table-row"
                key={record.id}
                onClick={() => {
                  handleClickButtonCustomer(record)
                }}
              >
                <BodyCell textAlign="center">{`${record.ruc || ''}`}</BodyCell>
                <BodyCell>{`${record.companyName || ''}`}</BodyCell>
                <BodyCell>{`${record.urlIdentifier || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display='flex' justifyContent='space-between'>
                      <Button
                      onClick={(event) => {
                        event.stopPropagation()
                        handleClickButtonClient(record.urlIdentifier)
                      }}
                      shape="round"
                      size="small"
                      leadingIcon="ri-pencil-fill"
                    />
                    <Button
                      onClick={(event) => {
                      }}
                      shape="round"
                      size="small"
                      leadingIcon={record.state ? "ri-shield-user-fill" : "ri-shield-user-line"}
                    />
                    </Container>
                  }
                </BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Button
                      onClick={(event) => {
                        event.stopPropagation()
                        handleClickButtonUser(record.id)
                      }}
                      shape="round"
                      size="small"
                      leadingIcon="ri-user-search-fill"
                    />
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CustomerModal
        visible={visibleModalCustomer}
        onClose={onCloseModal}
        setLoadingGlobal={setLoadingGlobal}
        url={urlEdit}
        isEdit
      />
      <UsersModal visible={visibleModalUser} onClose={onCloseUser} id={idCustomer} />
    </Container>
  )
}

export default CustomersTable
