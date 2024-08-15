import Button from '@/ui/Button'
import Text from '@/ui/Text'
import DeleteJudicialBinnacleModal from '../Modals/DeleteJudicialBinnacleModal'
import JudicialBinnacleModal from '../Modals/JudicialBinnacleModal'
import BodyCell from '@/ui/Table/BodyCell'
import Container from '@/ui/Container'
import moment from 'moment'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import useModal from '@/hooks/useModal'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE } from './utils/judicial-binnacle.cache'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { getBinnacleByFileCase } from '@/services/judicial/judicial-binnacle.service'
import notification from '@/ui/notification'
import EmptyState from '@/ui/EmptyState'
import { judicialBinnacleColumns } from './utils/columns'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useLocation } from 'react-router-dom'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import Icon from '@/ui/Icon'
import JudicialBinnacleTariffModal from '../Modals/JudicialBinnacleTariffModal'

type JudicialBinnacleTableProps = {
  judicialFileCaseId?: number
  clientCode: string
  amountDemanded?: string
}

const JudicialBinnacleTable = ({ judicialFileCaseId, clientCode, amountDemanded }: JudicialBinnacleTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedComment, setIdDeletedComment] = useState<number>(0)
  const location = useLocation()
  const currentPath = location.pathname
  const {
    sorting: { getSortingOptions, setSortingOptions },
  } = useFiltersContext()

  const sortingOptions = getSortingOptions(currentPath)?.opts ?? { sortBy: '', order: 'ASC' }

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
  const {
    visible: visibleModalJudicialBinTariff,
    showModal: showModalJudicialBinTariff,
    hideModal: hideModalJudicialBinTariff,
  } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalJudicialBinProceduralStage()
  }

  const handleClickTariff = (id: number) => {
    showModalJudicialBinTariff()
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
  
  const onChangeSortingOptions = (sortBy: string, order: 'ASC' | 'DESC') => {
    setSortingOptions({ url: currentPath, opts: { sortBy, order } })
  }

  const { data, isLoading, refetch } = useQuery<
    AxiosResponse<
      Array<
        JudicialBinnacleType & {
          binnacleType: JudicialBinTypeBinnacleType
          judicialBinProceduralStage: JudicialBinProceduralStageType
          judicialBinDefendantProceduralAction: JudicialBinDefendantProceduralActionType
          judicialBinFiles: JudicialBinFileType[]
        }
      >,
      Error
    >
  >(
    [KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId],
    async () => {
      return await getBinnacleByFileCase(judicialFileCaseId ?? 0, sortingOptions)
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
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingOptions.order])

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="0px 20px 0px 20px">
      <Table
        top="190px"
        columns={judicialBinnacleColumns}
        loading={isLoading}
        isArrayEmpty={!binnacles.length}
        onChangeSortingOptions={onChangeSortingOptions}
        emptyState={
          <EmptyStateCell colSpan={judicialBinnacleColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron bitacoras registradas" />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialBinnacleColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron bitacoras registradas" />
          </EmptyStateCell>
        }
      >
        {!!binnacles?.length &&
          binnacles.map(
            (
              record: JudicialBinnacleType & {
                binnacleType: JudicialBinTypeBinnacleType
                judicialBinProceduralStage: JudicialBinProceduralStageType
                judicialBinDefendantProceduralAction: JudicialBinDefendantProceduralActionType
                judicialBinFiles: JudicialBinFileType[]
              },
              key
            ) => {
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                  <BodyCell textAlign="left">
                    <Container
                      margin="20px 0"
                      minWidth="100px"
                      maxHeight="130px"
                      whiteSpace="normal"
                      wordBreak="break-all"
                      overFlowY="auto"
                    >
                      {record?.binnacleType?.typeBinnacle || '-'}
                    </Container>
                  </BodyCell>
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
                        {record?.lastPerformed || '-'}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">{record?.judicialBinProceduralStage?.proceduralStage || '-'}</BodyCell>
                  <BodyCell textAlign="center">
                    {record.judicialBinFiles.length ? (
                      <Container display="flex" gap="10px" justifyContent="center" alignItems="center">
                        <Text.Body size="l" weight="regular">
                          {record.judicialBinFiles.length ?? '-'}
                        </Text.Body>
                        <Icon remixClass="ri-file-text-line" color="Neutral6" />
                      </Container>
                    ) : (
                      <Text.Body size="m" weight="regular">
                        No hay archivos
                      </Text.Body>
                    )}
                  </BodyCell>
                  <BodyCell textAlign="center">{moment(record.date.split('T')[0]).format('DD-MM-YYYY') || ''}</BodyCell>
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
                          messageTooltip="Ver cuadro de tarifas"
                          shape="round"
                          size="small"
                          leadingIcon="ri-table-fill"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleClickTariff(record.id)
                          }}
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
      {visibleModalJudicialBinProceduralStage ? (
        <JudicialBinnacleModal
          clientCode={clientCode}
          visible={visibleModalJudicialBinProceduralStage}
          onClose={onCloseModalEdit}
          idBinnacle={idEdit}
          isEdit
          judicialFileCaseId={judicialFileCaseId}
        />
      ) : null}
      {visibleDeleteJudicialBinProceduralStage ? (
        <DeleteJudicialBinnacleModal
          visible={visibleDeleteJudicialBinProceduralStage}
          onClose={onCloseModalDelete}
          idBinnacle={idDeletedComment}
          judicialFileCaseId={judicialFileCaseId}
          clientCode={clientCode}
        />
      ) : null}
      {visibleModalJudicialBinTariff ? (
        <JudicialBinnacleTariffModal
          amountDemanded={amountDemanded}
          visible={visibleModalJudicialBinTariff}
          onClose={hideModalJudicialBinTariff}
        />
      ) : null}

    </Container>
  )
}

export default JudicialBinnacleTable
