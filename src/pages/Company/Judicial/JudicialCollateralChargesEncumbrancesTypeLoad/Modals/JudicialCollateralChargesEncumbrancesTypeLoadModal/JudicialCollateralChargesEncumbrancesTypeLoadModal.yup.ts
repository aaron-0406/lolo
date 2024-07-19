import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialCollateralChargesEncumbrancesTypeLoadType } from '@/types/judicial/judicial-collateral-charges-encumbrances-type-load.type'
import yup from '../../../../../../shared/yupLocale'

const JudicialCollateralChargesEncumbrancesTypeLoadSchema: yup.SchemaOf<
  Omit<JudicialCollateralChargesEncumbrancesTypeLoadType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  customerHasBankId: yup.number().required(),
})

export const JudicialCollateralChargesEncumbrancesTypeLoadResolver = yupResolver(JudicialCollateralChargesEncumbrancesTypeLoadSchema)