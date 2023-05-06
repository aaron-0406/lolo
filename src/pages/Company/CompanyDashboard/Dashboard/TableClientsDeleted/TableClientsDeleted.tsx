import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { device } from '../../../../../shared/breakpoints/reponsive'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { deleteClientsDash } from '../../../../../shared/services/dashboard.service'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import InputText from '../../../../../ui/inputs/InputText'
import notification from '../../../../../ui/notification'
import Table from '../../../../../ui/Table'
import Column from '../../../../../ui/Table/Column'
import { DashFormType } from '../hookform.type'
import ClientDeletedRow from './ClientDeletedRow'

const TableClientsDeleted = () => {
  const { watch, setValue } = useFormContext<DashFormType>()
  const [filter, setFilter] = useState('')
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const {
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext()

  const { isLoading, mutate: deleteClients } = useMutation<any, Error>(
    async () => {
      const QUANTITY_DATA_SENT = 40
      const DATA_GROUPS = Math.ceil(watch('clientsDeleted').length / QUANTITY_DATA_SENT)
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT
        const end = start + QUANTITY_DATA_SENT
        const chunk = watch('clientsDeleted')
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

  const handleDeleteClient = () => {
    deleteClients()
  }
  const columns = (
    <tr>
      <Column align="left" width="5%" text="#" />
      <Column align="left" width="45%" text="Codigo Cliente" />
      <Column align="left" width="45%" text="Nombre" />
      <Column align="left" width="45%" text="Acciones" />
    </tr>
  )
  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const rows = watch('clientsDeleted')
    .filter(
      (item) =>
        item.code.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((client, index) => {
      return <ClientDeletedRow client={client} key={index + client.code} index={index} />
    })

  return (
    <>
      <Container
        display="flex"
        flexDirection={greaterThanDesktopS ? 'row' : 'column'}
        gap={greaterThanDesktopS ? '0px' : '10px'}
        width="100%"
        justifyContent="space-between"
      >
        <InputText placeholder="Buscar Cliente..." name="filter" onChange={handleChangeInputText} />
        <Button
          display="danger"
          trailingIcon="ri-close-line"
          label="Eliminar Todos"
          shape="default"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleDeleteClient}
        />
      </Container>
      <Table columns={columns} count={rows.length} rows={rows} />
    </>
  )
}

export default TableClientsDeleted
