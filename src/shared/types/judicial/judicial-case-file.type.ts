export type JudicialCaseFileType = {
  id: number
  numberCaseFile: string
  judgmentNumber?: number
  secretary?: string
  amountDemandedSoles?: number
  amountDemandedDollars?: number
  cautionaryCode?: string
  errandCode?: string
  judicialVenue?: string
  judge?: string
  demandDate?: string
  createdAt: string
  clientId: number
  customerUserId: number
  judicialCourtId: number
  judicialSubjectId: number
  judicialProceduralWayId: number
  customerHasBankId: number
  processStatus?:string; 
  processComment?:string; 
  processReasonId?:number;
  idJudicialCaseFileRelated?:number
  bankId?:number
}
