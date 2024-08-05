import { useLoloContext } from "@/contexts/LoloProvider"
import { getFileCaseByNumberFile } from "@/services/judicial/judicial-file-case.service"
import Container from "@/ui/Container"
import notification from "@/ui/notification"
import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import JudicialFileCaseAuctionRoundListActions from './JudicialFileCaseAuctionRoundListActions/JudicialFileCaseAuctionRoundListActions';
import JudicialFileCaseAuctionRoundListTable from './JudicialFileCaseAuctionRoundListTable/JudicialFileCaseAuctionRoundListTable';

const JudicialFileCaseAuctionRoundList = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-collateral-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '', Number(chb))
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
  const caseFileId = data?.data.id

  return (
    <Container width="100%" height="Calc(100% - 50px)" display="flex" flexDirection="column">
      <JudicialFileCaseAuctionRoundListActions clientName = {clientName} />
      <JudicialFileCaseAuctionRoundListTable caseFileId = {caseFileId} />
    </Container>
  )
}

export default JudicialFileCaseAuctionRoundList