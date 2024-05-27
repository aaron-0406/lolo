import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialFileCaseResolver } from './JudicialFileCaseRelatedProcess.yup'
import LayoutFileCase from 'components/Layouts/LayoutFileCase'
import FileCaseOwner from './FileCaseRelatedProcessOwner'
import FileCaseActions from './FileCaseRelatedProcessActions'
import FileCaseInfo from './FileCaseRelatedProcessInfo'
import FileCaseModals from './FileCaseRelatedProcessInfo/FileCaseModals'
import { useLoloContext } from '@/contexts/LoloProvider'
import moment from 'moment'
import { ClientType } from '@/types/extrajudicial/client.type'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getFileCaseByNumberFile } from '../../../../shared/services/judicial/judicial-file-case.service'
import { AxiosResponse } from 'axios'

import notification from '@/ui/notification'

const JudicialFileCaseRelatedProcess = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext()

  const [ownerFileCase, setOwnerFileCase] = useState<ClientType & { customerUser: { id: number; name: string } }>()

  const codeParams = useParams().code ?? ''
  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '', Number(selectedBank.idCHB))
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

  const [loading, setLoading] = useState<boolean>(false)
  const caseFileId = data?.data.id

  const defaultValuesFileCase = {
    id: 0,
    numberCaseFile: '',
    judgmentNumber: 0,
    secretary: '',
    amountDemandedSoles: 0,
    amountDemandedDollars: 0,
    cautionaryCode: '',
    errandCode: '',
    judge: '',
    demandDate: moment(new Date()).format('DD-MM-YYYY'),
    clientId: 0,
    cityId: 0,
    customerUserId: 0,
    judicialCourtId: 0,
    judicialSubjectId: 0,
    judicialProceduralWayId: 0,
    customerHasBankId: selectedBank.idCHB.length ? Number(selectedBank.idCHB) : 0,
    idJudicialCaseFileRelated: caseFileId,
  }

  const formMethods = useForm<JudicialCaseFileType>({
    resolver: JudicialFileCaseResolver,
    mode: 'all',
    defaultValues: defaultValuesFileCase,
  })

  return (
    <FormProvider {...formMethods}>
      <LayoutFileCase
        actionsContent={
          <FileCaseActions
            setOwnerFileCase={setOwnerFileCase}
            setLoadingGlobal={setLoading}
            caseFileRelatedProcessId={caseFileId}
          />
        }
        ownerContent={<FileCaseOwner setOwnerFileCase={setOwnerFileCase} ownerFileCase={ownerFileCase} />}
        infoContent={<FileCaseInfo loading={loading} />}
        modalsContent={<FileCaseModals />}
      />
    </FormProvider>
  )
}

export default JudicialFileCaseRelatedProcess
