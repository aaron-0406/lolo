import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { createDirection, deleteDirection, editDirection } from '@/services/extrajudicial/direction.service'
import { CustomErrorResponse } from 'types/customErrorResponse'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import { DirectionFormType } from '../hookforms.interfaces'

const ModalAddressesActions = () => {
  const { setValue, getValues, handleSubmit, watch } = useFormContext<DirectionFormType>()
  const { isLoading: loadingCreateDirection, mutate: createDirectionMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, directions, ...restClient } = getValues()
      return await createDirection(restClient)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('directions', [...getValues('directions'), data.data])
        onCleanFields()
        notification({ type: 'success', message: 'Dirección creada' })
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

  const { isLoading: loadingEditDirection, mutate: editDirectionMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, directions, clientId, ...restClient } = getValues()
      return await editDirection(restClient, id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('id', data.id)
        setValue('directions', [
          ...getValues('directions').map((item) => {
            if (item.id === Number(data.id)) return data
            return item
          }),
        ])
        onCleanFields()
        notification({ type: 'success', message: 'Dirección editada' })
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
  const { isLoading: loadingDeleteDirection, mutate: deleteDirectionMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id } = getValues()
      return await deleteDirection(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('directions', [...getValues('directions').filter((item) => item.id !== Number(data.id))])
        onCleanFields()
        notification({ type: 'success', message: 'Dirección eliminada' })
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
    setValue('direction', '')
    setValue('type', '')
    setValue('createdAt', undefined)
  }

  const onAddDirection = () => {
    handleSubmit(() => {
      createDirectionMutate()
    })()
  }
  const onEditDirection = () => {
    handleSubmit(() => {
      editDirectionMutate()
    })()
  }
  const onDeleteDirection = () => {
    handleSubmit(() => {
      deleteDirectionMutate()
    })()
  }
  return (
    <Container width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-add-fill"
        disabled={watch('id') !== 0}
        onClick={onAddDirection}
        loading={loadingCreateDirection}
        permission="P03-08-01"
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-edit-2-line"
        disabled={watch('id') === 0}
        onClick={onEditDirection}
        loading={loadingEditDirection}
        permission="P03-08-02"
      />
      <Button
        width="100px"
        shape="round"
        disabled={watch('id') === 0}
        display="danger"
        trailingIcon="ri-delete-bin-line"
        onClick={onDeleteDirection}
        loading={loadingDeleteDirection}
        permission="P03-08-03"
      />
      <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onCleanFields} />
    </Container>
  )
}

export default ModalAddressesActions
