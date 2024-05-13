import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialFileCaseResolver } from './FileCaseProcessStatus.yup'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import notification from '@/ui/notification'
import FileCaseProcessStatusActions from './FileCaseProcessStatusActions'
import FileCaseProcessStatusInfo from './FileCaseFileProcessStatusInfo/FileCaseProcessStatusInfo'
import { JudicialCasefileProcessStatusType } from '@/types/judicial/judicial-case-file-process-status.type'

const JudicialFileCaseProcessStatus = () => {
  const [ownerFileCase, setOwnerFileCase] = useState<ClientType & { customerUser: { id: number; name: string } }>()

  const [loading, setLoading] = useState<boolean>(false)

  const defaultValuesFileCase = {
    id:0,
    processStatus:'', 
    processComment:'',
    processReasonId:0,
  }

  const formMethods = useForm<JudicialCasefileProcessStatusType>({
    resolver: JudicialFileCaseResolver,
    mode: 'all',
    defaultValues: defaultValuesFileCase,
  })


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

  const clientName = data?.data?.client?.name


  return (
    <FormProvider {...formMethods}>
      <FileCaseProcessStatusActions clientName={clientName} setOwnerFileCase={setOwnerFileCase} setLoadingGlobal={setLoading} loading = {loading}/>
      <FileCaseProcessStatusInfo ownerFileCase={ownerFileCase}/>
    </FormProvider>
  )
}
  
export default JudicialFileCaseProcessStatus
