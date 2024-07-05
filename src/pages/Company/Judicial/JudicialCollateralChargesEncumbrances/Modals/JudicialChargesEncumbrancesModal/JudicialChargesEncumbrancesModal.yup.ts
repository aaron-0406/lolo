import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialCollateralChargesEncumbrancesType } from '@/types/judicial/judicial-collateral-charges-encumbrances.type'
import yup from '../../../../../../shared/yupLocale'

const JudicialChargesEncumbrancesSchema: yup.SchemaOf<
  Omit<JudicialCollateralChargesEncumbrancesType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  typeOfLoadId: yup.number().required(),
  amountOfImpactSoles: yup.number().required(),
  amountOfImpactDollars: yup.number().required(),
  descriptionOfLoad: yup.string().required(),
  registrationSeat: yup.string().required(),
  registrationDate: yup.string().required(),
  range: yup.number().required(),
  judicialCollateralIdJudicialCollateral: yup.number().required(),
  customerHasBankId: yup.number().required(),
  appraisalDate: yup.string().required(),
})

export const JudicialChargesEncumbrancesResolver = yupResolver(JudicialChargesEncumbrancesSchema)