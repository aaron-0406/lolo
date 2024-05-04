import Button from '@/ui/Button'
import DeleteJudicialBinnacleModal from '../Modals/DeleteJudicialBinnacleModal'
import JudicialBinnacleModal from '../Modals/JudicialBinnacleModal'
import BodyCell from '@/ui/Table/BodyCell'
import Container from '@/ui/Container'
import moment from 'moment'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import useModal from '@/hooks/useModal'
import Text from '@/ui/Text'
import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE } from './utils/judicial-binnacle.cache'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { getBinnacleByFileCase } from '@/services/judicial/judicial-binnacle.service'
import notification from '@/ui/notification'
import { judicialBinnacleColumns } from './utils/columns'

type JudicialBinnacleTableProps = {
  judicialFileCaseId?: number
  clientCode: string
  clientName: string
}

const JudicialBinnacleTable = ({ judicialFileCaseId, clientCode, clientName }: JudicialBinnacleTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedComment, setIdDeletedComment] = useState<number>(0)


  const {
    visible: visibleModalJudicialBinProceduralStage,
    showModal: showModalJudicialBinProceduralStage,
    hideModal: hideModalJudicialBinProceduralStage,
  } = useModal()
  const {
    visible: visibleDeleteJudicialBinProceduralStage,
    showModal: showDeleteJudicialBinProceduralStage,
    hideModal: hideDeleteJudicialBinProceduralStage,
  } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalJudicialBinProceduralStage()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalJudicialBinProceduralStage()
  }

  const handleClickDelete = (id: number) => {
    setIdDeletedComment(id)
    showDeleteJudicialBinProceduralStage()
  }

  const onCloseModalDelete = () => {
    setIdDeletedComment(0)
    hideDeleteJudicialBinProceduralStage()
  }

  const { data, isLoading } = useQuery<
    AxiosResponse<
      Array<
        JudicialBinnacleType & {
          binnacleType: JudicialBinTypeBinnacleType
          judicialBinProceduralStage: JudicialBinProceduralStageType
        }
      >,
      Error
    >
  >(
    [KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId],
    async () => {
      return await getBinnacleByFileCase(judicialFileCaseId ?? 0)
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

  const binnacles = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Container padding="10px" width="100%" margin="0px 0px 10px 0px" backgroundColor="#eff0f6ff">
        <Text.Body size="m" weight="regular">
          {clientName ?? '-'}
        </Text.Body>
      </Container>

      <Table
        top="195px"
        columns={judicialBinnacleColumns}
        loading={isLoading}
        isArrayEmpty={!binnacles.length}
        emptyState={
          <EmptyStateCell colSpan={judicialBinnacleColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!binnacles?.length &&
          binnacles.map(
            (
              record: JudicialBinnacleType & {
                binnacleType: JudicialBinTypeBinnacleType
                judicialBinProceduralStage: JudicialBinProceduralStageType
              },
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
                      {record.binnacleType.typeBinnacle || ''}
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">{record.judicialBinProceduralStage.proceduralStage || ''}</BodyCell>
                  <BodyCell textAlign="center">{moment(record.date).format('DD-MM-YYYY') || ''}</BodyCell>
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

      <JudicialBinnacleModal
        clientCode={clientCode}
        visible={visibleModalJudicialBinProceduralStage}
        onClose={onCloseModalEdit}
        idBinnacle={idEdit}
        isEdit
        judicialFileCaseId={judicialFileCaseId}
      />
      <DeleteJudicialBinnacleModal
        visible={visibleDeleteJudicialBinProceduralStage}
        onClose={onCloseModalDelete}
        idBinnacle={idDeletedComment}
        judicialFileCaseId={judicialFileCaseId}
        clientCode={clientCode}
      />
    </Container>
  )
}

export default JudicialBinnacleTable
