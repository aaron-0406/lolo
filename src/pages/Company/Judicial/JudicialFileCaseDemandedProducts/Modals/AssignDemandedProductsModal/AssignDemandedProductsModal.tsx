import { useMutation, useQueryClient } from 'react-query'
import judicialDemandedProductsCache, {
  KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE,
} from '../../FileCaseDemandedProductsTable/utils/file-case-demanded-products.cache'
import { FormProvider, useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { assignCaseFileToTheProducts } from '@/services/extrajudicial/product.service'
import { ProductType } from '@/types/extrajudicial/product.type'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { ModalDemandedProductsResolver } from './AssignDemandedProductsModal.yup'
import DemandedProductsInfoForm from './DemandedProductsInfoForm'
import { useEffect } from 'react'

type AssignDemandedProductsModalProps = {
  visible: boolean
  onClose: () => void
  judicialCaseFileId?: number
  clientId?: number
}

const AssignDemandedProductsModal = ({
  visible,
  onClose,
  judicialCaseFileId = 0,
  clientId = 0,
}: AssignDemandedProductsModalProps) => {
  const queryClient = useQueryClient()

  const {
    actions: { assignProductsToTheCaseFileCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialDemandedProductsCache(queryClient)

  const formMethods = useForm<{ products: Array<number> }>({
    resolver: ModalDemandedProductsResolver,
    mode: 'all',
    defaultValues: {
      products: [],
    },
  })

  const {
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingAssignDemandedProducts, mutate: assignDemandedProducts } = useMutation<
    AxiosResponse<Array<ProductType>>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const productIds = JSON.stringify(getValues().products)
      return await assignCaseFileToTheProducts({ productIds, judicialCaseFileId })
    },
    {
      onSuccess: (result) => {
        assignProductsToTheCaseFileCache(result.data, judicialCaseFileId)
        notification({ type: 'success', message: 'Productos asignados al expediente' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(judicialCaseFileId)
      },
      onSettled: () => {
        onSettledCache(judicialCaseFileId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, judicialCaseFileId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAssignDemandedProducts = () => {
    assignDemandedProducts()
  }

  useEffect(() => {
    //INFO: REVIEW THIS CODE TO SOLVE CACHE PROBLEMS
    if (visible) {
      queryClient.invalidateQueries([
        `${KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE}_UNASSIGNED_PRODUCTS`,
        judicialCaseFileId,
      ])
    }
  }, [visible, judicialCaseFileId, queryClient])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-demanded-products"
        title="Asignar productos al expediente"
        contentOverflowY="auto"
        size="large"
        minHeight="230px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="250px"
              label="Assignar productos"
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={onAssignDemandedProducts}
              loading={loadingAssignDemandedProducts}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="230px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <DemandedProductsInfoForm clientId={clientId} judicialCaseFileId={judicialCaseFileId} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default AssignDemandedProductsModal
