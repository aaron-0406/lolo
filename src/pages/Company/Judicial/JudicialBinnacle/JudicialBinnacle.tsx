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

const JudicialBinnacle = () => {
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
      onSuccess: (data) => {
        if (!!codeParams.length && codeParams !== '000000000') {
          formMethods.setValue('judicialFileCaseId', data.data.id)
        }
      }
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
    judicialBinFiles: [],
    filesDnD: [],
  },
})

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="Calc(100% - 50px)" display="flex" flexDirection="column">
        <JudicialBinnacleActions />
        <JudicialBinnacleInfo />
      </Container>
    </FormProvider>
  )
}

export default JudicialBinnacle