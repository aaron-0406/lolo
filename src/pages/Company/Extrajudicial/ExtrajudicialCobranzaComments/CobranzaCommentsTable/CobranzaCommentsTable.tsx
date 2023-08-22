import { useQuery, useQueryClient } from 'react-query'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import Table from '../../../../../ui/Table'
import BodyCell from '../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Table/EmptyStateCell'
import { commentsColumns } from './utils/columns'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from './utils/company-comentarios.cache'
import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { CommentType } from '../../../../../shared/types/extrajudicial/comment.type'
import { getComments } from '../../../../../shared/services/extrajudicial/comment.service'
import { useParams } from 'react-router-dom'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { ClientType } from '../../../../../shared/types/extrajudicial/client.type'
import notification from '../../../../../ui/notification'
import { CustomerUserType } from '../../../../../shared/types/dash/customer-user.type'
import Text from '../../../../../ui/Text/Text'

const CobranzaCommentsTable = () => {
  const { code } = useParams()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedAction, setIdDeletedAction] = useState<number>(0)

  const dataClient = queryClient.getQueryData<AxiosResponse<ClientType>>([
    `${KEY_COBRANZA_URL_COBRANZA_CODE_CACHE}_CLIENT_BY_CODE`,
    `${code}-${idCHB}`,
  ])

  const { data, isLoading } = useQuery<AxiosResponse<Array<CommentType & { customerUser: CustomerUserType }>, Error>>(
    [KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, dataClient?.data.id ?? 0],
    async () => {
      return await getComments(dataClient?.data.id ?? 0)
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
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={commentsColumns}
        loading={isLoading}
        isArrayEmpty={!comments.length}
        emptyState={
          <EmptyStateCell colSpan={commentsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!comments?.length &&
          comments.map((record: CommentType & { customerUser: CustomerUserType }, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">
                  <Container width="200px">
                    <Text.Body size="m" weight="regular" ellipsis>{`${record.comment || ''}`}</Text.Body>
                  </Container>
                </BodyCell>
                <BodyCell textAlign="center">{`${record.negotiation || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.managementActionId || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.date || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.date || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.customerUser.name || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          //handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar comentario"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                      />
                      <Button
                        onClick={() => {
                          //handleClickDeleteUser(record.id)
                        }}
                        messageTooltip="Eliminar comentario"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default CobranzaCommentsTable
