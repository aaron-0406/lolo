import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import { Opts } from '@/ui/Pagination/interfaces'
import { Dispatch, useState } from 'react'
import { KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE } from './utils/judicial-bin-procedural-stage.cache'
import { useQuery } from 'react-query'
import { getJudicialBinProceduralStageByCHB } from '@/services/judicial/judicial-bin-procedural-stage.service'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import Pagination from '@/ui/Pagination'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import moment from 'moment'
import Button from '@/ui/Button'
import JudicialBinProceduralStageModal from '../Modals/JudicialBinProceduralStageModal'
import DeleteJudicialBinProceduralStageModal from '../Modals/DeleteJudicialBinProceduralStageModal'
import { binProceduralStagesColumns } from './utils/columns'

type JudicialBinProceduralStageTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialBinProceduralStageTable = ({ opts, setOpts }: JudicialBinProceduralStageTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [binTypeBinnaleId, setBinProceduralStageId] = useState<number>(0)
  const [idDeletedJudicialBinProceduralStage, setIdDeletedJudicialBinProceduralStage] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeleteJudicialBinProceduralStage,
    showModal: showDeleteJudicialBinProceduralStage,
    hideModal: hideDeleteJudicialBinProceduralStage,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setBinProceduralStageId(id)
    showModalEdit()
  }

  const handleClickDeleteJudicialBinProceduralStage = (id: number) => {
    setIdDeletedJudicialBinProceduralStage(id)
    showDeleteJudicialBinProceduralStage()
  }

  const onCloseDeleteJudicialBinProceduralStage = () => {
    setIdDeletedJudicialBinProceduralStage(0)
    hideDeleteJudicialBinProceduralStage()
  }

  const onCloseModal = () => {
    setBinProceduralStageId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery(
    [KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialBinProceduralStageByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialBinProceduralStageType) => {
      return filt.proceduralStage.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }

  const binTypeBinnacles = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={binTypeBinnacles.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={binProceduralStagesColumns}
        loading={isLoading}
        isArrayEmpty={!binTypeBinnacles.length}
        emptyState={
          <EmptyStateCell colSpan={binProceduralStagesColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!binTypeBinnacles?.length &&
          binTypeBinnacles.map((record: JudicialBinProceduralStageType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.proceduralStage || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Negociación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P09-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteJudicialBinProceduralStage(record.id)
                        }}
                        messageTooltip="Eliminar Negociación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P09-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteJudicialBinProceduralStageModal
        visible={visibleDeleteJudicialBinProceduralStage}
        onClose={onCloseDeleteJudicialBinProceduralStage}
        idBinProceduralStage={idDeletedJudicialBinProceduralStage}
      />
      <JudicialBinProceduralStageModal
        visible={visibleModalEdit}
        onClose={onCloseModal}
        idBinProceduralStage={binTypeBinnaleId}
        isEdit
      />
    </Container>
  )
}

export default JudicialBinProceduralStageTable
