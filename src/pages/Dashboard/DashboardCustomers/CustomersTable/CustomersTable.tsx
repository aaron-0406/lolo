import { Dispatch, FC, useState, useEffect } from 'react'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getCustomerAll, updateStateCustomer } from '../../../../shared/services/dash/customer.service'
import { CustomerType } from '../../../../shared/types/dash/customer.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Table'
import { customersColumns } from './utils/columns'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import Button from '../../../../ui/Button'
import CustomerModal from '../Modals/CustomersModal'
import useModal from '../../../../shared/hooks/useModal'
import UsersModal from '../Modals/UsersModal/UsersModal'
import { useDashContext } from '../../../../shared/contexts/DashProvider'
import notification from '../../../../ui/notification'
import dashCustomersCache, { KEY_DASH_CLIENTES_CACHE } from './utils/dash-clientes.cache'
import { AxiosResponse } from 'axios'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CustomersTable: FC<CustomersTableProps> = ({ opts, setOpts }) => {
  const {
    dashCustomer: { setSelectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()
  const {
    actions: { editCustomerCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashCustomersCache(queryClient)

  const [customers, setCustomers] = useState<Array<CustomerType>>([])
  const [urlEdit, setUrlEdit] = useState('')
  const [customersCount, setCustomersCount] = useState<number>(0)

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

  const handleClickButtonState = (state: boolean, customerId: number) => {
    editStateCustomer({ customerId, state })
  }

  const onCloseModal = () => {
    setUrlEdit('')
    hideModalCustomer()
  }

  const onCloseUser = () => {
    hideModalUser()
  }

  const { mutate: editStateCustomer } = useMutation<
    AxiosResponse<CustomerType>,
    Error,
    { customerId: number; state: boolean }
  >(
    async ({ customerId, state }) => {
      return await updateStateCustomer(customerId, !state)
    },
    {
      onSuccess: (result, { state }) => {
        state
          ? notification({ type: 'success', message: 'Cliente inhabilitado' })
          : notification({ type: 'success', message: 'Cliente habilitado' })

        editCustomerCache(result.data)
      },
      onMutate: () => {
        onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading, refetch } = useQuery(
    KEY_DASH_CLIENTES_CACHE,
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
      },
    }
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={customersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={customersColumns}
        loading={isLoading}
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
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.urlIdentifier)
                        }}
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
                        display={record.state ? 'default' : 'warning'}
                        messageTooltip={record.state ? 'Inhabilitar' : 'Habilitar'}
                        shape="round"
                        size="small"
                        leadingIcon={record.state ? 'ri-shield-user-fill' : 'ri-shield-user-line'}
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonUser(record)
                        }}
                        shape="round"
                        messageTooltip="Ver usuarios"
                        size="small"
                        leadingIcon="ri-user-search-fill"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CustomerModal visible={visibleModalCustomer} onClose={onCloseModal} url={urlEdit} isEdit />

      {visibleModalUser && <UsersModal visible={visibleModalUser} onClose={onCloseUser} />}
    </Container>
  )
}

export default CustomersTable
