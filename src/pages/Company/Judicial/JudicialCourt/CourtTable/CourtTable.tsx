import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { courtColumns } from './utils/columns'
import Button from '@/ui/Button'
import CourtModal from '../Modals/CourtModal'
import useModal from '@/hooks/useModal'
import DeleteCourtModal from '../Modals/DeleteCourtModal/DeleteCourtModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_JUDICIAL_COURTS_CACHE } from './utils/judicial-court.cache'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import { getCourtByCHB } from '@/services/judicial/judicial-court.service'

type CourtTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CourtTable = ({ opts, setOpts }: CourtTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [negotiationId, setCourtId] = useState<number>(0)
  const [idDeletedCourt, setIdDeletedCourt] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const { visible: visibleDeleteCourt, showModal: showDeleteCourt, hideModal: hideDeleteCourt } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setCourtId(id)
    showModalEdit()
  }

  const handleClickDeleteCourt = (id: number) => {
    setIdDeletedCourt(id)
    showDeleteCourt()
  }

  const onCloseDeleteCourt = () => {
    setIdDeletedCourt(0)
    hideDeleteCourt()
  }

  const onCloseModal = () => {
    setCourtId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery([KEY_JUDICIAL_COURTS_CACHE, parseInt(chb.length ? chb : '0')], async () => {
    return await getCourtByCHB(parseInt(chb.length ? chb : '0'))
  })

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialCourtType) => {
      return filt.court.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }
  const courts = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={courts.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={courtColumns}
        loading={isLoading}
        isArrayEmpty={!courts.length}
        emptyState={
          <EmptyStateCell colSpan={courtColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!courts?.length &&
          courts.map((record: JudicialCourtType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.court || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Juzgado"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P20-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteCourt(record.id)
                        }}
                        messageTooltip="Eliminar Juzgado"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P20-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteCourtModal visible={visibleDeleteCourt} onClose={onCloseDeleteCourt} idCourt={idDeletedCourt} />
      <CourtModal visible={visibleModalEdit} onClose={onCloseModal} idCourt={negotiationId} isEdit />
    </Container>
  )
}

export default CourtTable
