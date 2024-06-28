import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../../../../shared/yupLocale";
import { JudicialCaseFileHasCollateralType } from "@/types/judicial/judicial-case-file-has-collateral.type";
import { JudicialCaseFileType } from "@/types/judicial/judicial-case-file.type";

export type AssignCollateralModalType = {
  judicialCaseFileWithCollateral: Array<
    Omit<
      JudicialCaseFileType,
      | 'createdAt'
      | 'processComment'
      | 'processStatus'
      | 'processReasonId'
      | 'idJudicialCaseFileRelated'
      | 'bankId'
      | 'qrCode'
    > & { hasCollateral: boolean; client: { id: number; name: string } }
  >
}

const regexPatternNumberFileCase = /^\d{5}-\d{4}-\d{1,4}-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/

const AssignCollateralModalSchema: yup.SchemaOf<AssignCollateralModalType> = yup.object({
  judicialCaseFileWithCollateral: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      numberCaseFile: yup.string().required().matches(regexPatternNumberFileCase, {
        message: 'Patrón "#####-####-####-####-LL-LL-##".',
      }),
      judgmentNumber: yup.number().optional(),
      secretary: yup.string().optional(),
      amountDemandedDollars: yup.number().optional(),
      amountDemandedSoles: yup.number().optional(),
      cautionaryCode: yup.string().optional().matches(/^\d*$/, { message: 'Debe ser un número entero' }),
      errandCode: yup.string().optional(),
      judicialSedeId: yup.number().optional(),
      judge: yup.string().optional(),
      demandDate: yup.string().optional(),
      judicialCourtId: yup.number().required().min(1),
      judicialSubjectId: yup.number().required().min(1),
      judicialProceduralWayId: yup.number().required().min(1),
      cityId: yup.number().required().min(1),
      clientId: yup.number().required().min(1),
      customerUserId: yup.number().required().min(1),
      customerHasBankId: yup.number().required().min(1),
      hasCollateral: yup.boolean().required(),
      client: yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
      }),
    }),
  ),
});

export const ModalScheduleNotificationsResolver = yupResolver(AssignCollateralModalSchema);
