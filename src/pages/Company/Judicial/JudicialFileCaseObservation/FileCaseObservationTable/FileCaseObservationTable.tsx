import { useState } from 'react'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { getObservationByFileCase } from '@/services/judicial/judicial-observation.service'
import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import BodyCell from '@/ui/Table/BodyCell'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import notification from '@/ui/notification'
import { JudicialObsFileType } from '@/types/judicial/judicial-obs-file.type'
import { JudicialObservationType } from '@/types/judicial/judicial-observation.type'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'
import { KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE } from './utils/judicial-observation.cache'
import { judicialObservationColumns } from './utils/columns'
import RemoveJudicialObservationModal from '../Modals/RemoveObservationModal'
import JudicialObservationModal from '../Modals/ObservationModal'
import EmptyState from '@/ui/EmptyState'

type JudicialObservationTableProps = {
  judicialFileCaseId?: number
  clientCode: string
}

const JudicialObservationTable = ({ judicialFileCaseId, clientCode }: JudicialObservationTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedObservation, setIdDeletedObservation] = useState<number>(0)
  const [filesDelete, setFilesDelete] = useState(0)

  const {
    visible: visibleModalJudicialObservation,
    showModal: showModalJudicialObservation,
    hideModal: hideModalJudicialObservation,
  } = useModal()
  const {
    visible: visibleDeleteJudicialObservation,
    showModal: showDeleteJudicialObservation,
    hideModal: hideDeleteJudicialObservation,
  } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalJudicialObservation()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalJudicialObservation()
  }

  const handleClickDelete = (id: number, fd: number) => {
    setFilesDelete(fd)
    setIdDeletedObservation(id)
    showDeleteJudicialObservation()
  }

  const onCloseModalDelete = () => {
    setIdDeletedObservation(0)
    hideDeleteJudicialObservation()
  }

  const { data, isLoading } = useQuery<
    AxiosResponse<
      Array<
        JudicialObservationType & { judicialObsFile: JudicialObsFileType[] } & {
          judicialObsType: JudicialObsTypeType
        }
      >,
      Error
    >
  >(
    [KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId],
    async () => {
      return await getObservationByFileCase(judicialFileCaseId ?? 0, true)
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

  const observations = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="195px"
        columns={judicialObservationColumns}
        loading={isLoading}
        isArrayEmpty={!observations.length}
        emptyState={
          <EmptyStateCell colSpan={judicialObservationColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron observaciones" />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialObservationColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron Observaciones disponibles" />
          </EmptyStateCell>
        }
      >
        {!!observations?.length &&
          observations.map(
            (
              record: JudicialObservationType & { judicialObsFile: JudicialObsFileType[] } & {
                judicialObsType: JudicialObsTypeType
              },
              key
            ) => {
              let documentos = ''
              record.judicialObsFile.forEach((obsFiles) => {
                documentos = documentos + obsFiles.originalName + ' | '
              })
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                  <BodyCell textAlign="center">
                    {moment(record.date.split('T')[0]).format('DD-MM-YYYY') || '-'}
                  </BodyCell>
                  <BodyCell textAlign="center">{record.judicialObsType.type || '-'}</BodyCell>
                  <BodyCell textAlign="center">
                    <Container
                      margin="20px 0"
                      minWidth="300px"
                      maxHeight="130px"
                      whiteSpace="normal"
                      wordBreak="break-all"
                      overFlowY="auto"
                    >
                      {record.comment || '-'}
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    <Container
                      margin="20px 0"
                      minWidth="300px"
                      maxHeight="130px"
                      whiteSpace="normal"
                      wordBreak="break-all"
                      overFlowY="auto"
                    >
                      {documentos}
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Container display="flex" gap="10px" justifyContent="space-around">
                        <Button
                          onClick={(event) => {
                            event.stopPropagation()
                            handleClickEdit(record.id)
                          }}
                          messageTooltip="Editar observación"
                          shape="round"
                          size="small"
                          leadingIcon="ri-pencil-fill"
                          permission="P13-01-02-02"
                        />
                        <Button
                          onClick={() => {
                            handleClickDelete(record.id, record.judicialObsFile.length)
                          }}
                          messageTooltip="Eliminar observación"
                          shape="round"
                          size="small"
                          leadingIcon="ri-delete-bin-line"
                          permission="P13-01-02-03"
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

      <JudicialObservationModal
        clientCode={clientCode}
        visible={visibleModalJudicialObservation}
        onClose={onCloseModalEdit}
        idObservation={idEdit}
        isEdit
        judicialFileCaseId={judicialFileCaseId}
      />
      <RemoveJudicialObservationModal
        visible={visibleDeleteJudicialObservation}
        onClose={onCloseModalDelete}
        idObservation={idDeletedObservation}
        judicialFileCaseId={judicialFileCaseId}
        clientCode={clientCode}
        countFilesDelete={filesDelete}
      />
    </Container>
  )
}

export default JudicialObservationTable
