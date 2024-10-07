import Container from '@/ui/Container'
import JudicialBinnacleActions from './JudicialBinnacleActions'
import JudicialBinnacleInfo from './JudicialBinnacleInfo'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialBinnacleResolver } from './JudicialBinnacleResolver.yup'
import moment from 'moment'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useParams } from 'react-router-dom'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import JudicialBinnacleModals from './JudicialBinnacleInfo/JudicialBinnacleModals'

const JudicialBinnacle = () => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const codeParams = useParams().code
  const relatedProcessCodeParams = useParams().relatedProcessCode


  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', (relatedProcessCodeParams ? relatedProcessCodeParams : codeParams) ?? '', Number(idCHB)],
    async () => {
      return await getFileCaseByNumberFile(
        (relatedProcessCodeParams ? relatedProcessCodeParams : codeParams) ?? '',
        Number(idCHB)
      )
    }
  )

  const formMethods = useForm<
  Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
    judicialBinFiles: JudicialBinFileType[]
    filesDnD: File[]
  }
>({
  resolver: JudicialBinnacleResolver,
  mode: 'all',
  defaultValues: {
    date: moment(new Date()).format('DD-MM-YYYY'),
    binnacleTypeId: 0,
    customerHasBankId: Number(idCHB),
    judicialBinProceduralStageId: 0,
    judicialFileCaseId: Number(data?.data.id),
    lastPerformed: '',
    tariffHistory: '',
    totalTariff: 0,
    judicialBinFiles: [],
    filesDnD: [],
  },
})

const judicialFileCaseId = data?.data.id
const clientCode = data?.data.client.code
const clientName = data?.data.client.name

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="Calc(100% - 50px)" display="flex" flexDirection="column">
        <JudicialBinnacleActions
          judicialFileCaseId={judicialFileCaseId}
          clientCode={clientCode}
          clientName={clientName}
        />
        <JudicialBinnacleInfo />
        <JudicialBinnacleModals />
      </Container>
    </FormProvider>
  )
}

export default JudicialBinnacle