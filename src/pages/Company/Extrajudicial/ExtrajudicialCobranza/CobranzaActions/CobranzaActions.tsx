import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { device } from '../../../../../shared/breakpoints/reponsive'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { createClient, deleteClient, updateClient } from '../../../../../shared/services/extrajudicial/client.service'
import { ClientType } from '../../../../../shared/types/extrajudicial/client.type'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import notification from '../../../../../ui/notification'
import { generateDocumentService } from '../../../../../shared/services/extrajudicial/document.service'
import { DOMAIN } from '../../../../../shared/utils/constant/api'

const CobranzaActions = () => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const { setValue, reset, handleSubmit, getValues } = useFormContext<ClientType>()

  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const { isLoading: loadingCreateClient, mutate: createCustomer } = useMutation<any, Error>(
    async () => {
      const { id, ...restClient } = getValues()
      return await createClient(restClient, Number(customer.id))
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        notification({ type: 'success', message: 'Cliente creado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingUpdateClient, mutate: updateCustomer } = useMutation<any, Error>(
    async () => {
      const { id, code, customerHasBankId, ...restClient } = getValues()
      return await updateClient(code, customerHasBankId, restClient)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente actualizado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingDeleteClient, mutate: deleteCustomer } = useMutation<any, Error>(
    async () => {
      const { code, customerHasBankId } = getValues()
      return await deleteClient(code, customerHasBankId, Number(customer.id))
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente eliminado' })
        onClean()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { mutate: generateDocument } = useMutation<any, Error>(
    async () => {
      return await generateDocumentService(3, [getValues('id')])
    },
    {
      onSuccess: ({ data }) => {
        const anchor = document.createElement('a')
        anchor.href = `${DOMAIN}/download/${data.docName}`
        anchor.click()
        notification({
          type: 'success',
          message: 'Documento creado',
        })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const onClean = () => {
    reset()
    setValue('salePerimeter', '')
    setValue('phone', '')
    setValue('email', '')
  }

  const onAddClient = () => {
    setValue('customerHasBankId', parseInt(selectedBank.idCHB))

    handleSubmit(() => {
      createCustomer()
    })()
  }

  const onUpdateClient = () => {
    setValue('customerHasBankId', parseInt(selectedBank.idCHB))

    handleSubmit(() => {
      updateCustomer()
    })()
  }

  const onDeleteClient = () => {
    setValue('customerHasBankId', parseInt(selectedBank.idCHB))

    handleSubmit(() => {
      deleteCustomer()
    })()
  }

  const onGenerateWord = () => {
    generateDocument()
  }

  return (
    <StyledContainer width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="125px"
        label={greaterThanDesktopS && 'Agregar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        trailingIcon="ri-add-fill"
        onClick={onAddClient}
        loading={loadingCreateClient}
      />
      <Button
        width="140px"
        label={greaterThanDesktopS && 'Modificar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        trailingIcon="ri-edit-2-line"
        onClick={onUpdateClient}
        loading={loadingUpdateClient}
        disabled={!getValues('id')}
      />
      <Button
        width="125px"
        label={greaterThanDesktopS && 'Eliminar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        display="danger"
        trailingIcon="ri-close-line"
        onClick={onDeleteClient}
        loading={loadingDeleteClient}
        disabled={!getValues('id')}
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-file-word-line"
        onClick={onGenerateWord}
        disabled={!getValues('id')}
      />
      <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onClean} />
    </StyledContainer>
  )
}

export default CobranzaActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.mobile} {
      gap: 5px;
    }

    @media ${theme.device.tabletS} {
      width: 50%;
    }

    @media ${theme.device.tabletL} {
      gap: 10px;
    }

    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`