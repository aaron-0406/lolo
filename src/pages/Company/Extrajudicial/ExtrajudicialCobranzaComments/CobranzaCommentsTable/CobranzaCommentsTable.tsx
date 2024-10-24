import { useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { commentsColumns } from './utils/columns'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from './utils/company-comentarios.cache'
import { CommentType } from '@/types/extrajudicial/comment.type'
import { getComments } from '@/services/extrajudicial/comment.service'
import notification from '@/ui/notification'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import Text from '@/ui/Text/Text'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
import useModal from '@/hooks/useModal'
import DeleteCobranzaCommentsModal from '../Modals/DeleteCobranzaCommentsModal'
import EmptyState from '@/ui/EmptyState'

type CobranzaCommentsTableProps = {
  clientId?: number
}

const CobranzaCommentsTable = ({ clientId }: CobranzaCommentsTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedComment, setIdDeletedComment] = useState<number>(0)

  const { visible: visibleModalComment, showModal: showModalComment, hideModal: hideModalComment } = useModal()
  const { visible: visibleDeleteComment, showModal: showDeleteComment, hideModal: hideDeleteComment } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalComment()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalComment()
  }

  const handleClickDelete = (id: number) => {
    setIdDeletedComment(id)
    showDeleteComment()
  }

  const onCloseModalDelete = () => {
    setIdDeletedComment(0)
    hideDeleteComment()
  }

  const { data, isLoading } = useQuery<
    AxiosResponse<
      Array<CommentType & { customerUser: CustomerUserType; managementAction: { nameAction: string } }>,
      Error
    >
  >(
    [KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId],
    async () => {
      return await getComments(clientId ?? 0)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const comments = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="10px 20px">
      <Table
        top="190px"
        columns={commentsColumns}
        loading={isLoading}
        isArrayEmpty={!comments.length}
        emptyState={
          <EmptyStateCell colSpan={commentsColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron comentarios para este cliente"
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={commentsColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron comentarios para este cliente"
            />
          </EmptyStateCell>
        }
      >
        {!!comments?.length &&
          comments.map(
            (
              record: CommentType & { customerUser: CustomerUserType; managementAction: { nameAction: string } },
              key
            ) => {
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                  <BodyCell textAlign="left">
                    <Container
                      margin="20px 0"
                      minWidth="300px"
                      maxHeight="130px"
                      whiteSpace="normal"
                      wordBreak="break-all"
                      overFlowY="auto"
                    >
                      <Text.Body size="m" weight="regular">
                        {record.comment || ''}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record.negotiation || ''}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="center">{record?.managementAction?.nameAction || '-'}</BodyCell>
                  <BodyCell textAlign="center">{moment(record.date).format('DD-MM-YYYY') || ''}</BodyCell>
                  <BodyCell textAlign="center">{moment(record.hour).format('HH:mm:ss') || ''}</BodyCell>
                  <BodyCell textAlign="center">{record.customerUser.name || ''}</BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Container display="flex" gap="10px" justifyContent="space-around">
                        <Button
                          onClick={(event) => {
                            event.stopPropagation()
                            handleClickEdit(record.id)
                          }}
                          messageTooltip="Editar comentario"
                          shape="round"
                          size="small"
                          leadingIcon="ri-pencil-fill"
                          permission="P02-02-01-02"
                        />
                        <Button
                          onClick={() => {
                            handleClickDelete(record.id)
                          }}
                          messageTooltip="Eliminar comentario"
                          shape="round"
                          size="small"
                          leadingIcon="ri-delete-bin-line"
                          permission="P02-02-01-03"
                          display="danger"
                        />
                      </Container>
                    }
                  </BodyCell>
                </tr>
              )
            }
          )}
      </Table>

      <CobranzaCommentsModal
        visible={visibleModalComment}
        onClose={onCloseModalEdit}
        idComment={idEdit}
        clientId={clientId}
        isEdit
      />
      <DeleteCobranzaCommentsModal
        visible={visibleDeleteComment}
        onClose={onCloseModalDelete}
        idComment={idDeletedComment}
        clientId={clientId}
      />
    </Container>
  )
}

export default CobranzaCommentsTable
