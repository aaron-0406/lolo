import useModal from '@/hooks/useModal'
import { FileType } from '@/types/extrajudicial/file.type'
import { AxiosResponse } from 'axios'
import { ReactNode, useState } from 'react'
import { useQuery } from 'react-query'
import { KEY_COBRANZA_URL_FILES_CODE_CACHE } from './utils/company-files.cache'
import notification from '@/ui/notification'
import { getFiles } from '@/services/extrajudicial/file.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import { filesColumns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import moment from 'moment'
import Button from '@/ui/Button'
import DeleteCobranzaFilesModal from '../Modals/DeleteCobranzaFilesModal'
import Img from '@/ui/Img'
import pdfIcon from '@/assets/icons/pdf.png'
import wordIcon from '@/assets/icons/word-doc.png'
import fileIcon from '@/assets/icons/file.png'
import CobranzaFilesSeeModal from '../Modals/CobranzaFilesSeeModal'
import Tag from '@/ui/Tag'
import CobranzaFilesEditModal from '../Modals/CobranzaFilesEditModal'

type CobranzaFilesTableProps = {
  clientId?: number
  clientCode?: number
  clientCustomerHasBankId?: number
}

const CobranzaFilesTable = ({ clientId, clientCode = 0, clientCustomerHasBankId }: CobranzaFilesTableProps) => {
  const [idDeletedFile, setIdDeletedFile] = useState<number>(0)
  const [idSeeFile, setIdSeeFile] = useState<number>(0)
  const [idEditFile, setIdEditFile] = useState<number>(0)

  const { visible: visibleEditFile, showModal: showEditFile, hideModal: hideEditFile } = useModal()
  const { visible: visibleDeleteFile, showModal: showDeleteFile, hideModal: hideDeleteFile } = useModal()
  const { visible: visibleModalFile, showModal: showModalFile, hideModal: hideModalFile } = useModal()

  const handleClickDelete = (id: number) => {
    setIdDeletedFile(id)
    showDeleteFile()
  }

  const onCloseModalDelete = () => {
    setIdDeletedFile(0)
    hideDeleteFile()
  }

  const handleClickSeeFile = (id: number) => {
    setIdSeeFile(id)
    showModalFile()
  }

  const onCloseModalSeeFile = () => {
    setIdSeeFile(0)
    hideModalFile()
  }

  const handleClickEditFile = (id: number) => {
    setIdEditFile(id)
    showEditFile()
  }

  const onCloseModalEditFile = () => {
    setIdEditFile(0)
    hideEditFile()
  }

  const getIconFile = (name: string): ReactNode => {
    if (name.endsWith('.docx') || name.endsWith('.doc')) return <Img width="30px" placeholderImage="" src={wordIcon} />
    if (name.endsWith('.pdf')) return <Img width="30px" placeholderImage="" src={pdfIcon} />
    return <Img width="30px" placeholderImage="type-file" src={fileIcon} />
  }

  const { data, isLoading } = useQuery<AxiosResponse<Array<FileType>, Error>>(
    [KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId],
    async () => {
      return await getFiles(clientId ?? 0)
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

  const files = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="195px"
        columns={filesColumns}
        loading={isLoading}
        isArrayEmpty={!files.length}
        emptyState={
          <EmptyStateCell colSpan={filesColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!files?.length &&
          files.map((record: FileType, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                <BodyCell textAlign="center">{getIconFile(record.name)}</BodyCell>
                <BodyCell textAlign="left">
                  <Container width="40vw" whiteSpace="nowrap" overFlowX="hidden" textOverflow="ellipsis">
                    <Text.Body size="m" weight="regular">
                      {record.originalName || ''}
                    </Text.Body>
                  </Container>
                </BodyCell>
                <BodyCell textAlign="center">
                  {record.tagId ? (
                    <Tag
                      text={record.classificationTag?.name ?? 'SIN CLASIFICAR'}
                      color={record.classificationTag?.color ?? '#bbbb'}
                    />
                  ) : (
                    <Tag text="SIN CLASIFICAR" color="#bbbb" />
                  )}
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold">
                    {moment(record.createdAt).format('DD-MM-YYYY') || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickSeeFile(record.id)
                        }}
                        messageTooltip="Ver archivo"
                        shape="round"
                        size="small"
                        leadingIcon="ri-eye-line"
                        permission="P02-02-03-01"
                        display="default"
                      />
                      <Button
                        onClick={(event) => {
                          handleClickEditFile(record.id)
                        }}
                        messageTooltip="Editar archivo"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P02-02-03-04"
                      />
                      <Button
                        onClick={() => {
                          handleClickDelete(record.id)
                        }}
                        messageTooltip="Eliminar archivo"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P02-02-03-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CobranzaFilesSeeModal
        visible={visibleModalFile}
        onClose={onCloseModalSeeFile}
        idFile={idSeeFile}
        clientCode={clientCode}
        clientCustomerHasBankId={clientCustomerHasBankId}
      />

      <CobranzaFilesEditModal
        visible={visibleEditFile}
        onClose={onCloseModalEditFile}
        idFile={idEditFile}
        clientId={clientId}
        clientCode={clientCode}
        clientCustomerHasBankId={clientCustomerHasBankId}
      />

      <DeleteCobranzaFilesModal
        visible={visibleDeleteFile}
        onClose={onCloseModalDelete}
        idFile={idDeletedFile}
        clientId={clientId}
        clientCode={clientCode}
      />
    </Container>
  )
}

export default CobranzaFilesTable
