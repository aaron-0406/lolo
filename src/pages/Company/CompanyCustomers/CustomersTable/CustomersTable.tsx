import { Dispatch, FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useLoloContext } from '../../../../shared/contexts/LoloProvider'
import paths from '../../../../shared/routes/paths'
import { getAllClientsByCHB } from '../../../../shared/services/client.service'
import { getAllFuncionariosByCHB } from '../../../../shared/services/funcionario.service'
import { getAllNegociacionesByCHB } from '../../../../shared/services/negotiation.service'
import { ClientType } from '../../../../shared/types/client.type'
import { NegotiationType } from '../../../../shared/types/negotiation.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Tables/Table'
import { customersColumns } from './utils/columns'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'
import { FilterOptionsProps } from '../../../../ui/Tables/Table/Table'

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
    negociacion: { negociaciones, setNegociaciones },
    funcionario: { setFuncionarios },
  } = useLoloContext()

  const navigate = useNavigate()

  const [customers, setCustomers] = useState([])
  const [customersCount, setCustomersCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNegotiations, setIsLoadingNegotiations] = useState(false)
  const [isLoadingFuncionarions, setIsLoadingFuncionarions] = useState(false)

  const [filterOptions, setFilterOptions] = useState<Array<FilterOptionsProps>>([])

  const { refetch } = useQuery(
    'query-get-all-clients-by-chb',
    async () => {
      return await getAllClientsByCHB(selectedBank.idCHB, opts.page, opts.limit, opts.filter)
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

  const { refetch: refetchNegotiations } = useQuery(
    'query-get-all-negociaciones',
    async () => {
      return await getAllNegociacionesByCHB(selectedBank.idCHB)
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setNegociaciones(response.data)
        setIsLoadingNegotiations(false)

        setFilterOptions((prev) => {
          return [
            ...prev,
            {
              identifier: 'customers.datatable.header.negotiation',
              options: negociaciones.map((negotiation) => {
                return {
                  key: negotiation.id,
                  label: negotiation.name,
                }
              }),
            },
          ]
        })
      },
    }
  )

  const { refetch: refetchFuncionarios } = useQuery(
    'query-get-all-funcionarios',
    async () => {
      return await getAllFuncionariosByCHB(selectedBank.idCHB)
    },
    {
      enabled: !!selectedBank.idCHB.length,
      onSuccess: (response) => {
        setFuncionarios(response.data)
        setIsLoadingFuncionarions(false)
      },
    }
  )

  const onClickRow = (code: string) => {
    navigate(`${paths.company.cobranza(urlIdentifier)}?code=${code}`)
  }

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoadingNegotiations(true)
      setIsLoadingFuncionarions(true)

      refetchNegotiations().then((value) => {
        setFilterOptions((prev) => {
          return prev.map((option) => {
            if (option.identifier === 'customers.datatable.header.negotiation') {
              return {
                identifier: option.identifier,
                options: value.data?.data.map((option: { id: string; name: string }) => {
                  return {
                    key: option.id,
                    label: option.name,
                  }
                }),
              }
            }

            return option
          })
        })
      })
      refetchFuncionarios()
    }
  }, [selectedBank, refetch, refetchNegotiations, refetchFuncionarios])

  useEffect(() => {
    if (selectedBank.idCHB.length) {
      setIsLoading(true)
      refetch()
    }
  }, [refetch, opts, selectedBank])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={customersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={customersColumns}
        filterOptions={filterOptions}
        loading={isLoading || isLoadingNegotiations || isLoadingFuncionarions}
        isArrayEmpty={!customers.length}
        emptyState={
          <EmptyStateCell colSpan={customersColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!customers?.length &&
          customers.map((record: ClientType & { negotiation: NegotiationType }) => {
            return (
              <tr className="styled-data-table-row" key={record.id} onClick={() => onClickRow(record.code)}>
                <BodyCell textAlign="center">{`${record.code || ''}`}</BodyCell>
                <BodyCell>{`${record.name || ''}`}</BodyCell>
                <BodyCell>{`${record.negotiation.name.toUpperCase() || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default CustomersTable
