import Container from "@/ui/Container"
import JudicialNotaryActions from "./JudicialCollateralFilesActions"
import JudicialNotaryTable from "./JudicialCollateralFilesTable"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { AxiosResponse } from "axios"
import { getFileCaseByNumberFile } from "@/services/judicial/judicial-file-case.service"
import notification from "@/ui/notification"
import { useLoloContext } from "@/contexts/LoloProvider"

const JudicialCollateralFiles = () => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
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
    <Container width="100%" height="100%" display="flex" flexDirection="column" alignItems="center">
      <JudicialNotaryActions clientName={clientName}/>
      <JudicialNotaryTable />
    </Container> 
  )
}

export default JudicialCollateralFiles