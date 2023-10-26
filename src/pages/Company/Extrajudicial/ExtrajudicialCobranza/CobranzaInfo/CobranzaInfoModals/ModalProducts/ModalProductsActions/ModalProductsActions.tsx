import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { createProduct, deleteProduct, editProduct } from '@/services/extrajudicial/product.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { ProductFormType } from '../hookforms.interfaces'
import { useFormContext } from 'react-hook-form'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'

const ModalProductsActions = () => {
  const { setValue, getValues, handleSubmit, watch } = useFormContext<ProductFormType>()
  const { isLoading: loadingCreateProduct, mutate: createProductMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, products, ...restProduct } = getValues()
      return await createProduct(restProduct)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('products', [...getValues('products'), data.data])
        onCleanFields()
        notification({ type: 'success', message: 'Producto creado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditProduct, mutate: editProductMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, products, clientCode, code, customerId, ...restProduct } = getValues()
      return await editProduct(restProduct, id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('id', data.id)
        setValue('products', [
          ...getValues('products').map((item) => {
            if (item.id === Number(data.id)) return data
            return item
          }),
        ])
        onCleanFields()
        notification({ type: 'success', message: 'Producto editado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )
  const { isLoading: loadingDeleteProduct, mutate: deleteProductMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id } = getValues()
      return await deleteProduct(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('products', [...getValues('products').filter((item) => item.id !== Number(data))])
        onCleanFields()
        notification({ type: 'success', message: 'Producto eliminado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onCleanFields = () => {
    setValue('id', 0)
    setValue('code', '')
    setValue('name', '')
    setValue('state', '')
  }

  const onAddProduct = () => {
    handleSubmit(() => {
      createProductMutate()
    })()
  }
  const onEditProduct = () => {
    handleSubmit(() => {
      editProductMutate()
    })()
  }
  const onDeleteProduct = () => {
    handleSubmit(() => {
      deleteProductMutate()
    })()
  }
  return (
    <Container width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-add-fill"
        disabled={watch('id') !== 0}
        onClick={onAddProduct}
        loading={loadingCreateProduct}
        permission="P02-02-06-01"
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-edit-2-line"
        disabled={watch('id') === 0}
        onClick={onEditProduct}
        loading={loadingEditProduct}
        permission="P02-02-06-02"
      />
      <Button
        width="100px"
        shape="round"
        disabled={watch('id') === 0}
        display="danger"
        trailingIcon="ri-delete-bin-line"
        onClick={onDeleteProduct}
        loading={loadingDeleteProduct}
        permission="P02-02-06-03"
      />
      <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onCleanFields} />
    </Container>
  )
}

export default ModalProductsActions
