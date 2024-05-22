import { ProductType } from '@/types/extrajudicial/product.type'
import { Controller, useFormContext } from 'react-hook-form'
import Select from '@/ui/Select'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import { KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE } from '@/pages/extrajudicial/ExtrajudicialNegotiations/NegotiationTable/utils/ext-negociaciones.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import Label from '@/ui/Label'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import NegotiationModal from '@/pages/extrajudicial/ExtrajudicialNegotiations/Modals/NegotiationModal'
import ProductNameModal from '@/pages/extrajudicial/ExtrajudicialProductName/Modals/ProductNameModal'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import { getProductNameByCHB } from '@/services/extrajudicial/ext-product-name.service'
import { KEY_EXT_PRODUCT_NAME_CACHE } from '@/pages/extrajudicial/ExtrajudicialProductName/ProductNameTable/utils/ext-product-name.cache'

type CobranzaProductsInfoFormProps = {
  clientId: number
}

const CobranzaProductsInfoForm = ({ clientId }: CobranzaProductsInfoFormProps) => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<
    ProductType & {
      negotiation: { name: string; customerHasBankId: string }
      extProductName: { id: number; productName: string; customerHasBankId: string }
    }
  >()

  const negotiation = getValues('negotiation')
  const showNegotiation = negotiation && negotiation.customerHasBankId != idCHB

  const extProductName = getValues('extProductName')
  const showProductName = extProductName && extProductName.customerHasBankId != idCHB

  const optionsStates: Array<SelectItemType> = [
    { key: 'ACTIVA', label: 'ACTIVA' },
    { key: 'CASTIGO', label: 'CASTIGO' },
  ]

  const { data: dataNegotiation } = useQuery<AxiosResponse<Array<NegotiationType>, Error>>(
    [KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE, parseInt(idCHB.length ? idCHB : '0')],
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

  const negotiations = dataNegotiation?.data ?? []

  const optionsNegotiations: Array<SelectItemType> = negotiations.map((negotiation) => {
    return { key: String(negotiation.id), label: negotiation.name }
  })

  const { data: dataProductNames } = useQuery<AxiosResponse<Array<ExtProductNameType>, Error>>(
    [KEY_EXT_PRODUCT_NAME_CACHE, parseInt(idCHB.length ? idCHB : '0')],
    async () => {
      return await getProductNameByCHB(parseInt(idCHB.length ? idCHB : '0'))
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

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  const { visible: visibleModalAddNe, showModal: showModalAddNe, hideModal: hideModalAddNe } = useModal()

  const onShowModalNe = () => {
    showModalAddNe()
  }

  const onCloseModalNe = () => {
    hideModalAddNe()
  }

  const productsName = dataProductNames?.data ?? []

  const optionsProductsName: Array<SelectItemType> = productsName.map((productName) => {
    return { key: String(productName.id), label: productName.productName }
  })

  return (
    <>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <TextField
            disabled={!clientId}
            width="100%"
            label="Código:"
            value={field.value}
            hasError={!!errors.code}
            helperText={errors.code?.message ? errors.code.message : ''}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="extProductNameId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="flex-end">
            <Select
              disabled={!clientId}
              width="100%"
              label="Nombre:"
              value={String(field.value)}
              options={optionsProductsName}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.extProductNameId}
            />

            <Button
              shape="round"
              leadingIcon="ri-add-fill"
              size="small"
              onClick={onShowModal}
              disabled={!idCHB}
              permission="P08-01"
            />

            {showProductName && <Label label={`Nombre de producto: ${extProductName?.productName}`} color="Primary5" />}
          </Container>
        )}
      />

      <Controller
        name="negotiationId"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="flex-end">
            <Select
              disabled={!clientId}
              width="100%"
              label="Negociación:"
              value={String(field.value)}
              options={optionsNegotiations}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.negotiationId}
            />
            <Button
              shape="round"
              leadingIcon="ri-add-fill"
              size="small"
              onClick={onShowModalNe}
              disabled={!idCHB}
              permission="P08-01"
            />

            {showNegotiation && <Label label={`Negociación: ${negotiation?.name}`} color="Primary5" />}
          </Container>
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

      <ProductNameModal visible={visibleModalAdd} onClose={onCloseModal} />
      <NegotiationModal visible={visibleModalAddNe} onClose={onCloseModalNe} />
    </>
  )
}

export default CobranzaProductsInfoForm
