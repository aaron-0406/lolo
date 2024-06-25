import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import { device } from '@/breakpoints/responsive'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import Breadcrumbs from '@/ui/Breadcrumbs'

import paths from 'shared/routes/paths'

import { AxiosError, AxiosResponse } from 'axios'

import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import { createJudicialCollateral } from '@/services/judicial/judicial-collateral.service'
import { useFormContext } from 'react-hook-form'
import notification from '@/ui/notification'

type JudicialCollateralProps = {
  setLoadingGlobal: (state: boolean) => void
  collateralId: number
}

const JudicialCollateral = ({ setLoadingGlobal, collateralId }: JudicialCollateralProps) => {
  const queryClient = useQueryClient()
  const {
    client: { customer },
    // bank: { selectedBank },
  } = useLoloContext()
  const codeParams = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const {
    getValues, 
    watch
  } = useFormContext<JudicialCollateralType>()

  // const chb = selectedBank.idCHB.length ? parseInt(selectedBank.idCHB) : 0
  
  // const navigate = useNavigate()
  
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  //Todo : Create a function to get the collateral by id and chb

  const { isLoading: loadingCreateCollateral, mutate: createJudicialCollateralMutate } = useMutation<
    AxiosResponse<JudicialCollateralType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restCollateralValues } = getValues()
      return await createJudicialCollateral(restCollateralValues)
    },
    {
      onSuccess: (data) => {
        //TODO: ADD CHACHE FROM TABLE
      },
      onError: (error, _, context: any) => {
        // onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onCreateCollateral = () => {
    const collateralValues = getValues()
    console.log(collateralValues)
    // createJudicialCollateralMutate(); 
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
      name: 'Garantía',
    },
    {
      link: paths.judicial.detailCollateral(
        customer.urlIdentifier,
        codeParams,
        collateralCode
      ),
      name: collateralCode,
    },
  ]


  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems={greaterThanDesktopS ? 'center' : 'start'}
      gap="20px"
      padding={greaterThanDesktopS ? '20px' : '0px'}
      flexDirection={greaterThanDesktopS ? 'row' : 'column'}
    >
      <Breadcrumbs routes={routers} />

      <Container width="fit-content" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Button
          width="130px"
          label={greaterThanDesktopS && 'Guardar'}
          shape={greaterThanDesktopS ? 'default' : 'round'}
          size={greaterThanTabletS ? 'default' : 'small'}
          trailingIcon="ri-save-3-line"
          // onClick={watch().id !== 0 }
          onClick={onCreateCollateral} 
          loading={loadingCreateCollateral}
          // permission={watch().id !== 0 ? 'P13-01-06-02' : 'P13-01-06-03'}
          messageTooltip="Guardar cambios"
        />
      </Container>
    </Container>
  )
}

export default JudicialCollateral
