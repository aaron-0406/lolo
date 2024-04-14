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
import { useState } from 'react'

export type FileCaseOwnerType = {
  code: string
  name: string
  id: number
  customerUser: {
    id: number
    name: string
  }
}

const JudicialFileCase = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext()
  const [ownerFileCase, setOwnerFileCase] = useState<FileCaseOwnerType>({
    code: '',
    name: '',
    id: 0,
    customerUser: {
      id: 0,
      name: '',
    },
  })
  const [loading, setLoading] = useState<boolean>(false)

  const defaultValuesFileCase = {
    id: 0,
    amountDemandedDollars: 0,
    amountDemandedSoles: 0,
    cautionaryCode: '',
    clientId: 0,
    customerUserId: 0,
    demandDate: moment(new Date()).format('DD-MM-YYYY'),
    judge: '',
    judgmentNumber: 0,
    judicialCourtId: 0,
    judicialProceduralWayId: 0,
    judicialSubjectId: 0,
    judicialVenue: '',
    numberCaseFile: '',
    secretary: '',
    customerHasBankId: Number(selectedBank.idCHB),
  }

  const formMethods = useForm<JudicialCaseFileType>({
    resolver: JudicialFileCaseResolver,
    mode: 'all',
    defaultValues: defaultValuesFileCase,
  })

  return (
    <FormProvider {...formMethods}>
      <LayoutFileCase
        actionsContent={<FileCaseActions setOwnerFileCase={setOwnerFileCase} setLoadingGlobal={setLoading} />}
        ownerContent={<FileCaseOwner setOwnerFileCase={setOwnerFileCase} ownerFileCase={ownerFileCase} />}
        infoContent={<FileCaseInfo loading={loading} />}
        modalsContent={<FileCaseModals ownerFileCase={ownerFileCase} />}
      />
    </FormProvider>
  )
}

export default JudicialFileCase
