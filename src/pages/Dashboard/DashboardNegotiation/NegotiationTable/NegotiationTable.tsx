import { Dispatch, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { getAll, getAllNegociacionesByCHB } from '../../../../shared/services/negotiation.service'
import { NegotiationType } from '../../../../shared/types/negotiation.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Table'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import { negotiationColumns } from './utils/columns'
import { KEY_DASH_NEGOTIATION_CACHE } from './utils/dash-cobranza.cache'
import Button from '../../../../ui/Button'
import NegotiationModal from '../Modals/NegotiationModal'
import useModal from '../../../../shared/hooks/useModal'
import DeleteNegotiationModal from '../Modals/DeleteNegotiationModal/DeleteNegotiationModal'

type NegotiationTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChbGlobal: (chb: number) => void }
}

const NegotiationTable = ({ opts, setOpts, selectedBank: { chb, setChbGlobal } }: NegotiationTableProps) => {
  const [negotiations, setNegotiations] = useState<Array<NegotiationType>>([])
  const [negotiationCount, setNegotiationCount] = useState(0)
  const [negotiationId, setNegotiationId] = useState<number>()
  const [table, setTable] = useState<JSX.Element[]>()
  const { visible: visibleModalEdit, showModal: showModalEdit, hideModal: hideModalEdit } = useModal()
  const { visible: visibleDeleteNegotiation, showModal: showDeleteNegotiation, hideModal: hideDeleteNegotiation } = useModal()

  const paintTable = (negotiationTemp: NegotiationType[]) => {
    if (opts.filter !== '') {
      negotiationTemp = negotiationTemp.filter((filt: NegotiationType) => {
        return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
      })
    }

    setNegotiationCount(negotiationTemp.length)
    negotiationTemp = negotiationTemp.slice((opts.page - 1) * opts.limit, opts.limit * opts.page - 1)

    setTable(
      negotiationTemp.map((record: NegotiationType) => {
        return (
          <tr className="styled-data-table-row" key={record.id}>
            <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
            <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
            <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
            <BodyCell textAlign="center">{`${record.customerHasBankId || ''}`}</BodyCell>
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
      })
    )
  }

  const handleClickButtonEdit = (id: number) => {
    setNegotiationId(id)
    showModalEdit()
  }

  const handleClickDeleteNegotiation = (id: number) => {
    setNegotiationId(id)
    showDeleteNegotiation()
  }

  const { isLoading, refetch } = useQuery(
    KEY_DASH_NEGOTIATION_CACHE,
    async () => {
      return await getAll()
    },
    {
      onSuccess: ({ data }) => {
        setNegotiationCount(data.length)
        setNegotiations(data)
      },
      enabled: false,
    }
  )

  const { isLoading: isLoadingCHB, refetch: refetchCHB } = useQuery(
    'get-allby-chb',
    async () => {
      return await getAllNegociacionesByCHB(String(chb))
    },
    {
      onSuccess: ({ data }) => {
        setNegotiationCount(data.length)
        setNegotiations(data)
      },
      enabled: false,
    }
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (chb !== 0) refetchCHB()
    // eslint-disable-next-line
  }, [chb])

  useEffect(() => {
    paintTable(negotiations)
    // eslint-disable-next-line
  }, [negotiations, opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={negotiationCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={negotiationColumns}
        loading={isLoading || isLoadingCHB}
        isArrayEmpty={!negotiationCount}
        emptyState={
          <EmptyStateCell colSpan={negotiationCount}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!negotiationCount && table}
      </Table>
      <DeleteNegotiationModal visible={visibleDeleteNegotiation} onClose={hideDeleteNegotiation} idUser={negotiationId}/>
      <NegotiationModal visible={visibleModalEdit} onClose={hideModalEdit} idNegotiation={negotiationId} isEdit />
    </Container>
  )
}

export default NegotiationTable
