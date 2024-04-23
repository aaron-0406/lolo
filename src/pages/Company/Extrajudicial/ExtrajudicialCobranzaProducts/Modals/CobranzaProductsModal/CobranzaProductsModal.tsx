import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyProductsCache, {
  KEY_COBRANZA_URL_PRODUCT_CODE_CACHE,
} from '../../CobranzaProductsTable/utils/company-products.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import { FormProvider, useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import { useEffect } from 'react'
import { ProductType } from '@/types/extrajudicial/product.type'
import { ModalProductsResolver } from './CobranzaProductsModal.yup'
import { createProduct, editProduct, getProductById } from '@/services/extrajudicial/product.service'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import CobranzaProductsInfoForm from './CobranzaProductsInfoForm'

type CobranzaProductsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idProduct?: number
  clientId?: number
}

const CobranzaProductsModal = ({
  visible,
  onClose,
  isEdit = false,
  idProduct = 0,
  clientId = 0,
}: CobranzaProductsModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { createCobranzaProductCache, editCobranzaProductCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyProductsCache(queryClient)

  const {
    client: {
      customer: { id: customerId },
    },
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const formMethods = useForm<Omit<ProductType, 'id'> & { negotiation: { name: string; customerHasBankId: string } }>({
    resolver: ModalProductsResolver,
    mode: 'all',
    defaultValues: {
      code: '',
      clientId: 0,
      customerId: customerId,
      state: '',
      negotiationId: 0,
      extProductNameId: 0,
      customerHasBankId: idCHB.length ? parseInt(idCHB) : 0,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaProduct, mutate: createCobranzaProduct } = useMutation<
    AxiosResponse<ProductType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { negotiation, ...restClient } = getValues()
      return await createProduct({ ...restClient, clientId })
    },
    {
      onSuccess: (result) => {
        createCobranzaProductCache(result.data, clientId)
        notification({ type: 'success', message: 'Producto creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditCobranzaProduct, mutate: editCobranzaProduct } = useMutation<
    AxiosResponse<ProductType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { customerId, clientId, negotiation, ...restClient } = getValues()
      return await editProduct({ ...restClient }, idProduct)
    },
    {
      onSuccess: (result) => {
        editCobranzaProductCache(result.data, clientId)
        notification({ type: 'success', message: 'Producto editado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchGetCobranzaProductById } = useQuery(
    [`${KEY_COBRANZA_URL_PRODUCT_CODE_CACHE}_GET_PRODUCT_BY_ID`],
    async () => {
      return getProductById(idProduct)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idProduct) {
          setValue('code', data.code, { shouldValidate: true })
          setValue('state', data.state, { shouldValidate: true })
          setValue('clientId', data.clientId, { shouldValidate: true })
          setValue('negotiationId', data.negotiationId, { shouldValidate: true })
          setValue('negotiation', data.negotiation, { shouldValidate: true })
          setValue('extProductNameId', data.extProductNameId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddProduct = () => {
    createCobranzaProduct()
  }

  const onEditProduct = () => {
    editCobranzaProduct()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idProduct) {
      refetchGetCobranzaProductById()
    }
  }, [idProduct, refetchGetCobranzaProductById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Producto' : 'Agregar Producto'}
        contentOverflowY="auto"
        size="small"
        minHeight="430px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditProduct : onAddProduct}
              loading={loadingCreateCobranzaProduct || loadingEditCobranzaProduct}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="430px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <CobranzaProductsInfoForm clientId={clientId} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaProductsModal
