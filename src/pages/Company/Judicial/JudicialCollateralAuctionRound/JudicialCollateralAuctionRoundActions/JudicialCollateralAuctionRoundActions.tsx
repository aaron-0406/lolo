
import { device } from "@/breakpoints/responsive"
import { useLoloContext } from "@/contexts/LoloProvider"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { createJudicialCollateralAuctionRound, editJudicialCollateralAuctionRound, getJudicialCollateralAuctionRoundByCollateralId } from "@/services/judicial/judicial-collateral-auction-round.service"
import { JudicialCollateralAuctionRoundType } from "@/types/judicial/judicial-collateral-auction.type"
import Breadcrumbs from "@/ui/Breadcrumbs"
import { LinkType } from "@/ui/Breadcrumbs/Breadcrumbs.type"
import Button from "@/ui/Button"
import Container from "@/ui/Container"
import notification from "@/ui/notification"
import Text from "@/ui/Text"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import paths from "shared/routes/paths"
import { CustomErrorResponse } from "types/customErrorResponse"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import judicialCollateralAuctionRoundListCache from "../../JudicialCollateralAuctionRoundList/JudicialCollateralAuctionRoundListTable/utils/judicial-collateral-auction-round-list.cache"
import { useEffect } from "react"
import moment from "moment"

type JudicialCollateralAuctionRoundActionsProps = {
  clientName: string
}

