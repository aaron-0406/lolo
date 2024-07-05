export type ScheduledNotificationsType = {
  id: number;
  nameNotification: string;
  descriptionNotification: string;
  frequencyToNotify: number;
  hourTimeToNotify:string;
  customerHasBankId: number;
  logicKey:string;
  state:boolean;
  daysToNotify: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}