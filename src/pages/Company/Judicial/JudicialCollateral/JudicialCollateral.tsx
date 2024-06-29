import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { JudicialCollateralResolver } from './JudicialCollateralResolver.yup'
import FileCaseActions from './JudicialCollateralActions'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getFileCaseByNumberFile } from '../../../../shared/services/judicial/judicial-file-case.service'
import { AxiosResponse } from 'axios'

import notification from '@/ui/notification'
import Container from '@/ui/Container'
import JudicialCollateralInfo from './JudicialCollateralInfo'
import JudicialCollateralModals from './JudicialCollateralInfo/JudicialCollateralModals'
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'

const JudicialCollateral = () => {
  const {
    bank: { selectedBank: { idCHB: chb } },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-collateral-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '', Number(chb))
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

  const defaultValuesCollateral = {
    id: 0,
    kindOfProperty: '',
    propertyAddress: '',
    propertyFeatures: '',
    landArea: '',
    constructionArea: '',
    electronicRecord: '',
    dateOfPublicDeed: '',
    numberOfCollateral: 0,
    registrationSeat: '',

    customerHasBankId: parseInt(chb.length ? chb : '0'),
    departmentId: 0,
    provinceId: 0,
    districtId: 0,
    useOfPropertyId: 0,
    registrationAreaId: 0,
    registerOfficeId: 0,
    notaryId: 0,
  }

  const formMethods = useForm<JudicialCollateralType>({
    resolver: JudicialCollateralResolver,
    mode: 'all',
    defaultValues: defaultValuesCollateral,
  })

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="Calc(100% - 50px)" display="flex" flexDirection="column">
        <FileCaseActions setLoadingGlobal={setLoading} caseFileId={caseFileId} />
        <JudicialCollateralInfo loading={loading} />
        <JudicialCollateralModals />
      </Container>
    </FormProvider>
  )
}

export default JudicialCollateral