const JudicialCollateralAuctionRoundActions = ({ clientName }: JudicialCollateralAuctionRoundActionsProps) => {
  const navigate = useNavigate()
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const queryClient = useQueryClient()

  const codeParams = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const auctionCode = useParams().auctionCode ?? ''
  const {
    client: { customer },
    bank: { selectedBank: { idCHB: chb } },
  } = useLoloContext()

  const {
    getValues,
    setValue,
    watch,
  } = useFormContext<JudicialCollateralAuctionRoundType>()

  const {
    actions: { createCollateralAuctionRoundListCache, editCollateralAuctionRoundListCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCollateralAuctionRoundListCache(queryClient)

  const { refetch } = useQuery<AxiosResponse<any, Error>>(
    ['get-collateral-auction-round-by-code', Number(collateralCode)],
    async () => {
      return await getJudicialCollateralAuctionRoundByCollateralId(
        Number(chb),
        Number(collateralCode),
        Number(auctionCode)
      )
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue(
          'appraisalDate',
          data.data.appraisalDate ? moment(data.data.appraisalDate).format('DD-MM-YYYY') : undefined
        )
        setValue(
          'expertReportDate',
          data.data.expertReportDate ? moment(data.data.expertReportDate).format('DD-MM-YYYY') : undefined
        )
        setValue('encumbranceAmountSoles', data.data.encumbranceAmountSoles ?? 0.0)
        setValue('encumbranceAmountDollars', data.data.encumbranceAmountDollars ?? 0.0)
        setValue('conventionalValueSoles', data.data.conventionalValueSoles ?? 0.0)
        setValue('conventionalValueDollars', data.data.conventionalValueDollars ?? 0.0)
        setValue('marketValueSoles', data.data.marketValueSoles ?? 0.0)
        setValue('marketValueDollars', data.data.marketValueDollars ?? 0.0)
        setValue('realizationValueSoles', data.data.realizationValueSoles ?? 0.0)
        setValue('realizationValueDollars', data.data.realizationValueDollars ?? 0.0)
        setValue('auctionValueSoles', data.data.auctionValueSoles ?? 0.0)
        setValue('auctionValueDollars', data.data.auctionValueDollars ?? 0.0)
        setValue('firstCallSoles', data.data.firstCallSoles ?? 0.0)
        setValue('firstCallDollars', data.data.firstCallDollars ?? 0.0)
        setValue('secondCallSoles', data.data.secondCallSoles ?? 0.0)
        setValue('secondCallDollars', data.data.secondCallDollars ?? 0.0)
        setValue('thirdCallSoles', data.data.thirdCallSoles ?? 0.0)
        setValue('thirdCallDollars', data.data.thirdCallDollars ?? 0.0)
        setValue('auctionRound', data.data.auctionRound)
        setValue('appraisalExperts', data.data.appraisalExperts)
        setValue('auctionType', data.data.auctionType)
        setValue('auctionerName', data.data.auctionerName)
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: isLodingCreateAuctionRound, mutate: createAuctionRoundMutate } = useMutation<
    AxiosResponse<JudicialCollateralAuctionRoundType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, appraisalDate, expertReportDate, ...restAuctionRoundValues } = getValues()
      return await createJudicialCollateralAuctionRound({
        ...restAuctionRoundValues,
        appraisalDate: appraisalDate ? moment(appraisalDate, 'DD-MM-YYYY').toDate().toISOString() : undefined,
        expertReportDate: expertReportDate ? moment(expertReportDate, 'DD-MM-YYYY').toDate().toISOString() : undefined,
      })
    },
    {
      onSuccess: (data) => {
        createCollateralAuctionRoundListCache(data.data,Number(collateralCode))
        notification({
          type: 'success',
          message: 'Ronda de remates creada correctamente',
        })
        navigate(
          paths.judicial.collateralAuction(customer.urlIdentifier, codeParams, collateralCode, data.data.id.toString())
        )
      },
      onMutate: () => {
        return onMutateCache(Number(collateralCode))
      },
      onSettled: () => {
        onSettledCache(Number(collateralCode))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, Number(collateralCode))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const {isLoading: isLoadingEditAuctionRound, mutate: editAuctionRoundMutate } = useMutation<
    AxiosResponse<JudicialCollateralAuctionRoundType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, appraisalDate, expertReportDate, ...restAuctionRoundValues } = getValues()
      return await editJudicialCollateralAuctionRound(Number(collateralCode), Number(collateralCode), id, {
        ...restAuctionRoundValues,
        appraisalDate: appraisalDate ? moment(appraisalDate, 'DD-MM-YYYY').toDate().toISOString() : undefined,
        expertReportDate:  expertReportDate ? moment(expertReportDate, 'DD-MM-YYYY').toDate().toISOString() : undefined,
      })
    },
    {
      onSuccess: (data) => {
        editCollateralAuctionRoundListCache(data.data, Number(collateralCode))
        notification({
          type: 'success',
          message: 'Ronda de remates actualizada correctamente',
        })
        navigate(
          paths.judicial.collateralAuction(customer.urlIdentifier, codeParams, collateralCode, data.data.id.toString())
        )
      },
      onMutate: () => {
        return onMutateCache(Number(collateralCode))
      },
      onSettled: () => {
        onSettledCache(Number(collateralCode))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, Number(collateralCode))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )
  const onCreateAuctionRound = () => {
    createAuctionRoundMutate()
  }
  const onUpdateAuctionRound = () => {
    editAuctionRoundMutate()
  }
  const routers: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, codeParams),
      name: codeParams,
    },
    {
      link: paths.judicial.collateral(customer.urlIdentifier, codeParams),
      name: 'Garantías',
    },
    {
      link: paths.judicial.detailCollateral(customer.urlIdentifier, codeParams, collateralCode),
      name: collateralCode,
    }, 
    {
      link: paths.judicial.collateralAuctionList(customer.urlIdentifier, codeParams, collateralCode),
      name: 'Rondas de remates',
    },
    {
      link: paths.judicial.collateralAuction(customer.urlIdentifier, codeParams, collateralCode, auctionCode),
      name: auctionCode,
    },
  ]
  useEffect(()=>{
    if(!!collateralCode.length && auctionCode !== '00000000'){
      refetch()
    }
    // eslint-disable-next-line
  }, [auctionCode])
  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems={greaterThanTabletS ? 'start' : 'flex-start'}
      padding="10px 20px 10px 20px"
      gap="10px"
    >
      <Container display="flex" flexDirection="column" gap="10px">
        <Breadcrumbs routes={routers} />
      </Container>

      <Container width="100%" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Container padding="10px" width="fit-content" margin="0px 0px 0px 0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
        <Button
          width="130px"
          label={greaterThanDesktopS && 'Guardar'}
          shape={greaterThanDesktopS ? 'default' : 'round'}
          size={greaterThanTabletS ? 'default' : 'small'}
          trailingIcon="ri-save-3-line"
          onClick={watch().id !== 0 ? onUpdateAuctionRound : onCreateAuctionRound}
          loading={isLoadingEditAuctionRound || isLodingCreateAuctionRound}
          permission={watch().id !== 0 ? 'P13-01-06-01-04-03' : 'P13-01-06-01-04-02'}
          messageTooltip="Guardar cambios"
        />
      </Container>
    </Container>
  )
}

export default JudicialCollateralAuctionRoundActions