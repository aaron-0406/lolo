import { device } from '@/breakpoints/responsive'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { JudicialCollateralAuctionRoundType } from '@/types/judicial/judicial-collateral-auction.type'
import Container from '@/ui/Container'
import DatePicker from '@/ui/DatePicker/DatePicker'
import TextAreaField from '@/ui/fields/TextAreaField'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { Controller, useFormContext } from 'react-hook-form'


enum AuctionType {
  CONVENCIONAL = 'Convencional',
  ELECTRÓNICA = 'Electrónica'
}

const JudicialCollateralAuctionRoundInfo = () => {
  const {
    setValue, 
    control,
    formState: { errors },
  } = useFormContext<JudicialCollateralAuctionRoundType>()
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const optionsAuctionType:Array<SelectItemType> = Object.keys(AuctionType).map((key: string, index) => ({
    key: key as keyof typeof AuctionType,
    label: AuctionType[key as keyof typeof AuctionType],
  }))

  return (
    <Container
      width="100%"
      height="calc(100% - 100px)"
      display="flex"
      flexDirection="column"
      padding="20px"
      gap="20px"
      overFlowY="auto"
    >
      <Container width="100%" display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="appraisalDate"
          render={({ field }) => (
            <DatePicker
              label="Fecha de de tasación comercial"
              selectedDate={field.value}
              placeholder="Ingrese la fecha:"
              dateFormat="DD-MM-YYYY"
              value={field.value ?? 'Seleccione una fecha'}
              getDate={(e) => {
                setValue('appraisalDate', e)
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="expertReportDate"
          render={({ field }) => (
            <DatePicker
              label="Fecha de informe pericial"
              selectedDate={field.value}
              placeholder="Ingrese la fecha:"
              dateFormat="DD-MM-YYYY"
              value={field.value ?? 'Seleccione una fecha'}
              getDate={(e) => {
                setValue('expertReportDate', e)
              }}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="encumbranceAmountSoles"
          render={({ field }) => (
            <TextField
              label="Monto de Gravamen S/:"
              width="100%"
              helperText={errors.encumbranceAmountSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.encumbranceAmountSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="encumbranceAmountDollars"
          render={({ field }) => (
            <TextField
              label="Monto de Gravamen US$:"
              width="100%"
              helperText={errors.encumbranceAmountDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.encumbranceAmountDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="conventionalValueSoles"
          render={({ field }) => (
            <TextField
              label="Valor Convencional S/:"
              width="100%"
              helperText={errors.conventionalValueSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.conventionalValueSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="conventionalValueDollars"
          render={({ field }) => (
            <TextField
              label="Valor Convencional US$:"
              width="100%"
              helperText={errors.conventionalValueDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.conventionalValueDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="marketValueSoles"
          render={({ field }) => (
            <TextField
              label="Valor de Mercado S/:"
              width="100%"
              helperText={errors.marketValueSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.marketValueSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="marketValueDollars"
          render={({ field }) => (
            <TextField
              label="Valor de Mercado US$:"
              width="100%"
              helperText={errors.marketValueDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.marketValueDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="realizationValueSoles"
          render={({ field }) => (
            <TextField
              label="Valor de Realización S/:"
              width="100%"
              helperText={errors.realizationValueSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.realizationValueSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="realizationValueDollars"
          render={({ field }) => (
            <TextField
              label="Valor de Realización US$:"
              width="100%"
              helperText={errors.realizationValueDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.realizationValueDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="auctionValueSoles"
          render={({ field }) => (
            <TextField
              label="Valor de remate S/:"
              width="100%"
              helperText={errors.auctionValueSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.auctionValueSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="auctionValueDollars"
          render={({ field }) => (
            <TextField
              label="Valor de remate US$:"
              width="100%"
              helperText={errors.auctionValueDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.auctionValueDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="firstCallSoles"
          render={({ field }) => (
            <TextField
              label="Primera convocatoria S/:"
              width="100%"
              helperText={errors.firstCallSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.firstCallSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="firstCallDollars"
          render={({ field }) => (
            <TextField
              label="Primera convocatoria US$:"
              width="100%"
              helperText={errors.firstCallDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.firstCallDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="secondCallSoles"
          render={({ field }) => (
            <TextField
              label="Segunda convocatoria S/:"
              width="100%"
              helperText={errors.secondCallSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.secondCallSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="secondCallDollars"
          render={({ field }) => (
            <TextField
              label="Segunda convocatoria US$:"
              width="100%"
              helperText={errors.secondCallDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.secondCallDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="thirdCallSoles"
          render={({ field }) => (
            <TextField
              label="Tercera convocatoria S/:"
              width="100%"
              helperText={errors.thirdCallSoles?.message}
              value={field.value}
              type="currency"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.thirdCallSoles}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="thirdCallDollars"
          render={({ field }) => (
            <TextField
              label="Tercera convocatoria US$:"
              width="100%"
              helperText={errors.thirdCallDollars?.message}
              value={field.value}
              type="currency"
              prefix="$"
              onValueChange={(_, __, values) => {
                field.onChange(values?.value)
              }}
              decimalScale={2}
              decimalsLimit={2}
              hasError={!!errors.thirdCallDollars}
              disabled={!chb}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="auctionRound"
          render={({ field }) => (
            <TextField
              label="Nº de ronda"
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.auctionRound}
              helperText={errors.auctionRound?.message}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="auctionType"
          render={({ field }) => (
            <Select
              label="Tipo de colección:"
              placeholder="Seleccione un tipo de colección"
              width="100%"
              value={String(field.value)}
              options={optionsAuctionType}
              onChange={(key) => {
                field.onChange(key as keyof typeof AuctionType)
              }}
              hasError={!!errors.auctionType}
              helperText={errors.auctionType?.message}
            />
          )}
        />
      </Container>
      <Container display="flex" flexDirection={greaterThanTabletL ? 'row' : 'column'} gap="10px">
        <Controller
          control={control}
          name="appraisalExperts"
          render={({ field }) => (
            <TextAreaField
              label="Peritos tasadores"
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.appraisalExperts}
              helperText={errors.appraisalExperts?.message}
              disabled={!chb}
            />
          )}
        />
        <Controller
          control={control}
          name="auctionerName"
          render={({ field }) => (
            <TextField
              id="auctionerName"
              label="Nombre del martillero"
              placeholder="Nombre del martillero"
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.auctionerName}
              helperText={errors.auctionerName?.message}
              disabled={!chb}
            />
          )}
        />
      </Container>
    </Container>
  )
}

export default JudicialCollateralAuctionRoundInfo