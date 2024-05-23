import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialFileCaseResolver } from './JudicialFileCase.yup'
import LayoutFileCase from 'components/Layouts/LayoutFileCase'
import FileCaseOwner from './FileCaseOwner'
import FileCaseActions from './FileCaseActions'
import FileCaseInfo from './FileCaseInfo'
import FileCaseModals from './FileCaseInfo/FileCaseModals'
import { useLoloContext } from '@/contexts/LoloProvider'
import moment from 'moment'
import { ClientType } from '@/types/extrajudicial/client.type'

const JudicialFileCase = () => {
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
  }

  const formMethods = useForm<JudicialCaseFileType>({
    resolver: JudicialFileCaseResolver,
    mode: 'all',
    defaultValues: defaultValuesFileCase,
  })

  const { getValues } = formMethods

  const numberCaseFile = getValues('numberCaseFile')

  return (
    <FormProvider {...formMethods}>
      <LayoutFileCase
        actionsContent={<FileCaseActions setOwnerFileCase={setOwnerFileCase} setLoadingGlobal={setLoading} />}
        ownerContent={<FileCaseOwner setOwnerFileCase={setOwnerFileCase} ownerFileCase={ownerFileCase} />}
        infoContent={<FileCaseInfo loading={loading} />}
        modalsContent={<FileCaseModals numberCaseFile={numberCaseFile} />}
      />
    </FormProvider>
  )
}

export default JudicialFileCase
