import { Dispatch, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { getAll } from '../../../../shared/services/negotiation.service'
import { NegotiationType } from '../../../../shared/types/negotiation.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Table'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import { negotiationColumns } from './utils/columns'
import { KEY_DASH_NEGOTIATION_CACHE } from './utils/dash-cobranza.cache'

type NegotiationTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  selectedBank: { chb: number; setChbGlobal: (chb: number) => void }
}

const NegotiationTable = ({ opts, setOpts, selectedBank: { chb, setChbGlobal } }: NegotiationTableProps) => {
  const [negotiations, setNegotiations] = useState<Array<NegotiationType>>([])
  const [negotiationCount, setNegotiationCount] = useState(0)

  const paintTable = (negotiationTemp: NegotiationType[]) => {
    if (chb !== 0) {
      negotiationTemp = negotiationTemp.filter((filt: NegotiationType) => filt.customerHasBankId === chb)
    }

    if (opts.filter !== '') {
      negotiationTemp = negotiationTemp.filter((filt: NegotiationType) => {
        return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
      })
    }

    // setNegotiationCount(negotiationTemp.length)
    negotiationTemp = negotiationTemp.slice((opts.page - 1) * opts.limit, opts.limit * opts.page - 1)

    return negotiationTemp.map((record: NegotiationType) => {
      return (
        <tr className="styled-data-table-row" key={record.id}>
          <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
          <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
          <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
          <BodyCell textAlign="center">{`${record.customerHasBankId || ''}`}</BodyCell>
        </tr>
      )
    })
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

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

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
        {!!negotiationCount && paintTable(negotiations)}
      </Table>
    </Container>
  )
}

export default NegotiationTable
