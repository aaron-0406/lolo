/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, FC, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useLoloContext } from '@/contexts/LoloProvider'
import paths from '../../../../../shared/routes/paths'
import { getAllClientsByCHB } from '@/services/extrajudicial/client.service'
import { getAllFuncionariosByCHB } from '@/services/extrajudicial/funcionario.service'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import { ClientType } from '@/types/extrajudicial/client.type'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import { customersColumns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import { CityType } from '@/types/dash/city.type'
import { getAllManagementActionsByCHB } from '@/services/extrajudicial/management-action.service'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import DeleteClientModal from './DeleteClientModal'

type CustomersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CustomersTable: FC<CustomersTableProps> = ({ opts, setOpts }) => {
  const {
    client: {
      customer: { urlIdentifier },
    },
    bank: { selectedBank },
    extrajudicial: {
      managementAction: { setManagementActions },
      negociacion: { negociaciones, setNegociaciones },
      funcionario: { funcionarios, setFuncionarios },
    },
    customerUser: { user },
    user: { users },
    city: { cities },
  } = useLoloContext()

  const navigate = useNavigate()

  const [codeClient, setCodeClient] = useState('')
  const [customers, setCustomers] = useState([])
  const [customersCount, setCustomersCount] = useState<number>(0)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNegotiations, setIsLoadingNegotiations] = useState(false)
  const [isLoadingFuncionarions, setIsLoadingFuncionarions] = useState(false)
  const [isLoadingManagementActions, setIsLoadingManagementActions] = useState(false)

  const [filterOptions, setFilterOptions] = useState<Array<FilterOptionsProps>>([])
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Array<FilterOptionsProps>>([])
  const [resetFilters, setResetFilters] = useState<boolean>(false)

  const { visible: visibleDeleteClient, showModal: showDeleteClient, hideModal: hideDeleteClient } = useModal()

  const handleClickDeleteClient = (code: string) => {
    setCodeClient(code)
    showDeleteClient()
  }

  const onChangeFilterOptions = (filterOption: FilterOptionsProps) => {
    setTimeout(() => {
      const position = selectedFilterOptions.find(
        (selectedFilterOption) => selectedFilterOption.identifier === filterOption.identifier
      )

      if (!position) {
        setSelectedFilterOptions((prev) => {
          return [...prev, filterOption]
        })
      } else {
        setSelectedFilterOptions((prev) => {
          return prev.map((selectedFilterOption) => {
            if (selectedFilterOption.identifier === filterOption.identifier) {
              return filterOption
            }

            return selectedFilterOption
          })
        })
      }
    })
  }

  const hasAccessToTheButton = useMemo(() => {
    const permissions = user.permissions?.map((permission) => permission.code) ?? []
    return permissions.includes('P02-02' ?? '')
  }, [user.permissions])

  const onClickRow = (code: string) => {
    navigate(`${paths.cobranza.cobranza(urlIdentifier, code)}`)
  }

  const { refetch } = useQuery(
    'query-get-all-clients-by-chb',
    async () => {
      const negotiations = selectedFilterOptions
        .find((filterOption) => filterOption.identifier === 'customers.datatable.header.negotiation')
        ?.options.map((option) => {
          return option.key
        })

      const funcionarios = selectedFilterOptions
        .find((filterOption) => filterOption.identifier === 'customers.datatable.header.funcionario')
        ?.options.map((option) => {
          return option.key
        })

      const users = selectedFilterOptions
        .find((filterOption) => filterOption.identifier === 'customers.datatable.header.user')
        ?.options.map((option) => {
          return option.key
        })

      const cities = selectedFilterOptions
        .find((filterOption) => filterOption.identifier === 'customers.datatable.header.city')
        ?.options.map((option) => {
          return option.key
        })

      return await getAllClientsByCHB(
        selectedBank.idCHB,
        opts.page,
        opts.limit,
        opts.filter,
        JSON.stringify(negotiations),
        JSON.stringify(funcionarios),
        JSON.stringify(users),
        JSON.stringify(cities)
      )
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: ({ data }) => {
        setCustomers(data.clients)
        setCustomersCount(data.quantity)
        setIsLoading(false)
      },
    }
  )

  const { refetch: refetchManagementActions } = useQuery(
    'query-get-all-management-actions',
    async () => {
      return await getAllManagementActionsByCHB(selectedBank.idCHB)
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setManagementActions(response.data)
        setIsLoadingManagementActions(false)
      },
    }
  )

  const { refetch: refetchNegotiations } = useQuery(
    'query-get-all-negociaciones',
    async () => {
      return await getAllNegociacionesByCHB(parseInt(selectedBank.idCHB))
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setNegociaciones(response.data)
        setIsLoadingNegotiations(false)
      },
    }
  )

  const { refetch: refetchFuncionarios } = useQuery(
    'query-get-all-funcionarios',
    async () => {
      return await getAllFuncionariosByCHB(parseInt(selectedBank.idCHB))
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setFuncionarios(response.data)
        setIsLoadingFuncionarions(false)
      },
    }
  )

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoadingNegotiations(true)
      setIsLoadingFuncionarions(true)
      setIsLoadingManagementActions(true)

      refetchNegotiations()
      refetchFuncionarios()
      refetchManagementActions()
    }
  }, [selectedBank, refetch, refetchNegotiations, refetchFuncionarios, refetchManagementActions])

  useEffect(() => {
    const optionsFuncionarios = funcionarios.map((funcionario) => {
      return {
        key: funcionario.id,
        label: funcionario.name,
      }
    })

    setFilterOptions((prev) => {
      const filterOption = prev.find((filter) => filter.identifier === 'customers.datatable.header.funcionario')

      if (filterOption) {
        return prev.map((filter) => {
          if (filter.identifier === 'customers.datatable.header.funcionario') {
            return {
              identifier: filter.identifier,
              options: optionsFuncionarios,
            }
          }
          return filter
        })
      } else {
        return [
          ...prev,
          {
            identifier: 'customers.datatable.header.funcionario',
            options: optionsFuncionarios,
          },
        ]
      }
    })
  }, [funcionarios])

  useEffect(() => {
    const optionsNegotiations = negociaciones.map((negotiation) => {
      return {
        key: negotiation.id,
        label: negotiation.name,
      }
    })

    setFilterOptions((prev) => {
      const filterOption = prev.find((filter) => filter.identifier === 'customers.datatable.header.negotiation')

      if (filterOption) {
        return prev.map((filter) => {
          if (filter.identifier === 'customers.datatable.header.negotiation') {
            return {
              identifier: filter.identifier,
              options: optionsNegotiations,
            }
          }
          return filter
        })
      } else {
        return [
          ...prev,
          {
            identifier: 'customers.datatable.header.negotiation',
            options: optionsNegotiations,
          },
        ]
      }
    })
  }, [negociaciones])

  useEffect(() => {
    setSelectedFilterOptions([])
    setResetFilters(!resetFilters)

    const optionsUsers = users.map((user) => {
      return {
        key: user.id,
        label: user.name,
      }
    })
    setFilterOptions((prev) => {
      const filterOption = prev.find((filter) => filter.identifier === 'customers.datatable.header.user')

      if (filterOption) {
        return prev.map((filter) => {
          if (filter.identifier === 'customers.datatable.header.user') {
            return {
              identifier: filter.identifier,
              options: optionsUsers,
            }
          }
          return filter
        })
      } else {
        return [
          ...prev,
          {
            identifier: 'customers.datatable.header.user',
            options: optionsUsers,
          },
        ]
      }
    })

    const optionsCities = cities.map((city) => {
      return {
        key: city.id,
        label: city.name,
      }
    })
    setFilterOptions((prev) => {
      const filterOption = prev.find((filter) => filter.identifier === 'customers.datatable.header.city')

      if (filterOption) {
        return prev.map((filter) => {
          if (filter.identifier === 'customers.datatable.header.city') {
            return {
              identifier: filter.identifier,
              options: optionsCities,
            }
          }
          return filter
        })
      } else {
        return [
          ...prev,
          {
            identifier: 'customers.datatable.header.city',
            options: optionsCities,
          },
        ]
      }
    })
  }, [selectedBank.idCHB])

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoading(true)
      refetch()
    }
  }, [refetch, opts, selectedFilterOptions])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={customersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={customersColumns}
        filterOptions={filterOptions}
        onChangeFilterOptions={onChangeFilterOptions}
        resetFilters={resetFilters}
        loading={isLoading || isLoadingNegotiations || isLoadingFuncionarions || isLoadingManagementActions}
        isArrayEmpty={!customers.length}
        emptyState={
          <EmptyStateCell colSpan={customersColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!customers?.length &&
          customers.map(
            (
              record: ClientType & { negotiation: NegotiationType } & { funcionario: FuncionarioType } & {
                customerUser: CustomerUserType
              } & { city: CityType }
            ) => {
              return (
                <tr
                  className="styled-data-table-row"
                  key={record.id}
                  onClick={() => {
                    hasAccessToTheButton && onClickRow(record.code)
                  }}
                >
                  <BodyCell textAlign="center">{`${record.code || ''}`}</BodyCell>
                  <BodyCell>{`${record.name || ''}`}</BodyCell>
                  <BodyCell>{`${record.negotiation.name.toUpperCase() || ''}`}</BodyCell>
                  <BodyCell>{`${record.funcionario.name.toUpperCase() || ''}`}</BodyCell>
                  <BodyCell>{`${record.customerUser.name.toUpperCase() || ''}`}</BodyCell>
                  <BodyCell>{`${record.city.name.toUpperCase() || ''}`}</BodyCell>
                  <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Container display="flex" gap="15px" justifyContent="space-around">
                        <Button
                          width="125px"
                          shape="round"
                          display="danger"
                          trailingIcon="ri-delete-bin-line"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleClickDeleteClient(record.code)
                          }}
                          permission="P02-05"
                          messageTooltip="Eliminar cliente"
                        />
                      </Container>
                    }
                  </BodyCell>
                </tr>
              )
            }
          )}
      </Table>
      <DeleteClientModal visible={visibleDeleteClient} onClose={hideDeleteClient} code={codeClient} />
    </Container>
  )
}

export default CustomersTable
