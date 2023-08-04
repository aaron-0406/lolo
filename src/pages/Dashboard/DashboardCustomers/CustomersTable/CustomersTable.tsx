import { Dispatch, FC, useState, useEffect } from 'react'
import moment from 'moment'
import { useMutation, useQuery } from 'react-query'
import { getCustomerAll, updateStateCustomer } from '../../../../shared/services/customer.service'
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
import notification from '../../../../ui/notification'

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
  const [stateCustomer, setStateCustomer] = useState(true)

  const { visible: visibleModalCustomer, showModal: showModalCustomer, hideModal: hideModalCustomer } = useModal()
  const { visible: visibleModalUser, showModal: showModalUser, hideModal: hideModalUser } = useModal()

  const handleClickButtonEdit = (url: string) => {
    setUrlEdit(url)
    showModalCustomer()
  }

  const handleClickButtonCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer)
  }

  const handleClickButtonUser = (customer: CustomerType) => {
    setSelectedCustomer(customer)
    showModalUser()
  }

  const handleClickButtonState = ( state: boolean, id: number) => {
    setIdCustomer(id)
    setStateCustomer(!state)
  }

  const onCloseModal = () => {
    setUrlEdit('')
    hideModalCustomer()
  }

  const onCloseUser = () => {
    setIdCustomer(0)
    hideModalUser()
  }

  const { mutate: editStateCustomer } = useMutation<any, Error>(
    async () => { 
      return await updateStateCustomer(idCustomer, stateCustomer)
    },
    {
      onSuccess: () => {
        stateCustomer ? 
        notification({ type: 'success', message: 'cliente habilitado' })
        : 
        notification({ type: 'success', message: 'cliente inhabilitado' })
        setLoadingGlobal(true)
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

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
    if(idCustomer !== 0) editStateCustomer()
  }, [stateCustomer, idCustomer, editStateCustomer])

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
                    <Container display='flex' justifyContent='space-around'>
                      <Button
                      onClick={(event) => {
                        event.stopPropagation()
                        handleClickButtonEdit(record.urlIdentifier)
                      }}
                      idTootip="btnEdit"
                      messageTooltip="Editar Cliente"
                      shape="round"
                      size="small"
                      leadingIcon="ri-pencil-fill"
                    />
                    <Button
                      onClick={(event) => {
                        event.stopPropagation()
                        handleClickButtonState(record.state, record.id)
                      }}
                      idTootip="btnState"
                      messageTooltip="Editar Estado"
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
                        handleClickButtonUser(record)
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
      <UsersModal visible={visibleModalUser} onClose={onCloseUser} />
    </Container>
  )
}

export default CustomersTable
