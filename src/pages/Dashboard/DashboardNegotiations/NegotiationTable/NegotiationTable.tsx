import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { getAllNegociacionesByCHB } from '../../../../shared/services/negotiation.service'
import { NegotiationType } from '../../../../shared/types/negotiation.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Table'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import { negotiationColumns } from './utils/columns'
import { KEY_DASH_NEGOCIACIONES_CACHE } from './utils/dash-negociaciones.cache'
import Button from '../../../../ui/Button'
import NegotiationModal from '../Modals/NegotiationModal'
import useModal from '../../../../shared/hooks/useModal'
import DeleteNegotiationModal from '../Modals/DeleteNegotiationModal/DeleteNegotiationModal'

type NegotiationTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChb: (chb: number) => void }
}

const NegotiationTable = ({ opts, setOpts, selectedBank: { chb } }: NegotiationTableProps) => {
  const [negotiations, setNegotiations] = useState<Array<NegotiationType>>([])
  const [negotiationId, setNegotiationId] = useState<number>(0)
  const [idDeletedNegotiation, setIdDeletedNegotiation] = useState<number>(0)

  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const {
    visible: visibleDeleteNegotiation,
    showModal: showDeleteNegotiation,
    hideModal: hideDeleteNegotiation,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setNegotiationId(id)
    showModalEdit()
  }

  const handleClickDeleteNegotiation = (id: number) => {
    setIdDeletedNegotiation(id)
    showDeleteNegotiation()
  }

  const onCloseDeleteNegotiation = () => {
    setIdDeletedNegotiation(0)
    hideDeleteNegotiation()
  }

  const onCloseModal = () => {
    setNegotiationId(0)
    hideModalEdit()
  }

  const { isLoading } = useQuery(
    [KEY_DASH_NEGOCIACIONES_CACHE, chb],
    async () => {
      return await getAllNegociacionesByCHB(chb)
    },
    {
      onSuccess: ({ data }) => {
        if (opts.filter !== '') {
          data = data.filter((filt: NegotiationType) => {
            return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
        }
        setNegotiations(data)
      },
    }
  )

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={negotiations.length} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={negotiationColumns}
        loading={isLoading}
        isArrayEmpty={!negotiations.length}
        emptyState={
          <EmptyStateCell colSpan={negotiationColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!negotiations?.length &&
          negotiations.map((record: NegotiationType, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.name || ''}`}</BodyCell>
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
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteNegotiation(record.id)
                        }}
                        messageTooltip="Eliminar Negociación"
                        shape="round"
                        size="small"
                        leadingIcon="ri-user-unfollow-fill"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <DeleteNegotiationModal
        visible={visibleDeleteNegotiation}
        onClose={onCloseDeleteNegotiation}
        idNegociation={idDeletedNegotiation}
        chb={chb}
      />
      <NegotiationModal
        visible={visibleModalEdit}
        onClose={onCloseModal}
        idNegotiation={negotiationId}
        chb={chb}
        isEdit
      />
    </Container>
  )
}

export default NegotiationTable
