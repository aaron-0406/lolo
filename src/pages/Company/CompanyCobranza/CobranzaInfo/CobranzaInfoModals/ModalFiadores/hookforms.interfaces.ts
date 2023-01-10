import { GuarantorType } from "../../../../../../shared/types/guarantor.type";

export type GuarantorFormType = GuarantorType & {
  guarantors: Array<GuarantorType>;
};
