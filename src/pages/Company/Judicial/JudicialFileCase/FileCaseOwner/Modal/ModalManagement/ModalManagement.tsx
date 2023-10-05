import { useState } from 'react'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getClientByName } from '@/services/extrajudicial/client.service'
import { ClientType } from '@/types/extrajudicial/client.type'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import TextField from '@/ui/fields/TextField'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import Label from '@/ui/Label'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import paths from '../../../../../../../shared/routes/paths'
import { modalManagementColumns } from './utils/columns'
import { useLoloContext } from '@/contexts/LoloProvider'

type ModalManagementType = {
  userId: number
  visible: boolean
  onClose: () => void
}

const ModalManagement = ({ userId, visible, onClose }: ModalManagementType) => {
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [filter, setFilter] = useState<string>('')

  const navigate = useNavigate()

  const { data, isLoading } = useQuery<AxiosResponse<Array<ClientType>, Error>>(
    ['get-client-by-name', `${filter}${userId}`],
    async () => {
      console.log(filter)
      return await getClientByName(filter, String(userId))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
      enabled: filter !== '' ? true : false
    }
  )

  const clients = data?.data ?? []

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value === '' || value.length < 3) {
      setFilter('')
    }
    if (value.length >= 3) {
      setFilter(value)
    }
  }

  const handleClickButtonSelect = (code: string) => {
    navigate(`${paths.cobranza.cobranzaComments(urlIdentifier, code)}`)
  }

  return (
    <Modal size="large" visible={visible} onClose={onClose} id="modal-files" title="Usuarios" contentOverflowY="auto">
      <Container width="100%" padding="20px" display="flex" flexDirection="column" gap="20px">
        <Container display="flex" justifyContent="space-between" gap="10px">
          <Container display={greaterThanMobile ? 'flex' : 'none'}>
            <Label label="Buscar:" />
          </Container>
          <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar usuario por nombre:" />
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
              clients.map((record: ClientType) => {
                return (
                  <tr className="styled-data-table-row" key={record.id}>
                    <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                    <BodyCell textAlign="center">{`${record.code || ''}`}</BodyCell>
                    <BodyCell>{`${record.name || ''}`}</BodyCell>
                    <BodyCell textAlign="center">
                      {
                        <Container display="flex" gap="15px" justifyContent="space-around">
                          <Button
                            onClick={(event) => {
                              event.stopPropagation()
                              handleClickButtonSelect(record.code)
                            }}
                            messageTooltip="seleccionar Cliente"
                            shape="round"
                            size="small"
                            leadingIcon="ri-search-line"
                          />
                        </Container>
                      }
                    </BodyCell>
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
