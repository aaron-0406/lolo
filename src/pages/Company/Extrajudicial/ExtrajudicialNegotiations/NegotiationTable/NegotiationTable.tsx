import { Dispatch, useState } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import { negotiationColumns } from './utils/columns'
import { KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE } from './utils/ext-negociaciones.cache'
import Button from '@/ui/Button'
import NegotiationModal from '../Modals/NegotiationModal'
import useModal from '@/hooks/useModal'
import DeleteNegotiationModal from '../Modals/DeleteNegotiationModal/DeleteNegotiationModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import EmptyState from '@/ui/EmptyState'

type NegotiationTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const NegotiationTable = ({ opts, setOpts }: NegotiationTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

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

  const { isLoading, data } = useQuery(
    [KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAllNegociacionesByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  let result = data?.data ?? []
  if (opts.filter !== '') {
    result = result.filter((filt: NegotiationType) => {
      return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
    })
  }
  const negotiations = result

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={negotiations.length} opts={opts} setOpts={setOpts} />
      <Table
        top="220px"
        columns={negotiationColumns}
        loading={isLoading}
        isArrayEmpty={!negotiations.length}
        emptyState={
          <EmptyStateCell colSpan={negotiationColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontraron negociaciones, por favor seleccione otros filtros."
              buttonLabel="Limpiar filtros"
              buttonAction={() => {}}
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={negotiationColumns.length}>
            <EmptyState title="No hay recursos disponibles" description="No se encontraron negociaciones" />
          </EmptyStateCell>
        }
      >
        {!!negotiations?.length &&
          negotiations.map((record: NegotiationType, key: number) => {
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
                        permission="P09-02"
                      />
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickDeleteNegotiation(record.id)
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

      <DeleteNegotiationModal
        visible={visibleDeleteNegotiation}
        onClose={onCloseDeleteNegotiation}
        idNegociation={idDeletedNegotiation}
      />
      <NegotiationModal visible={visibleModalEdit} onClose={onCloseModal} idNegotiation={negotiationId} isEdit />
    </Container>
  )
}

export default NegotiationTable
