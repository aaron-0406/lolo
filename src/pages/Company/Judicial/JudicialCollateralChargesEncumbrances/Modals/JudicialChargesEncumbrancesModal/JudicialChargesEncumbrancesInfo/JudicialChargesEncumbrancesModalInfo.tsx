import Container from "@/ui/Container"
import { useFormContext, Controller } from "react-hook-form"
import TextField from "@/ui/fields/TextField"
import { useEffect } from "react"
import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "@/types/judicial/judicial-collateral-charges-encumbrances-type-load.type"
import { KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE } from "pages/Company/Judicial/JudicialCollateralChargesEncumbrancesTypeLoad/JudicialCollateralChargesEncumbrancesTypeLoadTable/utils/judicial-collateral-charges-encumbrances-type-load.cache"
import { useLoloContext } from "@/contexts/LoloProvider"
import { getJudicialCollateralChargesEncumbrancesTypeLoadByCHB } from "@/services/judicial/judicial-collateral-charges-encumbrances-type-load.service"
import notification from "@/ui/notification"
import { SelectItemType } from "@/ui/Select/interfaces"
import Select from "@/ui/Select"
import { JudicialCollateralChargesEncumbrancesType } from "@/types/judicial/judicial-collateral-charges-encumbrances.type"
import TextAreaField from "@/ui/fields/TextAreaField"
import DatePicker from "@/ui/DatePicker/DatePicker"
import moment from "moment"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { device } from "@/breakpoints/responsive"
import Button from "@/ui/Button"
import useModal from "@/hooks/useModal"
import JudicialCollateralChargesEncumbrancesTypeLoadModal from "pages/Company/Judicial/JudicialCollateralChargesEncumbrancesTypeLoad/Modals/JudicialCollateralChargesEncumbrancesTypeLoadModal"

const JudicialChargesEncumbrancesTypeLoadModalInfo = () => {
  const {
    control,
    reset, 
    formState: { errors },
  } = useFormContext<JudicialCollateralChargesEncumbrancesType>()

  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const { hideModal: hideModalAddChargesEncumbrancesTypeLoad, showModal: showModalAddChargesEncumbrancesTypeLoad, visible: visibleAddChargesEncumbrancesTypeLoad } = useModal()

  useEffect(()=> {
    return reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const greatherThanTabletL = useMediaQuery(device.tabletL)

  const { data } = useQuery<AxiosResponse<Array<JudicialCollateralChargesEncumbrancesTypeLoadType>, Error>>(
    [KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getJudicialCollateralChargesEncumbrancesTypeLoadByCHB(parseInt(chb.length ? chb : '0'))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message ?? 'Error al obtener las tipos de cargas y gravámenes.',
        })
      },
    }
  )

  const currenChargesEncumbrancesTypeLoad = data?.data ?? []
  
  const chargesTypeOptions: Array<SelectItemType> = currenChargesEncumbrancesTypeLoad?.map((type) => ({
    key: String(type.id),
    label: type.name,
  })) ?? []

  return (
    <Container
      display="flex"
      flexDirection={greatherThanTabletL ? 'row' : 'column'}
      gap="10px"
      width="100%"
      height="max-content"
      justifyContent="center"
      padding="10px"
    >
      <Container
        display="flex"
        flexDirection="column"
        gap="20px"
        width="100%"
        justifyContent="start"
        padding="0px 20px"
        alignItems="start"
      >
        <Controller
          name="registrationSeat"
          control={control}
          render={({ field }) => (
            <TextField
              label="Asiento de inscripción"
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.registrationSeat}
              helperText={errors.registrationSeat?.message}
            />
          )}
        />
        <Controller
          name="range"
          control={control}
          render={({ field }) => (
            <TextField
              label="Rango"
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.range}
              helperText={errors.range?.message}
            />
          )}
        />
        <Controller
          name="typeOfLoadId"
          control={control}
          render={({ field }) => (
            <Container
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="nowrap"
              width="100%"
              alignItems="flex-end"
            >
              <Select
                required
                label="Tipo de cargas y gravámenes"
                placeholder={'Seleccione un tipo de cargas y gravámenes'}
                width="100%"
                value={String(field.value)}
                options={chargesTypeOptions}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
              />
              <Button
                permission="P41-01"
                messageTooltip="Agregar Tipo de carga y gravámenes"
                shape="round"
                size="small"
                leadingIcon="ri-add-line"
                onClick={showModalAddChargesEncumbrancesTypeLoad}
                disabled={!chb}
              />
            </Container>
          )}
        />

        <Controller
          name="amountOfImpactSoles"
          control={control}
          render={({ field }) => (
            <TextField
              label="Monto de afectación S/:"
              width="100%"
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={3}
              decimalsLimit={3}
              hasError={!!errors.amountOfImpactSoles}
              helperText={errors.amountOfImpactSoles?.message}
            />
          )}
        />
        <Controller
          name="amountOfImpactDollars"
          control={control}
          render={({ field }) => (
            <TextField
              label="Monto de afectación US$:"
              width="100%"
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              prefix="$"
              decimalScale={3}
              decimalsLimit={3}
              hasError={!!errors.amountOfImpactDollars}
              helperText={errors.amountOfImpactDollars?.message}
            />
          )}
        />
      </Container>
      <Container
        display="flex"
        flexDirection="column"
        gap="5px"
        width="100%"
        justifyContent="start"
        padding="0px 20px"
      >
        <Controller
          name="registrationDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              labelWidth="10rem"
              label="Fecha de Demanda:"
              selectedDate={moment(field.value).format('DD-MM-YYYY')}
              placeholder="Ingrese la fecha:"
              dateFormat="DD-MM-YYYY"
              value={field.value ?? moment(new Date()).format('DD-MM-YYYY')}
              getDate={(e) => {
                field.onChange(e)
              }}
            />
          )}
        />
        <Controller
          name="appraisalDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              labelWidth="10rem"
              label="Fecha de Tasación:"
              selectedDate={moment(field.value).format('DD-MM-YYYY')}
              placeholder="Ingrese la fecha:"
              dateFormat="DD-MM-YYYY"
              value={field.value ?? moment(new Date()).format('DD-MM-YYYY')}
              getDate={(e) => {
                field.onChange(e)
              }}
            />
          )}
        />
        <Controller
          name="descriptionOfLoad"
          control={control}
          render={({ field }) => (
            <TextAreaField
              value={field.value}
              onChange={field.onChange}
              rows={3}
              width="100%"
              label="Descripción de carga y gravamen"
              placeholder="Descripción de carga y gravamen"
              required
            />
          )}
        />
      </Container>
      {visibleAddChargesEncumbrancesTypeLoad ? (
        <JudicialCollateralChargesEncumbrancesTypeLoadModal
          isOpen={visibleAddChargesEncumbrancesTypeLoad}
          onClose={hideModalAddChargesEncumbrancesTypeLoad}
        />
      ) : null}
    </Container>
  )
}

export default JudicialChargesEncumbrancesTypeLoadModalInfo