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
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
