import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import { Opts } from '@/ui/Pagination/interfaces'
import { Dispatch, useState } from 'react'
import { KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE } from './utils/judicial-bin-defendant-procedural-action.cache'
import { useQuery } from 'react-query'
import { getJudicialBinDefendantProceduralActionByCHB } from '@/services/judicial/judicial-bin-defendant-procedural-action.service'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import Pagination from '@/ui/Pagination'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import moment from 'moment'
import Button from '@/ui/Button'
import JudicialBinDefendantProceduralActionModal from '../Modals/JudicialBinDefendantProceduralActionModal'
import DeleteJudicialBinDefendantProceduralActionModal from '../Modals/DeleteJudicialBinDefendantProceduralActionModal'
import { binDefendantProceduralActionsColumns } from './utils/columns'

type JudicialBinDefendantProceduralActionTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialBinDefendantProceduralActionTable = ({
  opts,
  setOpts,
}: JudicialBinDefendantProceduralActionTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [binTypeBinnaleId, setBinDefendantProceduralActionId] = useState<number>(0)
  const [idDeletedJudicialBinDefendantProceduralAction, setIdDeletedJudicialBinDefendantProceduralAction] =
    useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeleteJudicialBinDefendantProceduralAction,
    showModal: showDeleteJudicialBinDefendantProceduralAction,
    hideModal: hideDeleteJudicialBinDefendantProceduralAction,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setBinDefendantProceduralActionId(id)
    showModalEdit()
  }

  const handleClickDeleteJudicialBinDefendantProceduralAction = (id: number) => {
    setIdDeletedJudicialBinDefendantProceduralAction(id)
    showDeleteJudicialBinDefendantProceduralAction()
  }

  const onCloseDeleteJudicialBinDefendantProceduralAction = () => {
    setIdDeletedJudicialBinDefendantProceduralAction(0)
    hideDeleteJudicialBinDefendantProceduralAction()
  }

  const onCloseModal = () => {
    setBinDefendantProceduralActionId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery(
    [KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialBinDefendantProceduralActionByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialBinDefendantProceduralActionType) => {
      return filt.defendantProceduralAction.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }

  const binDefendantProceduralActions = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={binDefendantProceduralActions.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={binDefendantProceduralActionsColumns}
        loading={isLoading}
        isArrayEmpty={!binDefendantProceduralActions.length}
        emptyState={
          <EmptyStateCell colSpan={binDefendantProceduralActionsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!binDefendantProceduralActions?.length &&
          binDefendantProceduralActions.map((record: JudicialBinDefendantProceduralActionType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.defendantProceduralAction || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Actuación Procesal Demandado"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P09-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteJudicialBinDefendantProceduralAction(record.id)
                        }}
                        messageTooltip="Eliminar Actuación Procesal Demandado"
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

      <DeleteJudicialBinDefendantProceduralActionModal
        visible={visibleDeleteJudicialBinDefendantProceduralAction}
        onClose={onCloseDeleteJudicialBinDefendantProceduralAction}
        idBinDefendantProceduralAction={idDeletedJudicialBinDefendantProceduralAction}
      />
      <JudicialBinDefendantProceduralActionModal
        visible={visibleModalEdit}
        onClose={onCloseModal}
        idBinDefendantProceduralAction={binTypeBinnaleId}
        isEdit
      />
    </Container>
  )
}

export default JudicialBinDefendantProceduralActionTable
