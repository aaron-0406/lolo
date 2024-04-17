import { useState } from 'react'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getClientByNameOrCode } from '@/services/extrajudicial/client.service'
import { ClientType } from '@/types/extrajudicial/client.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import TextField from '@/ui/fields/TextField'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import Label from '@/ui/Label'
import notification from '@/ui/notification'
import { modalManagementColumns } from './utils/columns'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useFormContext } from 'react-hook-form'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'

type ModalManagementType = {
  visible: boolean
  onClose: () => void
  setOwnerFileCase: (value: ClientType & { customerUser: { id: number; name: string } }) => void
}

const ModalManagement = ({ visible, onClose, setOwnerFileCase }: ModalManagementType) => {
  const {
    bank: { selectedBank },
  } = useLoloContext()

  const { setValue } = useFormContext<JudicialCaseFileType>()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [filter, setFilter] = useState<string>('')

  const { data, isLoading } = useQuery<
    AxiosResponse<Array<ClientType & { customerUser: { id: number; name: string } }>, Error>
  >(
    ['get-client-by-name', filter],
    async () => {
      return await getClientByNameOrCode(filter, selectedBank.idCHB.length ? selectedBank.idCHB : '0')
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
      enabled: filter !== '' ? true : false,
    }
  )

  const clients = data?.data ?? []

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value === '' || value.length < 2) {
      setFilter('')
    }
    if (value.length >= 2) {
      setFilter(value)
    }
  }

  const handleClickButtonSelect = (client: ClientType & { customerUser: { id: number; name: string } }) => {
    console.log('🚀 ~ handleClickButtonSelect ~ client:', client)
    setOwnerFileCase(client)
    setValue('clientId', client.id)
    onClose()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      size="large"
      id="modal-search-clients-by-name-or-code"
      title="Clientes"
      contentOverflowY="auto"
    >
      <Container width="100%" padding="20px" display="flex" flexDirection="column" gap="20px">
        <Container display="flex" justifyContent="space-between" gap="10px">
          <Container display={greaterThanMobile ? 'flex' : 'none'}>
            <Label label="Buscar:" />
          </Container>
          <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar cliente por Código o por Nombre:" />
        </Container>
        <Container>
          <Table
            top={greaterThanMobile ? '340px' : '200px'}
            columns={modalManagementColumns}
            loading={isLoading}
            isArrayEmpty={!clients.length}
            emptyState={
              <EmptyStateCell colSpan={modalManagementColumns.length}>
                <div>Vacio</div>
              </EmptyStateCell>
            }
          >
            {!!clients?.length &&
              clients.map((record: ClientType & { customerUser: { id: number; name: string } }) => {
                return (
                  <tr
                    className="styled-data-table-row"
                    key={record.id}
                    onClick={() => {
                      handleClickButtonSelect(record)
                    }}
                  >
                    <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                    <BodyCell textAlign="center">{`${record.code || ''}`}</BodyCell>
                    <BodyCell>{`${record.name || ''}`}</BodyCell>
                  </tr>
                )
              })}
          </Table>
        </Container>
      </Container>
    </Modal>
  )
}

export default ModalManagement
