/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
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
  } = useFiltersContext()

  const navigate = useNavigate()

  const [codeClient, setCodeClient] = useState<string>('')
  const [codeTransferClient, setCodeTransferClient] = useState<string>('')

  const { visible: visibleDeleteClient, showModal: showDeleteClient, hideModal: hideDeleteClient } = useModal()
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

  const selectedFilterOptions = getSelectedFilters(currentPath)?.filters ?? []

  const onChangeFilterOptions = (filterOption: FilterOptionsProps) => {
    setTimeout(() => {
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
    })
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

  const customers = data?.data.clients ?? []
  const quantity = data?.data.quantity

  useEffect(() => {
    refetch()
  }, [getSelectedFilters(currentPath)?.filters])

  useEffect(() => {
    refetch()
  }, [opts.filter.length, opts.page])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
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
              const showMessageAboutClientTransferred =
                !record.chbTransferred || record.chbTransferred == parseInt(chb?.length ? chb : '0')

              return (
                <tr
                  className={
                    showMessageAboutClientTransferred ? 'styled-data-table-row' : 'styled-data-table-row disable-table'
                  }
                  key={record.id}
                  onClick={() => {
                    hasAccessToTheButton && showMessageAboutClientTransferred && onClickRow(record.code)
                  }}
                >
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
    </Container>
  )
}

export default CustomersTable
