import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { DashFormType } from '../../Dashboard/hookform.type'
import { Columns } from './utils/columns'
import { ClientType } from '../../../../../shared/types/client.type'
import { Props } from '../Props.type'
import { deleteClientsDash } from '../../../../../shared/services/dashboard.service'
import Container from '../../../../../ui/Container'
import Table from '../../../../../ui/Tables/Table'
import BodyCell from '../../../../../ui/Tables/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Tables/Table/EmptyStateCell'
import Button from '../../../../../ui/Button'
import Actions from '../../Dashboard/Actions'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import notification from '../../../../../ui/notification'

const TableClientDeleted = ({ globalLoad }: Props) => {
  const {
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const { watch, setValue } = useFormContext<DashFormType>()
  const [filter, setFilter] = useState('')
  const [clients, setclients] = useState(watch('clientsDeleted'))
  const [client, setClient] = useState<ClientType>(clients[0])

  const { isLoading: loadingDeleteClients, mutate: deleteClients } = useMutation<any, Error>(
    async () => {
      const QUANTITY_DATA_SENT = 40
      const DATA_GROUPS = Math.ceil(clients.length / QUANTITY_DATA_SENT)
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT
        const end = start + QUANTITY_DATA_SENT
        const chunk = clients
          .map((item) => {
            return item.code
          })
          .slice(start, end)
        await deleteClientsDash(chunk, +idCHB, +idBank)
      }
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Clientes Eliminados' })
        setValue('clientsDeleted', [])
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingDeleteClient, mutate: deleteClient } = useMutation<any, Error>(
    async () => {
      return await deleteClientsDash([client.code], +idCHB, +idBank)
    },
    {
      onSuccess: () => {
        setValue(
          'clientsDeleted',
          watch('clientsDeleted').filter((item) => item.code !== client.code)
        )
        notification({ type: 'success', message: 'Cliente Eliminado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleDeleteClients = () => {
    deleteClients()
  }

  const handleDeleteClient = (code: string) => {
    clients.filter((record: ClientType) => {
      if (record.code === code) {
        setClient(record)
        deleteClient()
      }
      return null
    })
  }
  
  useEffect(() => {
    setclients(watch('clientsDeleted'))
  }, [globalLoad, watch])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 0">
      <Actions
        setFilter={(e) => {
          setFilter(e.target.value)
        }}
        handleClick={handleDeleteClients}
        isLoading={loadingDeleteClients}
        state={false}
      />
      <Table
        top="300px"
        columns={Columns}
        loading={globalLoad || loadingDeleteClients || loadingDeleteClient}
        isArrayEmpty={!clients}
        emptyState={
          <EmptyStateCell colSpan={Columns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!clients?.length &&
          clients
            .filter(
              (item) =>
                item.code.toLowerCase().includes(filter.toLowerCase()) ||
                item.code.toLowerCase().includes(filter.toLowerCase())
            )
            .map((record: ClientType, index: number) => {
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                  <BodyCell>{`${record.code || ''}`}</BodyCell>
                  <BodyCell>{`${record.name || ''}`}</BodyCell>
                  <BodyCell>
                    {
                      <Button
                        display="danger"
                        shape="round"
                        onClick={() => {
                          handleDeleteClient(record.code)
                        }}
                        disabled={loadingDeleteClient}
                        loading={loadingDeleteClient}
                        trailingIcon="ri-close-line"
                      />
                    }
                  </BodyCell>
                </tr>
              )
            })}
      </Table>
    </Container>
  )
}

export default TableClientDeleted
