import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { judicialProcessColumns } from './utils/columns'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_JUDICIAL_PROCESS_REASON_CACHE } from './utils/judicial-process-reason.cache'

import ProcessReasonModal from '../Modals/ProcessReasonModal'
import DeleteProcessReasonModal from '../Modals/DeleteProcessReasonModal'

import EmptyState from '@/ui/EmptyState'

import { getAllProcessReasonByCHB } from '@/services/judicial/judicial-process-reason.service'
import { JudicialProcessReasonType } from '@/types/judicial/judicial-process-reason.types'

type ProcessReasonTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const ProcessReasonTable = ({ opts, setOpts }: ProcessReasonTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [processReasonId, setProcessReasonId] = useState<number>(0)
  const [idDeletedProcessReason, setIdDeletedProcessReason] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeleteProcessReason,
    showModal: showDeleteProcessReason,
    hideModal: hideDeleteProcessReason,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setProcessReasonId(id)
    showModalEdit()
  }

  const handleClickDeleteProcessReason = (id: number) => {
    setIdDeletedProcessReason(id)
    showDeleteProcessReason()
  }

  const onCloseDeleteProcessReason = () => {
    setIdDeletedProcessReason(0)
    hideDeleteProcessReason()
  }

  const onCloseModal = () => {
    setProcessReasonId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery(
    [KEY_JUDICIAL_PROCESS_REASON_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAllProcessReasonByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialProcessReasonType) => {
      return filt.reason.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }
  const processReasons = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={processReasons.length} opts={opts} setOpts={setOpts} />
      <Table
        top="230px"
        columns={judicialProcessColumns}
        loading={isLoading}
        isArrayEmpty={!processReasons.length}
        emptyState={
          <EmptyStateCell colSpan={judicialProcessColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron motivos, por favor seleccione otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={judicialProcessColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron motivos" />
          </EmptyStateCell>
        }
      >
        {!!processReasons?.length &&
          processReasons.map((record: JudicialProcessReasonType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.reason || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Motivo"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P21-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteProcessReason(record.id)
                        }}
                        messageTooltip="Eliminar Motivo"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P21-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteProcessReasonModal
        visible={visibleDeleteProcessReason}
        onClose={onCloseDeleteProcessReason}
        idProcessReason={idDeletedProcessReason}
      />
      <ProcessReasonModal visible={visibleModalEdit} onClose={onCloseModal} idProcessReason={processReasonId} isEdit />
    </Container>
  )
}

export default ProcessReasonTable
