import { TariffIntervalMatchType } from "./tariff-interval-match.type";

export type TariffType = {
  id: number;
  code: string;
  type: string;
  description: string;
  tariffIntervalMatch: TariffIntervalMatchType[];
}

