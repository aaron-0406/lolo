import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialFileCaseResolver } from './JudicialFileCase.yup'
import LayoutFileCase from 'components/Layouts/LayoutFileCase'
import FileCaseOwner from './FileCaseOwner'
import FileCaseSearch from './FileCaseSearch'
import FileCaseActions from './FileCaseActions'
import FileCaseInfo from './FileCaseInfo'
import FileCaseModals from './FileCaseInfo/FileCaseModals'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useQuery } from 'react-query'
import { getCourtByCHB } from '@/services/judicial/judicial-court.service'
import { getProceduralWayByCHB } from '@/services/judicial/judicial-procedural-way.service'
import { getSubjectByCHB } from '@/services/judicial/judicial-subject.service'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import moment from 'moment'

const JudicialFileCase = () => {
  const {
    customerUser: { user },
    bank: { selectedBank },
    judicial: {
      judicialCourt: { setJudicialCourts },
      judicialProceduralWay: { setJudicialProceduralWays },
      judicialSubject: { setJudicialSubjects },
    },
  } = useLoloContext()

  const { code } = useParams()
  const { data } = useQuery<AxiosResponse<any, Error>>(['get-file-case-by-code', code ?? ''], async () => {
    return await getFileCaseByNumberFile(code ?? '')
  })

  const defaultValuesFileCase = {
    id: data?.data.id ?? 0,
    amountDemandedDollars: data?.data.amountDemandedDollars ?? 0,
    amountDemandedSoles: data?.data.amountDemandedSoles ?? 0,
    cautionaryCode: data?.data.cautionaryCode ?? 0,
    clientId: data?.data.clientId ?? 0,
    customerUserId: user.id ?? 0,
    demandDate: moment(data?.data.demandDate).format('DD-MM-YYYY') ?? moment(new Date()).format('DD-MM-YYYY'),
    errandCode: data?.data.errandCode ?? '',
    judge: data?.data.judge ?? '',
    judgmentNumber: data?.data.judgmentNumber ?? 0,
    judicialCourtId: data?.data.judicialCourtId ?? 0,
    judicialProceduralWayId: data?.data.judicialProceduralWayId ?? 0,
    judicialSubjectId: data?.data.judicialSubjectId ?? 0,
    judicialVenue: data?.data.judicialVenue ?? '',
    numberCaseFile: data?.data.numberCaseFile ?? '',
    secretary: data?.data.secretary ?? '',
    customerHasBankId: data?.data.customerHasBankId ?? Number(selectedBank.idCHB),
  }

  useQuery(
    'get-court-by-chb',
    async () => {
      return await getCourtByCHB(Number(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setJudicialCourts(data)
      },
    }
  )

  useQuery(
    'get-procedural-way-by-chb',
    async () => {
      return await getProceduralWayByCHB(Number(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setJudicialProceduralWays(data)
      },
    }
  )

  useQuery(
    'get-subject-by-chb',
    async () => {
      return await getSubjectByCHB(Number(selectedBank.idCHB))
    },
    {
      onSuccess: ({ data }) => {
        setJudicialSubjects(data)
      },
    }
  )

  const formMethods = useForm<JudicialCaseFileType>({
    resolver: JudicialFileCaseResolver,
    mode: 'all',
    defaultValues: defaultValuesFileCase,
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
