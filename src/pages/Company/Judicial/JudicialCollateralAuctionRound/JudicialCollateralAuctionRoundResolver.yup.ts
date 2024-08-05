import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'
import { JudicialCollateralAuctionRoundType } from '@/types/judicial/judicial-collateral-auction.type'

const JudicialCollateralAuctionRoundSchema: yup.SchemaOf<Omit<JudicialCollateralAuctionRoundType, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>> = yup.object().shape({
  judicialCollateralIdJudicialCollateral: yup.number().required(),
  customerHasBankId: yup.number().required(),
  appraisalDate: yup.string().optional(),
  expertReportDate: yup.string().optional(),
  encumbranceAmountSoles: yup.number().optional(),
  encumbranceAmountDollars: yup.number().optional(),
  conventionalValueSoles: yup.number().optional(),
  conventionalValueDollars: yup.number().optional(),
  marketValueSoles: yup.number().optional(),
  marketValueDollars: yup.number().optional(),
  realizationValueSoles: yup.number().optional(),
  realizationValueDollars: yup.number().optional(),
  auctionValueSoles: yup.number().optional(),
  auctionValueDollars: yup.number().optional(),
  firstCallSoles: yup.number().optional(),
  firstCallDollars: yup.number().optional(),
  secondCallSoles: yup.number().optional(),
  secondCallDollars: yup.number().optional(),
  thirdCallSoles: yup.number().optional(),
  thirdCallDollars: yup.number().optional(),
  auctionRound: yup.number().required(),
  appraisalExperts: yup.string().required(),
  auctionType: yup.string().required(),
  auctionerName: yup.string().required(),   
})

export const JudicialCollateralAuctionRoundResolver = yupResolver(JudicialCollateralAuctionRoundSchema)