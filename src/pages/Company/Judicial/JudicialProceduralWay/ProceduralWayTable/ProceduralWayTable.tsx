import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { proceduralWayColumns } from './utils/columns'
import Button from '@/ui/Button'
import ProceduralWayModal from '../Modals/ProceduralWayModal'
import useModal from '@/hooks/useModal'
import DeleteProceduralWayModal from '../Modals/DeleteProceduralWayModal/DeleteProceduralWayModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import { getProceduralWayByCHB } from '@/services/judicial/judicial-procedural-way.service'
import { KEY_JUDICIAL_PROCEDURAL_WAY_CACHE } from './utils/judicial-procedural-way.cache'

type ProceduralWayTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const ProceduralWayTable = ({ opts, setOpts }: ProceduralWayTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [negotiationId, setProceduralWayId] = useState<number>(0)
  const [idDeletedProceduralWay, setIdDeletedProceduralWay] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeleteProceduralWay,
    showModal: showDeleteProceduralWay,
    hideModal: hideDeleteProceduralWay,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setProceduralWayId(id)
    showModalEdit()
  }

  const handleClickDeleteProceduralWay = (id: number) => {
    setIdDeletedProceduralWay(id)
    showDeleteProceduralWay()
  }

  const onCloseDeleteProceduralWay = () => {
    setIdDeletedProceduralWay(0)
    hideDeleteProceduralWay()
  }

  const onCloseModal = () => {
    setProceduralWayId(0)
    hideModalEdit()
  }

  const { isLoading, data } = useQuery(
    [KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getProceduralWayByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: JudicialProceduralWayType) => {
      return filt.proceduralWay.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }
  const proceduralWays = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={proceduralWays.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={proceduralWayColumns}
        loading={isLoading}
        isArrayEmpty={!proceduralWays.length}
        emptyState={
          <EmptyStateCell colSpan={proceduralWayColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!proceduralWays?.length &&
          proceduralWays.map((record: JudicialProceduralWayType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.proceduralWay || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="15px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar Via Procedimental"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P09-02" //TODO: Change permission
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteProceduralWay(record.id)
                        }}
                        messageTooltip="Eliminar Via Procedimental"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P09-03" //TODO: Change permission
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteProceduralWayModal
        visible={visibleDeleteProceduralWay}
        onClose={onCloseDeleteProceduralWay}
        idNegociation={idDeletedProceduralWay}
      />
      <ProceduralWayModal visible={visibleModalEdit} onClose={onCloseModal} idProceduralWay={negotiationId} isEdit />
    </Container>
  )
}

export default ProceduralWayTable
