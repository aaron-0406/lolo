import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'

import styled, { css } from 'styled-components'
import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { useFormContext, Controller } from 'react-hook-form'
import TextAreaField from '@/ui/fields/TextAreaField'
import DatePicker from '@/ui/DatePicker/DatePicker'
import Select from '@/ui/Select'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { DepartmentType } from '@/types/config/department.type'
import { getDepartments } from '@/services/config/department.service'
import { SelectItemType } from '@/ui/Select/interfaces'
import { getProvincesByDepartment } from '@/services/config/province.service'
import { useEffect, useState } from 'react'
import { DistrictType } from '@/types/config/district.type'
import { getDistrictsByProvince } from '@/services/config/district.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialUseOfPropertyType } from '@/types/judicial/judicial-use-of-property.type'
import { KEY_JUDICIAL_USE_OF_PROPERTY_CACHE } from '../../JudicialUseOfProperty/JudicialUseOfPropertyTable/utils/judicial-use-of-property.cache';
import { getJudicialUseOfPropertyByCHB } from '@/services/judicial/judicial-use-of-property.service'
import { JudicialRegistrationAreaType } from '@/types/judicial/judicial-registration-area.type'
import { KEY_JUDICIAL_REGISTRATION_AREA_CACHE } from '../../JudicialRegistrationArea/JudicialRegistrationAreaTable/utils/judicial-registration-area.cache'
import { getJudicialRegistrationAreaByCHB } from '@/services/judicial/judicial-registration-area.service'
import { JudicialNotaryType } from '@/types/judicial/judicial-notary.type'
import { KEY_JUDICIAL_NOTARY_CACHE } from '../../JudcialNotary/JudicialNotaryTable/utils/judicial-notary.cache'
import { getJudicialNotaryByCHB } from '@/services/judicial/judicial-notary.service'
import { KEY_JUDICIAL_REGISTER_OFFICE_CACHE } from '../../JudicialRegisterOffice/JudicialRegisterOfficeTable/utils/judicial-register-office.cache';
import { JudicialRegisterOfficeType } from '@/types/judicial/judicial-register-office.type'
import { getJudicialRegisterOfficeByCHB } from '@/services/judicial/judicial-register-office.service'


type JudicialCollateralInfoProps = {
  loading: boolean
}

