import Container from '@/ui/Container'
import JudicialBinnacleTable from './JudicialBinnacleTable'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import notification from '@/ui/notification'
import JudicialBinnacleInfo from './JudicialBinnacleInfo'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import { KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE } from './JudicialBinnacleTable/utils/judicial-binnacle.cache'
import { getBinnacleByFileCase } from '@/services/judicial/judicial-binnacle.service'
import { useEffect } from 'react'

const JudicialBinnacle = () => {
  const codeParams = useParams().code ?? ''
  const currentPath = useLocation().pathname
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const {
    sorting: { getSortingOptions },
  } = useFiltersContext()

  const sortingOptions = getSortingOptions(currentPath)?.opts ?? { sortBy: '', order: 'ASC' }

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

  const { data:binnacles, isLoading, refetch } = useQuery<
  AxiosResponse<
    Array<
      JudicialBinnacleType & {
        binnacleType: JudicialBinTypeBinnacleType
        judicialBinProceduralStage: JudicialBinProceduralStageType
        judicialBinDefendantProceduralAction: JudicialBinDefendantProceduralActionType
        judicialBinFiles: JudicialBinFileType[]
      }
    >,
    Error
  >
>(
  [KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, data?.data.id ?? 0],
  async () => {
    return await getBinnacleByFileCase(judicialFileCaseId ?? 0, sortingOptions)
  },
  {
    onError: (error: any) => {
      notification({
        type: 'error',
        message: error.response.data.message,
      })
    },
  }
)

useEffect(() => {
  refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [sortingOptions.order])

  const judicialFileCaseId = data?.data.id
  const clientCode = data?.data.client.code
  const clientName = data?.data.client.name
  const amountDemanded = data?.data?.amountDemandedSoles
  const binnaclesData = binnacles?.data ?? []

  return (
    <Container
      width="100%"
      height="calc(100% - 50px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <JudicialBinnacleInfo judicialFileCaseId={judicialFileCaseId} clientCode={clientCode} clientName={clientName} binnacles={binnaclesData} isLoading={isLoading} />
      <JudicialBinnacleTable judicialFileCaseId={judicialFileCaseId} clientCode={clientCode}  amountDemanded={amountDemanded} binnacles={binnaclesData} isLoading={isLoading} />
    </Container>
  )
}

export default JudicialBinnacle
