import { useState } from 'react'
import useModal from '@/hooks/useModal'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import notification from '@/ui/notification'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
import { KEY_COBRANZA_URL_TAG_CODE_CACHE } from './utils/company-tags.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getExtTagsByCHB } from '@/services/extrajudicial/ext-tag.service'
import { tagsColumns } from './utils/columns'
import moment from 'moment'
import CobranzaTagsModal from '../Modals/CobranzaTagsModal'
import DeleteCobranzaTagsModal from '../Modals/DeleteCobranzaTagsModal'
import Tag from '@/ui/Tag'
import TagsSwitch from './TagsSwitch'

const TagsTable = () => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedTag, setIdDeletedTag] = useState<number>(0)

  const { visible: visibleModalTag, showModal: showModalTag, hideModal: hideModalTag } = useModal()
  const { visible: visibleDeleteTag, showModal: showDeleteTag, hideModal: hideDeleteTag } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalTag()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalTag()
  }

  const handleClickDelete = (id: number) => {
    setIdDeletedTag(id)
    showDeleteTag()
  }

  const onCloseModalDelete = () => {
    setIdDeletedTag(0)
    hideDeleteTag()
  }

  const { data, isLoading } = useQuery<AxiosResponse<Array<ExtTagType>, Error>>(
    [KEY_COBRANZA_URL_TAG_CODE_CACHE, parseInt(idCHB)],
    async () => {
      return await getExtTagsByCHB(parseInt(idCHB.length ? idCHB : '0'))
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

  const tags = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="180px"
        columns={tagsColumns}
        loading={isLoading}
        isArrayEmpty={!tags.length}
        emptyState={
          <EmptyStateCell colSpan={tagsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!tags?.length &&
          tags.map((record: ExtTagType, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                <BodyCell textAlign="left">
                  <Text.Body size="m" weight="regular">
                    {record.name || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    <Tag color={record.color} text={record.color} />
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record?.extTagGroup?.name || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <TagsSwitch id={record.id} value={record.action} groupName={record?.extTagGroup?.name || ''} />
                </BodyCell>
                <BodyCell textAlign="center">{moment(record.createdAt).format('DD-MM-YYYY') || ''}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickEdit(record.id)
                        }}
                        messageTooltip="Editar etiqueta"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P14-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDelete(record.id)
                        }}
                        messageTooltip="Eliminar etiqueta"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P14-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CobranzaTagsModal visible={visibleModalTag} onClose={onCloseModalEdit} idTag={idEdit} isEdit />

      <DeleteCobranzaTagsModal visible={visibleDeleteTag} onClose={onCloseModalDelete} idTag={idDeletedTag} />
    </Container>
  )
}

export default TagsTable
