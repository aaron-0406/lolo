import { FileCaseType } from '@/types/judicial/case-file.type'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialFileCaseResolver } from './JudicialFileCase.yup'
import { useState } from 'react'
import LayoutFileCase from 'components/Layouts/LayoutFileCase'
import FileCaseOwner from './FileCaseOwner'
import FileCaseSearch from './FileCaseSearch'
import FileCaseActions from './FileCaseActions'
import FileCaseInfo from './FileCaseInfo'
import FileCaseModals from './FileCaseInfo/FileCaseModals'

const JudicialFileCase = () => {
  const formMethods = useForm<FileCaseType>({
    resolver: JudicialFileCaseResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      amountDemandedDollars: 0,
      amountDemandedSoles: 0,
      cautionaryCode: '',
      clientId: 0,
      customerUserId: 0,
      demandDate: new Date(),
      errandCode: '',
      judge: '',
      judgmentNumber: 0,
      judicialCourtId: 0,
      judicialProceduralWayId: 0,
      judicialSubjectId: 0,
      judicialVenue: '',
      numberCaseFile: '',
      secretary: '',
    },
  })
  const [loading, setLoading] = useState<boolean>(false)

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state)
  }

  return (
    <FormProvider {...formMethods}>
      <LayoutFileCase
        searchContent={<FileCaseSearch setLoadingGlobal={setLoadingGlobal} />}
        actionsContent={<FileCaseActions />}
        ownerContent={<FileCaseOwner />}
        infoContent={<FileCaseInfo loading={loading} />}
        modalsContent={<FileCaseModals />}
      />
    </FormProvider>
  )
}

export default JudicialFileCase
