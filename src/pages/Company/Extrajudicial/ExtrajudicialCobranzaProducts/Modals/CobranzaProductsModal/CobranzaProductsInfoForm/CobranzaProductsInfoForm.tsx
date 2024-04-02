import { ProductType } from '@/types/extrajudicial/product.type'
import { Controller, useFormContext } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import Select from '@/ui/Select'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import notification from '@/ui/notification'
import { useLoloContext } from '@/contexts/LoloProvider'

type CobranzaProductsInfoFormProps = {
  clientId: number
  isEdit: boolean
}

const CobranzaProductsInfoForm = ({ clientId, isEdit }: CobranzaProductsInfoFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductType>()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<Array<NegotiationType>, Error>>(
    ['get-all-negotiations-by-chb', idCHB],
    async () => {
      return await getAllNegociacionesByCHB(Number(idCHB))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const negotiations = data?.data ?? []

  const optionsNegotiations: Array<SelectItemType> = negotiations.map((negotiation) => {
    return { key: String(negotiation.id), label: negotiation.name }
  })

  const optionsNames: Array<SelectItemType> = [
    { key: 'ADELANTO SUELDO ATRASO', label: 'ADELANTO SUELDO ATRASO' },
    { key: 'AMEX LAN CLASICA', label: 'AMEX LAN CLASICA' },
    { key: 'AMEX LAN PLATINUM', label: 'AMEX LAN PLATINUM' },
    { key: 'AMEX ORO', label: 'AMEX ORO' },
    { key: 'AMEX ORO LAN', label: 'AMEX ORO LAN' },
    { key: 'AMEX VERDE', label: 'AMEX VERDE' },
    { key: 'CTEORD', label: 'CTEORD' },
    { key: 'EFECTIVO', label: 'EFECTIVO' },
    { key: 'EFECTIVO DSCTO. POH', label: 'EFECTIVO DSCTO. POH' },
    { key: 'EFECTIVO NEGOCIOS', label: 'EFECTIVO NEGOCIOS' },
    { key: 'GARANTIA HIPOTECARIA', label: 'GARANTIA HIPOTECARIA' },
    { key: 'HIPOTECARIO VIVIENDA', label: 'HIPOTECARIO VIVIENDA' },
    { key: 'HIPOTECARIO VIVIENDA REF', label: 'HIPOTECARIO VIVIENDA REF' },
    { key: 'HVIC', label: 'HVIC' },
    { key: 'MI VIVIENDA', label: 'MI VIVIENDA' },
    { key: 'NEGOCIO COMERCIAL', label: 'NEGOCIO COMERCIAL' },
    { key: 'REFINANCIADO LETRAS', label: 'REFINANCIADO LETRAS' },
    { key: 'REFINANCIADO PAGARES', label: 'REFINANCIADO PAGARES' },
    { key: 'REPROGRAMADO CONSUMO', label: 'REPROGRAMADO CONSUMO' },
    { key: 'REPROGRAMADO PYME', label: 'REPROGRAMADO PYME' },
    { key: 'SOLUCION NEGOCIOS', label: 'SOLUCION NEGOCIOS' },
    { key: 'VEHICULAR', label: 'VEHICULAR' },
    { key: 'VISA CLASICA', label: 'VISA CLASICA' },
    { key: 'VISA CLASICA LAN', label: 'VISA CLASICA LAN' },
    { key: 'VISA CLASICA MASIVA', label: 'VISA CLASICA MASIVA' },
    { key: 'VISA EXACTA', label: 'VISA EXACTA' },
    { key: 'VISA ORO', label: 'VISA ORO' },
    { key: 'VISA ORO LAN', label: 'VISA ORO LAN' },
    { key: 'VISA PLATINUM', label: 'VISA PLATINUM' },
    { key: 'VISA PLATINUM LAN', label: 'VISA PLATINUM LAN' },
    { key: 'VISA SIGNATURE', label: 'VISA SIGNATURE' },
  ]

  const optionsStates: Array<SelectItemType> = [
    { key: 'ACTIVA', label: 'ACTIVA' },
    { key: 'CASTIGO', label: 'CASTIGO' },
  ]

  return (
    <>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            readOnly={isEdit}
            width="100%"
            label="Código:"
            value={field.value}
            hasError={!!errors.code}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Select
            disabled={!clientId}
            width="100%"
            label="Nombre:"
            value={field.value}
            options={optionsNames}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.name}
          />
        )}
      />

      <Controller
        name="negotiationId"
        control={control}
        render={({ field }) => (
          <Select
            disabled={!clientId}
            width="100%"
            label="Negociación:"
            value={String(field.value)}
            options={optionsNegotiations}
            onChange={(key) => {
              field.onChange(parseInt(key))
            }}
            hasError={!!errors.name}
          />
        )}
      />

      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <Select
            disabled={!clientId}
            width="100%"
            label="Estado:"
            value={field.value}
            options={optionsStates}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.state}
          />
        )}
      />
    </>
  )
}

export default CobranzaProductsInfoForm
