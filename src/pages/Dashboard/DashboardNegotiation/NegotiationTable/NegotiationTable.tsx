import { Dispatch, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { getAllPage, getAllNegociacionesByCHB } from '../../../../shared/services/negotiation.service'
import { NegotiationType } from '../../../../shared/types/negotiation.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Tables/Table'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'
import { negotiationColumns } from './utils/columns'

type NegotiationTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChbGlobal: (chb: number) => void }
}

const NegotiationTable = ({ opts, setOpts, selectedBank: { chb, setChbGlobal } }: NegotiationTableProps) => {
  const [negotiations, setNegotiations] = useState<Array<NegotiationType>>([])
  const [negotiationCount, setNegotiationCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { refetch } = useQuery(
    'get-all-page',
    async () => {
      return await getAllPage(opts.page, opts.limit)
    },
    {
      onSuccess: ({ data }) => {
        setNegotiationCount(data.quantity)
        if (opts.filter !== '') {
          data.rta = data.rta.filter((filt: NegotiationType) => {
            return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
          setNegotiationCount(data.rta.length)
        }
        setNegotiations(data.rta)
        setIsLoading(false)
      },
      enabled: false,
    }
  )
  const { refetch: refetchChb } = useQuery(
    'get-all-negociaciones-by-chb',
    async () => {
      return await getAllNegociacionesByCHB(String(chb))
    },
    {
      onSuccess: ({ data }) => {
        setNegotiationCount(data.length)
        if (opts.filter !== '') {
          data = data.filter((filt: NegotiationType) => {
            return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
          setNegotiationCount(data.length)
        }
        setNegotiations(data)
        setIsLoading(false)
      },
      enabled: false,
    }
  )

  useEffect(() => {
    if (chb !== 0) {
      refetchChb()
    } else {
      refetch()
    }
  }, [refetch, isLoading, opts, refetchChb, chb])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={negotiationCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={negotiationColumns}
        loading={isLoading}
        isArrayEmpty={!negotiationCount}
        emptyState={
          <EmptyStateCell colSpan={negotiationCount}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!negotiationCount &&
          negotiations.map((record: NegotiationType) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.customerHasBankId || ''}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default NegotiationTable
