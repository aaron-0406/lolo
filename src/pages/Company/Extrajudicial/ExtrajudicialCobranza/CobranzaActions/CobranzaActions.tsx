import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { AxiosError } from 'axios'
import { generateDocumentService } from '@/services/extrajudicial/document.service'
import { getClientByCode } from '@/services/extrajudicial/client.service'
import { device } from '@/breakpoints/responsive'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createClient, updateClient } from '@/services/extrajudicial/client.service'
import { ClientType } from '@/types/extrajudicial/client.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import { DOMAIN } from '../../../../../shared/utils/constant/api'

type CobranzaActionsProps = {
  setLoadingGlobal: (state: boolean) => void
}

const CobranzaActions = ({ setLoadingGlobal }: CobranzaActionsProps) => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
  const { setValue, reset, handleSubmit, getValues } = useFormContext<ClientType>()

  const { refetch } = useQuery(
    'query-get-client-by-code',
    async () => {
      return await getClientByCode(codeParams, selectedBank.idCHB)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('code', data.data.code)
        setValue('negotiationId', data.data.negotiationId)
        setValue('dniOrRuc', data.data.dniOrRuc ?? '')
        setValue('name', data.data.name)
        setValue('salePerimeter', data.data.salePerimeter ?? '')
        setValue('phone', data.data.phone ?? '')
        setValue('email', data.data.email ?? '')
        setValue('createdAt', data.data.createdAt)
        setValue('cityId', data.data.cityId)
        setValue('funcionarioId', data.data.funcionarioId)
        setValue('customerUserId', data.data.customerUserId)
        setValue('customerHasBankId', data.data.customerHasBankId)

        setLoadingGlobal(false)

        notification({ type: 'success', message: 'Cliente encontrado' })
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
        setValue('salePerimeter', '')
        setValue('phone', '')
        setValue('email', '')

        setLoadingGlobal(false)
      },
    }
  )

  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const { isLoading: loadingCreateClient, mutate: createCustomer } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      const { id, ...restClient } = getValues()
      return await createClient(restClient, Number(customer.id))
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        notification({ type: 'success', message: 'Cliente creado' })
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

  const { isLoading: loadingUpdateClient, mutate: updateCustomer } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      const { id, code, customerHasBankId, ...restClient } = getValues()
      return await updateClient(code, customerHasBankId, restClient)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente actualizado' })
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

  const { mutate: generateDocument } = useMutation<any, AxiosError<CustomErrorResponse>>(
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
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
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

  const onGenerateWord = () => {
    generateDocument()
  }

  useEffect(() => {
    if (!!codeParams.length && codeParams !== '000000000') {
      setLoadingGlobal(true)
      refetch()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <StyledContainer width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="130px"
        label={greaterThanDesktopS && 'Guardar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        trailingIcon="ri--fill"
        onClick={onAddClient}
        loading={loadingCreateClient}
        permission="P02-03"
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-file-word-line"
        onClick={onGenerateWord}
        disabled={!getValues('id')}
        permission="P02-02-02"
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
      justify-content: end;
    }

    @media ${theme.device.tabletL} {
      gap: 10px;
    }

    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`
