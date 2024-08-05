import { useParams } from 'react-router-dom';
import JudicialCollateralAuctionRoundActions from './JudicialCollateralAuctionRoundActions'
import JudicialCollateralAuctionRoundInfo from './JudicialCollateralAuctionRoundInfo/JudicialCollateralAuctionRoundInfo';
import Container from '@/ui/Container'
import { useLoloContext } from '@/contexts/LoloProvider';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service';
import notification from '@/ui/notification';
import { JudicialCollateralAuctionRoundResolver } from './JudicialCollateralAuctionRoundResolver.yup';
import { FormProvider, useForm } from 'react-hook-form';
import { JudicialCollateralAuctionRoundType } from '@/types/judicial/judicial-collateral-auction.type';

const JudicialCollateralAuctionRound = () => {
  const codeParams = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const {
    bank: {
      selectedBank: { idCHB:chb },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '', Number(chb))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const clientName = data?.data.client.name

  const defaultValuesCollateralAuctionRound = {
    id: 0,
    judicialCollateralIdJudicialCollateral: Number(collateralCode),
    customerHasBankId: Number(chb),
    appraisalDate: undefined,
    expertReportDate: undefined,
    encumbranceAmountSoles: undefined,
    encumbranceAmountDollars: undefined,
    conventionalValueSoles: undefined,
    conventionalValueDollars: undefined,
    marketValueSoles: undefined,
    marketValueDollars: undefined,
    realizationValueSoles: undefined,
    realizationValueDollars: undefined,
    auctionValueSoles: undefined,
    auctionValueDollars: undefined,
    firstCallSoles: undefined,
    firstCallDollars: undefined,
    secondCallSoles: undefined,
    secondCallDollars: undefined,
    thirdCallSoles: undefined,
    thirdCallDollars: undefined,
    auctionRound: 0,
    appraisalExperts: '',
    auctionType: '',
    auctionerName: '',
  }

  const formMethods = useForm<JudicialCollateralAuctionRoundType>({
    resolver: JudicialCollateralAuctionRoundResolver,
    mode:'all', 
    defaultValues: defaultValuesCollateralAuctionRound,
  })

  return (
    <FormProvider {...formMethods}>
      <Container width="100%" height="Calc(100% - 50px)" display="flex" flexDirection="column" gap="10px">
        <JudicialCollateralAuctionRoundActions clientName={clientName} />
        <JudicialCollateralAuctionRoundInfo />
      </Container>
    </FormProvider>
  )
}

export default JudicialCollateralAuctionRound