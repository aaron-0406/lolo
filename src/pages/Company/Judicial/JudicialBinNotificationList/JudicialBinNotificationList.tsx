import Container from "@/ui/Container"
import JudicialBinNotificationListActions from "./JudicialBinNotificationListActions"
import JudicialBinNotificationListTable from "./JudicialBinNotificationListTable"
import notification from "@/ui/notification"
import { getFileCaseByNumberFile } from "@/services/judicial/judicial-file-case.service"
import { useQuery } from "react-query"
import { AxiosResponse } from "axios"
import { useLoloContext } from "@/contexts/LoloProvider"
import { useLocation, useParams } from "react-router-dom"

const JudicialBinNotificationList = () => {
  const codeParams = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', relatedProcessCodeParams ? relatedProcessCodeParams : codeParams],
    async () => {
      return await getFileCaseByNumberFile(
        relatedProcessCodeParams ? relatedProcessCodeParams : codeParams,
        Number(idCHB)
      )
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
    <Container width="100%" height="calc(100% - 50px)" display="flex" flexDirection="column">
      <JudicialBinNotificationListActions  clientName={clientName} />
      <JudicialBinNotificationListTable />
    </Container>
  )
}

export default JudicialBinNotificationList