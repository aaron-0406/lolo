import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import { ModalProductNameResolver } from './ProductNameModal.yup'
import {
  createProductName,
  getProductNameByID,
  editProductName,
} from '@/services/extrajudicial/ext-product-name.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import ProductNameInfoForm from './ProductNameInfoForm'
import extProductNameCache, { KEY_EXT_PRODUCT_NAME_CACHE } from '../../ProductNameTable/utils/ext-product-name.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type ProductNameModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idProductName?: number
}

const ProductNameModal = ({ visible, onClose, isEdit = false, idProductName = 0 }: ProductNameModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { createProductNameCache, editProductNameCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extProductNameCache(queryClient)

  const formMethods = useForm<Omit<ExtProductNameType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalProductNameResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      productName: '',
      customerHasBankId: chbNumber,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateProductName, mutate: createProductNameMutate } = useMutation<
    AxiosResponse<ExtProductNameType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createProductName({ ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (result) => {
        createProductNameCache(result.data)
        notification({ type: 'success', message: 'Nombre de producto creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditProductName, mutate: editProductNameMutate } = useMutation<
    AxiosResponse<ExtProductNameType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editProductName({ ...restClient, customerHasBankId: chbNumber }, id)
    },
    {
      onSuccess: (result) => {
        editProductNameCache(result.data)
        notification({ type: 'success', message: 'Nombre de producto editado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetProductNameById } = useQuery<AxiosResponse<ExtProductNameType>>(
    [`${KEY_EXT_PRODUCT_NAME_CACHE}-GET-PRODUCT-NAME-BY-ID`, parseInt(chb.length ? chb : '0')],
    async () => {
      return getProductNameByID(idProductName)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idProductName) {
          setValue('id', data.id, { shouldValidate: true })
          setValue('productName', data.productName, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddProductName = () => {
    createProductNameMutate()
  }

  const onEditProductName = () => {
    editProductNameMutate()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idProductName) {
      refetchGetProductNameById()
    }
  }, [idProductName, refetchGetProductNameById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-product-name"
        title={isEdit ? 'Editar nombre de producto' : 'Agregar nombre de producto'}
        contentOverflowY="auto"
        size="small"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditProductName : onAddProductName}
              loading={loadingCreateProductName || loadingEditProductName}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="210px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <ProductNameInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default ProductNameModal
