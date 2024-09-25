import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'

const JudicialCollateralSchema: yup.SchemaOf<Omit<JudicialCollateralType, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>> = yup.object().shape({
  kindOfProperty: yup.string().required(),
  propertyAddress: yup.string().required(),
  propertyFeatures: yup.string().required(),
  landArea: yup.string().required(),
  constructionArea: yup.string().required(),
  electronicRecord: yup.string().required(),
  dateOfPublicDeed: yup.string().required(),
  numberOfCollateral: yup.string().required(),
  registrationSeat: yup.string().required(),
  customerHasBankId: yup.number().required(),
  departmentId: yup.number().required(),
  provinceId: yup.number().required(),
  districtId: yup.number().required(),
  useOfPropertyId: yup.number().required(),
  registrationAreaId: yup.number().required(),
  registerOfficeId: yup.number().required(),
  notaryId: yup.number().required(),
})

export const JudicialCollateralResolver = yupResolver(JudicialCollateralSchema)
