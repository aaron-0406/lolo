import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialCollateralFilesType } from '@/types/judicial/judicial-collateral-files.type'

const JudicialCollateralFilesSchema: yup.SchemaOf<
  Omit<JudicialCollateralFilesType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  originalName: yup.string().required(),
  nameOriginAws: yup.string().required(), 
  customerHasBankId: yup.number().required(),
  judicialCollateralIdJudicialCollateral: yup.number().required(),
})

export const JudicialCollateralFileResolver = yupResolver(JudicialCollateralFilesSchema)