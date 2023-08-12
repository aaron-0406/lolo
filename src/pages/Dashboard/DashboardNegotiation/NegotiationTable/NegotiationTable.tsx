import { Dispatch, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import { getAllPage } from '../../../../shared/services/negotiation.service'
import { NegotiationType } from '../../../../shared/types/negotiation.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Table'
import EmptyStateCell from '../../../../ui/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Table/BodyCell'
import { negotiationColumns } from './utils/columns'

type NegotiationTableType = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const NegotiationTable = ({ opts, setOpts }: NegotiationTableType) => {
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
        if (opts.filter !== '') {
          data = data.filter((filt: NegotiationType) => {
            return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
        }
        setNegotiations(data.rta)
        setNegotiationCount(data.quantity)
        setIsLoading(false)
      },
      enabled: false,
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch, isLoading, opts])

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
