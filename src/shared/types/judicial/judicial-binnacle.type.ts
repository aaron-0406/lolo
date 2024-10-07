export type JudicialBinnacleType = {
  id: number;
  judicialBinProceduralStageId: number;
  lastPerformed: string;
  binnacleTypeId: number;
  date: string;
  judicialFileCaseId: number;
  customerHasBankId: number;

  index?: number;
  resolutionDate?: string;
  entryDate?: string;
  notificationType: string;
  acto?: string;
  fojas?: number;
  folios?: number;
  provedioDate?: Date;
  userDescription: string;
  createdBy?: string;

  totalTariff?: number;
  tariffHistory?: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
