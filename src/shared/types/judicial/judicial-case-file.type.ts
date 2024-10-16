export type JudicialCaseFileType = {
  id: number
  numberCaseFile: string
  judgmentNumber?: number
  secretary?: string
  amountDemandedSoles?: number
  amountDemandedDollars?: number
  comercialValueSoles?: number;
  comercialValueDollars?: number;
  amountAffectionSoles?: number;
  amountAffectionDollars?: number;
  cautionaryCode?: string
  errandCode?: string
  judicialSedeId?: number
  judge?: string
  demandDate?: string
  createdAt: string
  cityId?: number
  clientId: number
  customerUserId: number
  responsibleUserId?: number;
  judicialCourtId: number
  judicialSubjectId: number
  judicialProceduralWayId: number
  customerHasBankId: number
  chbTransferred?: number
  processStatus?: string
  processComment?: string
  processReasonId?: number
  idJudicialCaseFileRelated?: number
  bankId?: number
  qrCode?: string
}
