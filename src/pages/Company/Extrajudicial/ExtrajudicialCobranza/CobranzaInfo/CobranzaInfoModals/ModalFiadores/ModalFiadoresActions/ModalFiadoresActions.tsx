import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { createGuarantor, deleteGuarantor, editGuarantor } from '@/services/extrajudicial/guarantor.service'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import { GuarantorFormType } from '@/pages/extrajudicial/ExtrajudicialCobranza/CobranzaInfo/CobranzaInfoModals/ModalFiadores/hookforms.interfaces'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'

const ModalFiadoresActions = () => {
  const { setValue, getValues, handleSubmit, watch } = useFormContext<GuarantorFormType>()

  const { isLoading: loadingCreateGuarantor, mutate: createGuarantorMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, guarantors, ...restClient } = getValues()
      return await createGuarantor(restClient)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('guarantors', [...getValues('guarantors'), data.data])
        onCleanFields()
        notification({ type: 'success', message: 'Fiador creado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditGuarantor, mutate: editGuarantorMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, guarantors, clientId, ...restClient } = getValues()
      return await editGuarantor(restClient, id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('id', data.id)
        setValue('guarantors', [
          ...getValues('guarantors').map((item) => {
            if (item.id === Number(data.id)) return data
            return item
          }),
        ])
        onCleanFields()
        notification({ type: 'success', message: 'Fiador editado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
        })
      },
    }
  )
  const { isLoading: loadingDeleteGuarantor, mutate: deleteGuarantorMutate } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id } = getValues()
      return await deleteGuarantor(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('guarantors', [...getValues('guarantors').filter((item) => item.id !== Number(data.id))])
        onCleanFields()
        notification({ type: 'success', message: 'Fiador eliminado' })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
        })
      },
    }
  )

  const onCleanFields = () => {
    setValue('id', 0)
    setValue('name', '')
    setValue('phone', '')
    setValue('email', '')
    setValue('createdAt', undefined)
  }

  const onAddFiador = () => {
    handleSubmit(() => {
      createGuarantorMutate()
    })()
  }
  const onEditFiador = () => {
    handleSubmit(() => {
      editGuarantorMutate()
    })()
  }
  const onDeleteFiador = () => {
    handleSubmit(() => {
      deleteGuarantorMutate()
    })()
  }

  return (
    <Container width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-add-fill"
        disabled={watch('id') !== 0}
        onClick={onAddFiador}
        loading={loadingCreateGuarantor}
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-edit-2-line"
        disabled={watch('id') === 0}
        onClick={onEditFiador}
        loading={loadingEditGuarantor}
      />
      <Button
        width="100px"
        shape="round"
        disabled={watch('id') === 0}
        display="danger"
        trailingIcon="ri-close-line"
        onClick={onDeleteFiador}
        loading={loadingDeleteGuarantor}
      />
      <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onCleanFields} />
    </Container>
  )
}

export default ModalFiadoresActions
