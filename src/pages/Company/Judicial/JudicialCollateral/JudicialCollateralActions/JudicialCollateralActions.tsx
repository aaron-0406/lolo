import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import { device } from '@/breakpoints/responsive'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import Breadcrumbs from '@/ui/Breadcrumbs'

import paths from 'shared/routes/paths'

import { AxiosError, AxiosResponse } from 'axios'

import { useParams } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { CustomErrorResponse } from 'types/customErrorResponse'
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import { createJudicialCollateral, editJudicialCollateral, getJudicialCollateralById } from '@/services/judicial/judicial-collateral.service'
import notification from '@/ui/notification'
import moment from 'moment'
import { useEffect } from 'react'
import judicialCollateralCache from '../../JudicialCollateralList/JudicialCollateralTable/utils/judicial-collateral.cache'

type JudicialCollateralProps = {
  setLoadingGlobal: (state: boolean) => void
  caseFileId: number
}

const JudicialCollateral = ({ setLoadingGlobal, caseFileId }: JudicialCollateralProps) => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()
  const navigate = useNavigate()
  const codeParams = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const {
    getValues, 
    setValue,
    watch
  } = useFormContext<JudicialCollateralType & {
    useOfProperty: { id: number; name: string }
    registrationArea: { id: number; name: string }
    registerOffice: { id: number; name: string }
    notary: { id: number; name: string }
    department: { id: number; name: string }
    province: { id: number; name: string }
    district: { id: number; name: string }
  }>()

  const queryClient = useQueryClient()

  const {
    actions: { editCollateralCache, createJudicialCollateralCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCollateralCache(queryClient)

  const chb = selectedBank.idCHB.length ? parseInt(selectedBank.idCHB) : 0  
  
  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  //Todo : Create a function to get the collateral by id and chb

  const { isLoading: loadingCreateCollateral, mutate: createJudicialCollateralMutate } = useMutation<
    AxiosResponse<JudicialCollateralType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, dateOfPublicDeed, ...restCollateralValues } = getValues()
      return await createJudicialCollateral(
        {
          ...restCollateralValues,
          dateOfPublicDeed: moment(dateOfPublicDeed, 'DD-MM-YYYY').toDate().toISOString(),
          customerHasBankId: chb,
        },
        caseFileId
      ) 
    },
    {
      onSuccess: (data) => {
        createJudicialCollateralCache(data.data, chb)
        setValue('id', data.data.id)
        notification({
          type: 'success',
          message: 'Garantía creada correctamente',
        })
        navigate(paths.judicial.detailCollateral(customer.urlIdentifier, codeParams, data.data.id.toString()))
      },
      onMutate: () => {
        return onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingUpdateCollateral, mutate: updateJudicialCollateralMutate } = useMutation<
    AxiosResponse<JudicialCollateralType>,
    AxiosError<CustomErrorResponse>
  >(async () => {
    const {
      id,
      dateOfPublicDeed,
      useOfProperty,
      registrationArea,
      registerOffice,
      notary,
      department,
      province,
      district,
      ...restCollateralValues
    } = getValues()
    return await editJudicialCollateral(
      collateralCode, 
      {
        ...restCollateralValues,
        dateOfPublicDeed: moment(dateOfPublicDeed, 'DD-MM-YYYY').toDate().toISOString(),
        customerHasBankId: chb,
      },
    )
  },
  {
    onSuccess: (data) => {
      editCollateralCache(data.data, chb)
      setValue('id', data.data.id)
      notification({
        type: 'success',
        message: 'Garantía actualizada correctamente',
      })
      navigate(paths.judicial.detailCollateral(customer.urlIdentifier, codeParams, data.data.id.toString()))
    },
    onMutate: () => {
      return onMutateCache(chb)
    },
    onSettled: () => {
      onSettledCache(chb)
    },
    onError: (error, _, context: any) => {
      onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      notification({
        type: 'error',
        message: error.response?.data.message,
        list: error.response?.data.errors?.map((error) => error.message),
      })
    },
  })

  const { refetch } = useQuery<AxiosResponse<any, Error>>(
    ['get-collateral-by-code', collateralCode ?? ''],
    async () => {
      return await getJudicialCollateralById(collateralCode ?? '') 
    },
    { 
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('dateOfPublicDeed', moment(data.data.dateOfPublicDeed).format('DD-MM-YYYY'))
        setValue('kindOfProperty', data.data.kindOfProperty)
        setValue('propertyAddress', data.data.propertyAddress)
        setValue('propertyFeatures', data.data.propertyFeatures)
        setValue('landArea', data.data.landArea)
        setValue('constructionArea', data.data.constructionArea)
        setValue('electronicRecord', data.data.electronicRecord)
        setValue('numberOfCollateral', data.data.numberOfCollateral)
        setValue('registrationSeat', data.data.registrationSeat)
        setValue('customerHasBankId', data.data.customerHasBankId)
        setValue('departmentId', data.data.departmentId)
        setValue('provinceId', data.data.provinceId)
        setValue('districtId', data.data.districtId)
        setValue('useOfPropertyId', data.data.useOfPropertyId)
        setValue('registrationAreaId', data.data.registrationAreaId)
        setValue('registerOfficeId', data.data.registerOfficeId)
        setValue('notaryId', data.data.notaryId)
        setValue('useOfProperty', data.data.useOfProperty)
        setValue('registrationArea', data.data.registrationArea)
        setValue('registerOffice', data.data.registerOffice)
        setValue('notary', data.data.notary)
        setValue('department', data.data.department)
        setValue('province', data.data.province)
        setValue('district', data.data.district)
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const onCreateCollateral = () => {
    createJudicialCollateralMutate(); 
  }

  const onUpadateCollateral = () => {
    updateJudicialCollateralMutate();
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
      link: paths.judicial.detailCollateral(customer.urlIdentifier, codeParams, collateralCode),
      name: collateralCode,
    },
  ]

  useEffect(() => {
    if (!!codeParams.length && collateralCode !== '00000000') {
      setLoadingGlobal(false)
      refetch()
    }
    // eslint-disable-next-line
  }, [collateralCode])


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
          onClick={watch().id !== 0 ? onUpadateCollateral : onCreateCollateral} 
          loading={loadingCreateCollateral || loadingUpdateCollateral}
          permission={watch().id !== 0 ? 'P13-01-06-03' : 'P13-01-06-02'}
          messageTooltip="Guardar cambios"
        />
      </Container>
    </Container>
  )
}

export default JudicialCollateral
