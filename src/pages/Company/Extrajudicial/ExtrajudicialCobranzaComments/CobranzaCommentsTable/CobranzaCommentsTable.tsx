import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import Table from '../../../../../ui/Table'
import BodyCell from '../../../../../ui/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Table/EmptyStateCell'
import { commentsColumns } from './utils/columns'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from './utils/company-comentarios.cache'
import { CommentType } from '../../../../../shared/types/extrajudicial/comment.type'
import { getComments } from '../../../../../shared/services/extrajudicial/comment.service'
import notification from '../../../../../ui/notification'
import { CustomerUserType } from '../../../../../shared/types/dash/customer-user.type'
import Text from '../../../../../ui/Text/Text'
import moment from 'moment'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'

type CobranzaCommentsTableProps = {
  clientId?: number
}

const CobranzaCommentsTable = ({ clientId }: CobranzaCommentsTableProps) => {
  const {
    managementAction: { managementActions },
  } = useLoloContext()

  const { data, isLoading } = useQuery<AxiosResponse<Array<CommentType & { customerUser: CustomerUserType }>, Error>>(
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

  const getActionById = (id: number) => {
    return managementActions.find((action) => action.id === id)
  }

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
                <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                <BodyCell textAlign="left">
                  <Container padding="5px 0" whiteSpace="normal" wordBreak="break-all">
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
                <BodyCell textAlign="center">
                  {getActionById(record.managementActionId ?? 0)?.nameAction.toUpperCase() || '-'}
                </BodyCell>
                <BodyCell textAlign="center">{moment(record.date).format('DD-MM-YYYY') || ''}</BodyCell>
                <BodyCell textAlign="center">{moment(record.hour).format('HH:mm:ss') || ''}</BodyCell>
                <BodyCell textAlign="center">{record.customerUser.name || ''}</BodyCell>
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
