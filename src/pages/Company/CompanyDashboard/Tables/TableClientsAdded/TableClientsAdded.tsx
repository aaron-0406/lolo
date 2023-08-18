import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { createClientsDash } from '../../../../../shared/services/extrajudicial/dashboard.service'
import { DashFormType } from '../../Dashboard/hookform.type'
import { Props } from '../Props.type'
import { ProductTypeName } from '../../../../../shared/types/extrajudicial/product.type'
import { Columns } from './utils/colums'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import notification from '../../../../../ui/notification'
import Table from '../../../../../ui/Table'
import BodyCell from '../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Table/EmptyStateCell'
import Actions from '../../Dashboard/Actions'

const TableClientsAdded = ({ globalLoad }: Props) => {
  const { watch, setValue } = useFormContext<DashFormType>()
  const [clients, setClients] = useState(watch('clientsAdded'))
  const [client, setClient] = useState<ProductTypeName>(clients[0])
  const [filter, setFilter] = useState('')

  const {
    customerUser: {
      user: { id: customerUserId },
    },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const { isLoading: isLoadingCreateC, mutate: createClients } = useMutation<any, Error>(
    async () => {
      const QUANTITY_DATA_SENT = 40
      const DATA_GROUPS = Math.ceil(watch('clientsAdded').length / QUANTITY_DATA_SENT)
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT
        const end = start + QUANTITY_DATA_SENT
        const chunk = watch('clientsAdded')
          .map((item) => {
            return {
              name: item.clientName,
              code: item.clientCode,
              funcionarioId: item.funcionarioId,
              cityId: item.cityId,
            }
          })
          .slice(start, end)
        await createClientsDash(chunk, customerUserId, +idCHB, +idBank)
      }
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Productos Agregados' })
        setValue('clientsAdded', [])
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: isLoadingCreateP, mutate: createProducts } = useMutation<any, Error>(
    async () => {
      return await createClientsDash(
        [
          {
            code: client.clientCode,
            name: client.clientName,
            cityId: client.cityId,
            funcionarioId: client.funcionarioId,
          },
        ],
        customerUserId,
        +idCHB,
        +idBank
      )
    },
    {
      onSuccess: () => {
        setValue(
          'clientsAdded',
          watch('clientsAdded').filter((item) => item.code !== client.code)
        )
        notification({ type: 'success', message: 'Cliente Agregado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleAddClient = () => {
    createClients()
  }

  const handleAddProduct = (index: number) => {
    clients.filter((record: ProductTypeName) => {
      if (record.id === index) {
        setClient(record)
        createProducts()
      }
      return null
    })
  }

  useEffect(() => {
    setClients(watch('clientsAdded'))
  }, [globalLoad, watch])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 0">
      <Actions
        setFilter={(e) => {
          setFilter(e.target.value)
        }}
        handleClick={handleAddClient}
        isLoading={isLoadingCreateC}
        state={true}
      />
      <Table
        top="300px"
        columns={Columns}
        loading={isLoadingCreateC || globalLoad}
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
                item.clientCode.toLowerCase().includes(filter.toLowerCase()) ||
                item.clientName.toLowerCase().includes(filter.toLowerCase())
            )
            .map((record: ProductTypeName, index: number) => {
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                  <BodyCell>{`${record.clientCode || ''}`}</BodyCell>
                  <BodyCell>{`${record.clientName || ''}`}</BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Button
                        display="default"
                        size="small"
                        shape="round"
                        onClick={() => {
                          handleAddProduct(record.id)
                        }}
                        disabled={isLoadingCreateP}
                        loading={isLoadingCreateP}
                        trailingIcon="ri-add-fill"
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

export default TableClientsAdded
