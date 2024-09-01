import { yupResolver } from '@hookform/resolvers/yup';
import { TariffType } from '@/types/config/tariff.type';
import yup from "../../../../../../shared/yupLocale";

const TariffModalYupSchema: yup.SchemaOf<Omit<TariffType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'tariffIntervalMatch'>> =
  yup.object().shape({
    code: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required(),
    value: yup.number().optional(),
    customerHasBankId: yup.number().required(),
  })

export const TariffModalYupResolver = yupResolver(TariffModalYupSchema)