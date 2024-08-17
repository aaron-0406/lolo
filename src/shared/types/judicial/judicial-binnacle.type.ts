export type JudicialBinnacleType = {
  id: number
  totalTariff?:number; 
  tariffHistory?: string
  judicialBinProceduralStageId: number
  lastPerformed: string
  binnacleTypeId: number
  date: string
  judicialFileCaseId: number
  customerHasBankId: number
  notificationType: string;
  userDescription: string;
  fojas: number;
  createdBy: number;
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