const JudicialCollateralInfo = ({loading}: JudicialCollateralInfoProps) => {
  const {
    getValues,
    setValue,  
    control, 
  } = useFormContext<JudicialCollateralType>()
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const collateralData = getValues()
  const [ departmentId, setDepartmentId ] = useState<number>(collateralData.departmentId)
  const [ provinceId, setProvinceId ] = useState<number>(collateralData.provinceId)

  
  const { data: departmentsData } = useQuery<AxiosResponse<Array<DepartmentType>>>(
    ['KEY_DEPARTMENTS_CACHE'],
    async () => {
      return await getDepartments()
    }
  )

  const {data: provincesData, refetch: refetchProvinces} = useQuery<AxiosResponse<Array<DepartmentType>>>(
    ['KEY_PROVINCES_CACHE'],
    async () => {
      const departmentId = getValues('departmentId')
      return await getProvincesByDepartment(departmentId)
    }
  )

  const { data: districtsData, refetch: refetchDistricts } = useQuery<AxiosResponse<Array<DistrictType>>>(
    ['KEY_DISTRICTS_CACHE'],
    async () => {
      const provinceId = getValues('provinceId')
      return await getDistrictsByProvince(provinceId)
    }
  )

  const { data:useOfPropertyData } = useQuery<AxiosResponse<Array<JudicialUseOfPropertyType>>>(
    [KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialUseOfPropertyByCHB(parseInt(chb.length ? chb : '0'))
    }
  ) 

  const { data: registrationAreaData} = useQuery<AxiosResponse<Array<JudicialRegistrationAreaType>>>(
    [KEY_JUDICIAL_REGISTRATION_AREA_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialRegistrationAreaByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const { data: registerOfficeData } = useQuery<AxiosResponse<Array<JudicialRegisterOfficeType>>>(
    [KEY_JUDICIAL_REGISTER_OFFICE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialRegisterOfficeByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  const { data: notaryData } = useQuery<AxiosResponse<Array<JudicialNotaryType>>>(
    [KEY_JUDICIAL_NOTARY_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialNotaryByCHB(parseInt(chb.length ? chb : '0'))
    }
  )

  useEffect(()=>{
    if (departmentId) refetchProvinces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId])

  useEffect(()=>{
    if (provinceId) refetchDistricts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId])

  const departmentsOptions: Array<SelectItemType> = departmentsData?.data?.map((department) => ({
    key: String(department.id),
    label: department.name,
  })) ?? [];

  const provincesOptions: Array<SelectItemType> = provincesData?.data?.map((province) => ({
    key: String(province.id),
    label: province.name,
  })) ?? []

  const districtsOptions: Array<SelectItemType> = districtsData?.data?.map((district) => ({
    key: String(district.id),
    label: district.name,
  })) ?? []

  const useOfPropertyOptions: Array<SelectItemType> = useOfPropertyData?.data?.map((useOfProperty) => ({
    key: String(useOfProperty.id),
    label: useOfProperty.name,
  })) ?? []

  const registrationAreaOptions: Array<SelectItemType> = registrationAreaData?.data?.map((registrationArea) => ({
    key: String(registrationArea.id),
    label: registrationArea.name,
  })) ?? []

  const registerOfficeOptions: Array<SelectItemType> = registerOfficeData?.data?.map((registerOffice) => ({
    key: String(registerOffice.id),
    label: registerOffice.name,
  })) ?? []

  const notaryOptions: Array<SelectItemType> = notaryData?.data?.map((notary) => ({
    key: String(notary.id),
    label: notary.name,
  })) ?? []

  return (
    <StyledContainer
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      padding="0px 40px"
      gap="20px"
      overFlowY="auto"
    >
      <Container width="100%" display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="20px">
        <Container width="100%" display="flex" flexDirection="column" gap="15px">
          <Controller
            name="kindOfProperty"
            control={control}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                width="100%"
                label="Tipo de bien"
                placeholder="Código de Garantía"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="electronicRecord"
            control={control}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                width="100%"
                label="Partida electrónica"
                placeholder="Partida electrónica"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="registrationSeat"
            control={control}
            render={({ field }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                width="100%"
                label="Asiento de inscripción"
                placeholder="Asiento de inscripción"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="numberOfCollateral"
            control={control}
            render={({ field }) => (
              <TextField
                type="number"
                value={field.value}
                onChange={field.onChange}
                width="100%"
                label="Número de garantía"
                placeholder="Agregar número de garantía"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="dateOfPublicDeed"
            control={control}
            render={({ field }) => (
              <DatePicker
                required
                helpTextColor="black"
                label="Fecha de escritura pública"
                selectedDate={field.value}
                placeholder="Ingrese la fecha:"
                dateFormat="DD-MM-YYYY"
                value={field.value}
                getDate={(e) => {
                  setValue('dateOfPublicDeed', e)
                }}
              />
            )}
          />

          <Container width="100%" display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="20px">
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Departamento"
                  placeholder="Seleccione un departamento"
                  width="100%"
                  value={String(field.value)}
                  options={departmentsOptions}
                  onChange={(key) => {
                    setDepartmentId(parseInt(key))
                    setValue('provinceId', 0)
                    setValue('districtId', 0)
                    field.onChange(parseInt(key))
                  }}
                />
              )}
            />

            <Controller
              name="provinceId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Provincia"
                  placeholder="Seleccione una provincia"
                  width="100%"
                  value={String(field.value)}
                  options={provincesOptions}
                  onChange={(key) => {
                    setProvinceId(parseInt(key))
                    setValue('districtId', 0)
                    field.onChange(parseInt(key))
                  }}
                  disabled={!departmentId}
                />
              )}
            />

            <Controller
              name="districtId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Distrito"
                  placeholder="Seleccione un distrito"
                  width="100%"
                  value={String(field.value)}
                  options={districtsOptions}
                  onChange={(key) => {
                    field.onChange(parseInt(key))
                  }}
                  disabled={!provinceId}
                />
              )}
            />
          </Container>

          <Container width="100%" display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="20px">
            <Controller
              name="registrationAreaId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Zona registral"
                  placeholder="Seleccione una zona registral"
                  width="100%"
                  value={String(field.value)}
                  options={registrationAreaOptions}
                  onChange={(key) => {
                    field.onChange(parseInt(key))
                  }}
                />
              )}
            />
            <Controller
              name="registerOfficeId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Oficina registral"
                  placeholder="Seleccione una oficina registral"
                  width="100%"
                  value={String(field.value)}
                  options={registerOfficeOptions}
                  onChange={(key) => {
                    field.onChange(parseInt(key))
                  }}
                />
              )}
            />
          </Container>
            
          <Container width="100%" display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="20px"> 

            <Controller
              name="useOfPropertyId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Uso del bien"
                  placeholder="Seleccione un uso del bien"
                  width="100%"
                  value={String(field.value)}
                  options={useOfPropertyOptions}
                  onChange={(key) => {
                    field.onChange(parseInt(key))
                  }}
                  disabled={!chb}
                />
              )}
            />

            <Controller
              name="notaryId"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  label="Notaria"
                  placeholder="Seleccione una notaria"
                  width="100%"
                  value={String(field.value)}
                  options={notaryOptions}
                  onChange={(key) => {
                    field.onChange(parseInt(key))
                  }}
                />
              )}
            />
          </Container>
        </Container>

        <Container width="100%" display="flex" flexDirection="column" gap="20px">
          <Controller
            name="propertyAddress"
            control={control}
            render={({ field }) => (
              <TextAreaField
                value={field.value}
                onChange={field.onChange}
                rows={3}
                width="100%"
                label="Dirección de la propiedad"
                placeholder="Dirección de la propiedad"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="propertyFeatures"
            control={control}
            render={({ field }) => (
              <TextAreaField
                value={field.value}
                onChange={field.onChange}
                rows={6}
                width="100%"
                label="Características de la propiedad"
                placeholder="Características de la propiedad"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="landArea"
            control={control}
            render={({ field }) => (
              <TextAreaField
                value={field.value}
                onChange={field.onChange}
                rows={3}
                width="100%"
                label="Área de terreno"
                placeholder="Área de terreno"
                disabled={loading}
                required
              />
            )}
          />

          <Controller
            name="constructionArea"
            control={control}
            render={({ field }) => (
              <TextAreaField
                value={field.value}
                onChange={field.onChange}
                rows={3}
                width="100%"
                label="Área de construcción"
                placeholder="Área de construcción"
                disabled={loading}
                required
              />
            )}
          />
        </Container>
      </Container>
    </StyledContainer>
  )
}

export default JudicialCollateralInfo

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;

    .fields-wrapper-container-t {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .fields-wrapper-container-d {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .field-wrapper {
      width: 100%;
      display: flex;
      gap: 15px;
    }

    @media ${theme.device.tabletL} {
      .fields-wrapper-container-t {
        flex-direction: row;
        gap: 15px;
      }
    }

    @media ${theme.device.desktopL} {
      .fields-wrapper-container-d {
        flex-direction: row;
        gap: 15px;
      }
    }
  `}
`