import { TariffIntervalType } from "./tariff-interval.type";

export type TariffIntervalMatchType = {
  id:number;
  tariffId: number;
  intervalId: number;
  value: number;
  tariffInterval: TariffIntervalType;
}