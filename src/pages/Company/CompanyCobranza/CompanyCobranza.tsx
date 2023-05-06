import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LayoutCobranza from '../../../components/Layouts/LayoutCobranza'
import { ClientType } from '../../../shared/types/client.type'
import CobranzaActions from './CobranzaActions'
import CobranzaComments from './CobranzaComments'
import CobranzaInfo from './CobranzaInfo'
import CobranzaSearch from './CobranzaSearch'
import { CompanyCobranzaResolver } from './CompanyCobranza.yup'

const CompanyCobranza = () => {
  const formMethods = useForm<ClientType>({
    resolver: CompanyCobranzaResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      code: '',
      negotiationId: 0,
      dniOrRuc: '',
      name: '',
      cityId: 0,
      funcionarioId: 0,
      customerUserId: 0,
      customerHasBankId: 0,
    },
  })

  const [loading, setLoading] = useState<boolean>(false)

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state)
  }

  return (
    <FormProvider {...formMethods}>
      <LayoutCobranza
        leftHeader={<CobranzaSearch setLoadingGlobal={setLoadingGlobal} />}
        leftActions={<CobranzaActions />}
        leftContent={<CobranzaInfo loading={loading} />}
        rightComments={<CobranzaComments />}
      />
    </FormProvider>
  )
}

export default CompanyCobranza
