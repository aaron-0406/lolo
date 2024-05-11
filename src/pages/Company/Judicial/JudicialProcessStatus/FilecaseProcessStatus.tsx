import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialFileCaseResolver } from './FileCaseProcessStatus.yup'
import FileCaseActions from './FileCaseProcessStatusActions'
import { useLoloContext } from '@/contexts/LoloProvider'
import moment from 'moment'
import { ClientType } from '@/types/extrajudicial/client.type'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import notification from '@/ui/notification'
import FileCaseProcessStatusActions from './FileCaseProcessStatusActions'
import FileCaseProcessStatusInfo from './FileCaseInfo/FileCaseProcessStatusInfo'

const JudicialFileCaseProcessStatus = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext()

  const [ownerFileCase, setOwnerFileCase] = useState<ClientType & { customerUser: { id: number; name: string } }>()

  const [loading, setLoading] = useState<boolean>(false)

  const defaultValuesFileCase = {
    id: 0,
    numberCaseFile: '',
    judgmentNumber: 0,
    secretary: '',
    amountDemandedSoles: 0,
    amountDemandedDollars: 0,
    cautionaryCode: '',
    errandCode: '',
    judicialVenue: '',
    judge: '',
    demandDate: moment(new Date()).format('DD-MM-YYYY'),
    clientId: 0,
    customerUserId: 0,
    judicialCourtId: 0,
    judicialSubjectId: 0,
    judicialProceduralWayId: 0,
    customerHasBankId: selectedBank.idCHB.length ? Number(selectedBank.idCHB) : 0,
    processStatus:'', 
    processComment:'',
    processReasonId:0,
  }

  const formMethods = useForm<JudicialCaseFileType>({
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
      <FileCaseProcessStatusActions clientName={clientName} setOwnerFileCase={setOwnerFileCase} setLoadingGlobal={setLoading} />
      <FileCaseProcessStatusInfo ownerFileCase={ownerFileCase}/>
    </FormProvider>
  )
}
  
export default JudicialFileCaseProcessStatus
