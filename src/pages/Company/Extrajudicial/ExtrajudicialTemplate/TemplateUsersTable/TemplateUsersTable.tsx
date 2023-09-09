/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getAllClientsByCHBDetails } from '@/services/extrajudicial/client.service'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import { TemplateFormType } from '../hookforms.interfaces'
import TemplateUserRow from './TemplateUserRow'
import { CustomErrorResponse } from 'types/customErrorResponse'

const TemplateUsersTable = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext()
  const { setValue, watch } = useFormContext<TemplateFormType>()

  const { mutate: getClients } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await getAllClientsByCHBDetails(selectedBank.idCHB)
    },
    {
      onSuccess: ({ data }) => {
        setValue('clients', data)
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
  useEffect(() => {
    getClients()
    return () => {}
  }, [])

  return (
    <StyledContainer overFlowY="auto" width="100%" height="49.8%">
      {watch('clients').map((client) => {
        return <TemplateUserRow client={client} key={client.id + 'userTableTemplate'} />
      })}
    </StyledContainer>
  )
}

export default TemplateUsersTable

const StyledContainer = styled(Container)`
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.Neutral5};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.Neutral4};
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar {
        width: 10px;
        background-color: transparent;
      }
    `}
`
