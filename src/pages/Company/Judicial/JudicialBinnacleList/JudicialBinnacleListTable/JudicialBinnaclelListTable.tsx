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
import { useState } from 'react'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import EmptyState from '@/ui/EmptyState'
import { judicialBinnacleColumns } from './utils/columns'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import Icon from '@/ui/Icon'
import paths from 'shared/routes/paths'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider';
import JudicialBinnacleTariffModal from '../../JudicialBinnacle/Modals/JudicialBinnacleTariffModal'
import JudicialBinnacelTariffResumeModal from '../../JudicialBinnacle/Modals/JudicialBinnacelTariffResumeModal'

type JudicialBinnacleTableProps = {
  judicialFileCaseId?: number
  clientCode: string
  amountDemanded?: string
  amountAffection?: string
  comercialValue?: string
  binnacles: Array<
    JudicialBinnacleType & {
      binnacleType: JudicialBinTypeBinnacleType
      judicialBinProceduralStage: JudicialBinProceduralStageType
      judicialBinDefendantProceduralAction: JudicialBinDefendantProceduralActionType
      judicialBinFiles: JudicialBinFileType[]
    }
  >
  isLoading: boolean
}

const JudicialBinnacleTable = ({ judicialFileCaseId, clientCode, amountDemanded, binnacles, isLoading, amountAffection, comercialValue }: JudicialBinnacleTableProps) => {
  const [ selectedBinnacle, setSelectedBinnacle ] = useState<number>(0)
  const [tariffHistory, setTariffHistory] = useState<string>('')
  const location = useLocation()
  const code = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''

  const {
    client: { customer },
  } = useLoloContext()
  const currentPath = location.pathname
  const navigate = useNavigate()

  const {
    sorting: { setSortingOptions },
  } = useFiltersContext()


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
  const {
    visible: visibleModalJudicialBinnacelTariffResume,
    showModal: showModalJudicialBinnacelTariffResume,
    hideModal: hideModalJudicialBinnacelTariffResume,
  } = useModal()

  // const handleClickEdit = (id: number) => {
  //   setIdEdit(id)
  //   showModalJudicialBinProceduralStage()
  // }

  const handleClickEdit = (id: number) => {
    if (relatedProcessCodeParams) {
      navigate(paths.judicial.bitacoraDetallesRelatedProcess(customer.urlIdentifier, code, relatedProcessCodeParams, id.toString()))
    } else {
      navigate(paths.judicial.bitacoraDetalles(customer.urlIdentifier, code, id.toString()))
    }
  }

  const onCloseModalEdit = () => {
    setSelectedBinnacle(0)
    hideModalJudicialBinProceduralStage()
  }

  const handleClickDelete = (id: number) => {
    setSelectedBinnacle(id)
    showDeleteJudicialBinProceduralStage()
  }

  const onCloseModalDelete = () => {
    setSelectedBinnacle(0)
    hideDeleteJudicialBinProceduralStage()
  }
  
  const onChangeSortingOptions = (sortBy: string, order: 'ASC' | 'DESC') => {
    setSortingOptions({ url: currentPath, opts: { sortBy, order } })
  }

  const handleClickTariff = (id: number) => {
    setSelectedBinnacle(id)
    showModalJudicialBinTariff()
  }

  const onCloseModalTariff = () => {
    setSelectedBinnacle(0)
    hideModalJudicialBinTariff()
  }

  const handleClickTariffResume = (tariffHistory: string) => {
    setTariffHistory(tariffHistory)
    showModalJudicialBinnacelTariffResume()
  }
  const onCloseModalTariffResume = () => {
    setTariffHistory('')
    hideModalJudicialBinnacelTariffResume()
  }



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
                  <BodyCell textAlign="center">S/. {Number(record?.totalTariff ?? '0').toFixed(2) || '0.00'}</BodyCell>
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
                  <BodyCell textAlign="center">{record.createdBy ?? 'USER'}</BodyCell>
                  <BodyCell textAlign="center">
                    {!record.createdBy
                      ? moment(record.date.split('T')[0]).format('DD-MM-YYYY') ?? ''
                      : record.binnacleType.typeBinnacle === 'RESOLUCION'
                        ? moment(record.resolutionDate?.split('T')[0]).format('DD-MM-YYYY')
                        : moment(record.entryDate?.split('T')[0]).format('DD-MM-YYYY') ?? ''}
                  </BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Container display="flex" gap="5px" justifyContent="start">
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
                          permission={relatedProcessCodeParams ? 'P13-01-05-01-01-04' : 'P13-01-01-04'}
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
                            handleClickTariffResume(record?.tariffHistory ?? '')
                          }}
                          permission={relatedProcessCodeParams ? 'P13-01-05-01-01-05' : 'P13-01-01-05'}
                          messageTooltip="Ver tarifas asignadas"
                          shape="round"
                          size="small"
                          leadingIcon="ri-file-text-line"
                        />
                        {/* {!record.createdBy ? (
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
                        ) : null} */}
                          <Button
                            onClick={() => {
                              handleClickDelete(record.id)
                            }}
                            messageTooltip="Eliminar comentario"
                            shape="round"
                            size="small"
                            leadingIcon="ri-delete-bin-line"
                            permission={record.createdBy ? "P13-01-01-07" : "P02-02-01-03"}
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
          idBinnacle={selectedBinnacle}
          isEdit
          judicialFileCaseId={judicialFileCaseId}
        />
      ) : null}
      {visibleDeleteJudicialBinProceduralStage ? (
        <DeleteJudicialBinnacleModal
          visible={visibleDeleteJudicialBinProceduralStage}
          onClose={onCloseModalDelete}
          idBinnacle={selectedBinnacle}
          judicialFileCaseId={judicialFileCaseId}
          clientCode={clientCode}
        />
      ) : null}
      {visibleModalJudicialBinTariff ? (
        <JudicialBinnacleTariffModal
        clientCode={clientCode}
        JudicialFileCaseId={judicialFileCaseId}
        amountDemanded={amountDemanded}
        amountAffection={amountAffection}
        comercialValue={comercialValue}
        visible={visibleModalJudicialBinTariff}
        onClose={onCloseModalTariff}
          idBinnacle={selectedBinnacle}
        />
      ) : null}
      {visibleModalJudicialBinnacelTariffResume ? (
        <JudicialBinnacelTariffResumeModal
          visible={visibleModalJudicialBinnacelTariffResume}
          onClose={onCloseModalTariffResume}
          tariffHistory={tariffHistory}
        />
      ) : null}

    </Container>
  )
}

export default JudicialBinnacleTable
