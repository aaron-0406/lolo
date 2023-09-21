import { useQuery } from 'react-query'
import { device } from '@/breakpoints/responsive'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getFileCaseByClientId } from '@/services/judicial/file-case.service'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import TextField from '@/ui/fields/TextField'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import Label from '@/ui/Label'
import notification from '@/ui/notification'

type ModalManagementType = {
  clientId: number
  visible: boolean
  onClose: () => void
}

const ModalManagement = ({clientId, visible, onClose}: ModalManagementType) => {
  const greaterThanMobile = useMediaQuery(device.tabletS)

  const { refetch } = useQuery(
    'get-client-by-code',
    async () => {
      return await getFileCaseByClientId(clientId)
    },
    {
      onSuccess: ({ data }) => {
        notification({ type: 'success', message: 'Cliente encontrado' })
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
      enabled: false,
    }
  )

  return (
    <Modal
      size="large"
        visible={visible}
        onClose={onClose}
      id="modal-files"
      title="Usuarios"
      contentOverflowY="auto"
    >
      <Container width="100%" padding="20px" display="flex" flexDirection="column" gap="20px">
        <Container display="flex" justifyContent="space-between" gap="10px">
          <Container display={greaterThanMobile ? 'flex' : 'none'}>
            <Label label="Buscar:" />
          </Container>
          {/* <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar usuario por nombre:" /> */}
        </Container>
        <Container>
          {/* <Table
            top={greaterThanMobile ? '340px' : '200px'}
            columns={usersColumns}
            loading={load}
            isArrayEmpty={!users.length}
            emptyState={
              <EmptyStateCell colSpan={usersColumns.length}>
                <div>Vacio</div>
              </EmptyStateCell>
            }
          ></Table> */}
        </Container>
      </Container>
    </Modal>
  )
}

export default ModalManagement
