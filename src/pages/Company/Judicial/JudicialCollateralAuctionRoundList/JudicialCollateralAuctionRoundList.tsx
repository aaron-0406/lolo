import Container from '@/ui/Container'
import JudicialCollateralAuctionRoundListActions from './JudicialCollateralAuctionRoundListActions'
import JudicialCollateralAuctionRoundListTable from './JudicialCollateralAuctionRoundListTable'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import notification from '@/ui/notification'

const JudicialCollateralAuctionRoundList = () => {
  const codeParams = useParams().code ?? ''
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '', Number(idCHB))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const clientName = data?.data.client.name
  return (
    <Container width="100%" height="100%" display='flex' flexDirection='column' gap="10px">
      <JudicialCollateralAuctionRoundListActions clientName={ clientName } />
      <JudicialCollateralAuctionRoundListTable />
    </Container> 
  )
}

export default JudicialCollateralAuctionRoundList