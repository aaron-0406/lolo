/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useLoloContext } from '@/contexts/LoloProvider'
import paths from '../../../../../shared/routes/paths'
import { getAllClientsByCHB, updateClients } from '@/services/extrajudicial/client.service'
import { getAllFuncionariosByCHB } from '@/services/extrajudicial/funcionario.service'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import { ClientType } from '@/types/extrajudicial/client.type'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import Table from '@/ui/Table'
import { customersColumns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { FilterOptionsProps } from '@/ui/Table/Table'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import { CityType } from '@/types/dash/city.type'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import DeleteClientModal from './DeleteClientModal'
import Text from '@/ui/Text'
import { Tooltip } from 'react-tooltip'
import TransferClientModal from '../Modals/TransferClientModal'
import notification from '@/ui/notification'
import { KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE } from './utils/company-customers.cache'
import { AxiosError, AxiosResponse } from 'axios'
import { getIDsByIdentifier } from './utils/methods'
import { KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE } from '../../ExtrajudicialFuncionarios/FuncionariosTable/utils/ext-funcionarios.cache'
import { KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE } from '../../ExtrajudicialNegotiations/NegotiationTable/utils/ext-negociaciones.cache'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import { CustomErrorResponse } from 'types/customErrorResponse'
import EmptyState from '@/ui/EmptyState'
import Checkbox from '@/ui/Checkbox'
import FloatingContainer from '@/ui/FloatingContainer'
import { FloatingContainerButtonsType } from '@/ui/FloatingContainer/interfaces'
import ArchiveClientModal from './ArchiveClientModal'

const CustomersTable = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const {
    client: {
      customer: { urlIdentifier },
    },
    bank: {
      selectedBank: { idCHB: chb },
    },
    customerUser: { user },
    user: { users },
    city: { cities },
  } = useLoloContext()

  const {
    filterOptions: { getSelectedFilters, setSelectedFilters },
    filterSearch: { getSearchFilters, setSearchFilters },
    clearAllFilters
  } = useFiltersContext()

  const navigate = useNavigate()

  const [codeClient, setCodeClient] = useState<string>('')
  const [codeTransferClient, setCodeTransferClient] = useState<string>('')
  const [ selectedCustomers, setSelectedCustomers] = useState<ClientType[]>([])  
  const [ archived, setArchived ] = useState<boolean>(false)
  let usersChanged: ClientType[] = []

  const { visible: visibleDeleteClient, showModal: showDeleteClient, hideModal: hideDeleteClient } = useModal()
  const { visible: visibleArchiveClient, showModal: showArchiveClient, hideModal: hideArchiveClient } = useModal()
  const {
    visible: visibleModalTransferClient,
    showModal: showModalTransferClient,
    hideModal: hideModalTransferClient,
  } = useModal()

  const opts = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const handleClickDeleteClient = (code: string) => {
    setCodeClient(code)
    showDeleteClient()
  }

  const handleClickTransferClient = (code: string) => {
    setCodeTransferClient(code)
    showModalTransferClient()
  }

  const onChangeCheckBox = (state: boolean, client: ClientType) => {
    let arr = selectedCustomers

    if (state) {
      setSelectedCustomers([...arr, client])
    } else {
      arr = arr.filter((cf) => cf !== client)
      setSelectedCustomers(arr)
    }
  }

  const onChangeCheckBoxAll = (state: boolean) => {
    if (state) {
      setSelectedCustomers(customers)
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.customer-check-box')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true
      })
    } else {
      setSelectedCustomers([])
      const checkboxes = document.querySelectorAll<HTMLInputElement>('.customer-check-box')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
    }
  }

  const onCloseFloatingContainer = () => {
    setSelectedCustomers([])
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.customer-check-box')
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
  }
  
  const onChangeArchivedState = () => { 
    setArchived(!archived)
    setSelectedCustomers([])
  }

  const selectedFilterOptions = getSelectedFilters(currentPath)?.filters ?? []

  const onChangeFilterOptions = (filterOption: FilterOptionsProps) => {
    const position = selectedFilterOptions.find(
      (selectedFilterOption) => selectedFilterOption.identifier === filterOption.identifier
    )

    if (!position) {
      setSelectedFilters({ url: currentPath, filters: [...selectedFilterOptions, filterOption] })
    } else {
      const selectedFilterOptionsTestCopy = selectedFilterOptions
      const selectedFiltersUpdated = selectedFilterOptionsTestCopy.map((selectedFilterOption) => {
        if (selectedFilterOption.identifier === filterOption.identifier) {
          return filterOption
        }

        return selectedFilterOption
      })
      setSelectedFilters({ url: currentPath, filters: selectedFiltersUpdated })
    }
  }

  const hasAccessToTheButton = useMemo(() => {
    const permissions = user.permissions?.map((permission) => permission.code) ?? []
    return permissions.includes('P02-02' ?? '')
  }, [user.permissions])

  const onClickRow = (code: string) => {
    navigate(`${paths.cobranza.cobranza(urlIdentifier, code)}`)
  }

  const { data: dataNegotiations, isLoading: isLoadingNegotiations } = useQuery(
    [KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getAllNegociacionesByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const optionsNegotiations = dataNegotiations?.data?.map((negotiation: { id: number; name: string }) => {
    return {
      key: negotiation.id,
      label: negotiation.name,
    }
  })

  const { data: dataFuncionarios, isLoading: isLoadingFuncionarios } = useQuery(
    [KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getAllFuncionariosByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const optionsFuncionarios = dataFuncionarios?.data?.map((funcionario: { id: number; name: string }) => {
    return {
      key: funcionario.id,
      label: funcionario.name,
    }
  })

  const optionsUsers = users.map((user) => {
    return {
      key: user.id,
      label: user.name,
    }
  })

  const optionsCities = cities.map((city) => {
    return {
      key: city.id,
      label: city.name,
    }
  })

  const { data, isLoading, refetch } = useQuery<AxiosResponse<any>, AxiosError<CustomErrorResponse>>(
    [KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      const negotiations = getIDsByIdentifier('customers.datatable.header.negotiation', selectedFilterOptions)
      const funcionarios = getIDsByIdentifier('customers.datatable.header.funcionario', selectedFilterOptions)
      const users = getIDsByIdentifier('customers.datatable.header.user', selectedFilterOptions)
      const cities = getIDsByIdentifier('customers.datatable.header.city', selectedFilterOptions)

      return await getAllClientsByCHB(
        chb,
        archived,
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
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: updateClientsmutate } = useMutation<AxiosResponse<ClientType[]>, AxiosError<CustomErrorResponse>>(
    async () => {
      const clients: ClientType[] = selectedCustomers.map((client) => ({
        id: client.id,
        code: client.code,
        name: client.name,
        negotiationId: client.negotiationId,
        funcionarioId: client.funcionarioId,
        customerUserId: client.customerUserId,
        cityId: client.cityId,
        createdAt: client.createdAt,
        customerHasBankId: client.customerHasBankId,
        isArchived: !archived,
      }))
      return await updateClients(clients, chb)
    },
    {
      onSuccess: (data) => {
        setSelectedCustomers([])
        refetch()
        notification({ type: 'success', message: 'Clientes actualizados' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onUpdateClients = async () => {
    updateClientsmutate()
    hideArchiveClient()
  }

  const onOpenArchiveClientModal= () => {
    if (!selectedCustomers.length) {
      notification({
        type: 'info',
        message: 'No se ha seleccionado ningún cliente',
      })
    } else showArchiveClient()
  }

  const buttons: FloatingContainerButtonsType[] = [
    {
      onClick: onOpenArchiveClientModal,
      label: archived ? 'Desarchivar' : 'Archivar',
    },
  ]

  const customers = data?.data.clients ?? []
  const quantity = data?.data.quantity

  useEffect(() => {
    refetch()
  }, [getSelectedFilters(currentPath)?.filters])

  useEffect(() => {
    refetch()
  }, [archived])

  useEffect(() => {
    refetch()
  }, [opts.filter.length, opts.page])
  
  return (
    <Container width="100%" height="calc(100% - 200px)" padding="10px 20px">
      <Container width="100%" height="auto" display="flex" justifyContent="end" alignItems="center">
        {!archived ? (
          <Button
            size="small"
            label="Ver clientes archivados"
            trailingIcon="ri-archive-line"
            onClick={onChangeArchivedState}
          />
        ) : (
          <Button
            size="small"
            label="Ver clientes activos"
            trailingIcon="ri-user-fill"
            onClick={onChangeArchivedState}
          />
        )}
      </Container>
      <Pagination count={quantity} opts={opts} setOptsFilter={setSearchFilters} url={currentPath} />
      <Table
        top="260px"
        columns={customersColumns}
        filterOptions={[
          { identifier: 'customers.datatable.header.negotiation', options: optionsNegotiations },
          { identifier: 'customers.datatable.header.funcionario', options: optionsFuncionarios },
          { identifier: 'customers.datatable.header.user', options: optionsUsers },
          { identifier: 'customers.datatable.header.city', options: optionsCities },
        ]}
        selectedFilterOptions={selectedFilterOptions}
        onChangeFilterOptions={onChangeFilterOptions}
        loading={isLoading || isLoadingNegotiations || isLoadingFuncionarios}
        isArrayEmpty={!customers.length}
        onChangeCheckBoxAll={onChangeCheckBoxAll}
        emptyState={
          <EmptyStateCell colSpan={customersColumns.length}>
            <EmptyState
              title="Recurso no encontrado"
              description="No se encontraron los datos solicitados. Por favor, intente con otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={clearAllFilters}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={customersColumns.length}>
            <EmptyState title="Recurso no encontrado" description="Por favor, seleccione un banco" />
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
              const showMessageAboutClientTransferred =
                !record.chbTransferred || record.chbTransferred == parseInt(chb?.length ? chb : '0')

              return (
                <tr
                  className={
                    showMessageAboutClientTransferred ? 'styled-data-table-row ' : 'styled-data-table-row disable-table'
                  }
                  key={record.id}
                  onClick={() => {
                    hasAccessToTheButton && showMessageAboutClientTransferred && onClickRow(record.code)
                  }}
                >
                  <BodyCell textAlign="left">
                    {
                      <Container
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        <Checkbox
                          className="customer-check-box"
                          width="100%"
                          onChange={(event) => {
                            onChangeCheckBox(event.currentTarget.checked, record)
                          }}
                        />
                      </Container>
                    }
                  </BodyCell>
                  <BodyCell textAlign="center">{`${record.code || ''}`}</BodyCell>
                  <BodyCell textAlign="left">
                    <Container
                      data-tooltip-id="cell-tooltip"
                      data-tooltip-content={record.name.length >= 25 ? record.name : ''}
                      width="17vw"
                      whiteSpace="nowrap"
                      overFlowX="hidden"
                      textOverflow="ellipsis"
                    >
                      <Text.Body size="m" weight="regular">
                        {record.name || '-'}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  {showMessageAboutClientTransferred ? (
                    <>
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
                              trailingIcon="ri-arrow-left-right-fill"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleClickTransferClient(record.code)
                              }}
                              permission="P02-06"
                              messageTooltip="Transferir cliente a otro banco"
                            />

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
                    </>
                  ) : (
                    <>
                      <BodyCell>
                        <Text.Body size="m" weight="bold" color="Primary5">
                          Cliente Transferido
                        </Text.Body>
                      </BodyCell>
                      <BodyCell>-</BodyCell>
                      <BodyCell>-</BodyCell>
                      <BodyCell>-</BodyCell>
                      <BodyCell>-</BodyCell>
                      <BodyCell>-</BodyCell>
                    </>
                  )}
                </tr>
              )
            }
          )}
      </Table>
      <Tooltip place="right" id="cell-tooltip" />

      <DeleteClientModal visible={visibleDeleteClient} onClose={hideDeleteClient} code={codeClient} />
      <TransferClientModal
        visible={visibleModalTransferClient}
        onClose={hideModalTransferClient}
        code={codeTransferClient}
      />

      {selectedCustomers.length ? (
        <FloatingContainer
          numberItems={selectedCustomers.length}
          buttons={buttons}
          onClose={onCloseFloatingContainer}
        />
      ) : null}

      {
        visibleArchiveClient ? (
          <ArchiveClientModal 
            isVisible={visibleArchiveClient}
            onClose={hideArchiveClient}
            onArchiveClients={onUpdateClients}
            archived={archived}
          />
        ) : null
      }
    </Container>
  )
}

export default CustomersTable
