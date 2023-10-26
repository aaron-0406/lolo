import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LayoutCobranza from '../../../../components/Layouts/LayoutCobranza'
import { ClientType } from '@/types/extrajudicial/client.type'
import CobranzaActions from './CobranzaActions'
import CobranzaInfo from './CobranzaInfo'
import { ExtrajudicialCobranzaResolver } from './ExtrajudicialCobranza.yup'
import CobranzaInfoModals from './CobranzaInfo/CobranzaInfoModals/CobranzaInfoModals'

const ExtrajudicialCobranza = () => {
  const formMethods = useForm<ClientType>({
    resolver: ExtrajudicialCobranzaResolver,
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
        rightTopContent={<CobranzaActions setLoadingGlobal={setLoadingGlobal} />}
        infoContent={<CobranzaInfo loading={loading} />}
        downContent={<CobranzaInfoModals />}
      />
    </FormProvider>
  )
}

export default ExtrajudicialCobranza
