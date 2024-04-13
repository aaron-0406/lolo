import { useMutation, useQueryClient } from 'react-query'
import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { AxiosError, AxiosResponse } from 'axios'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createFileCase, updateFileCase } from '@/services/judicial/judicial-file-case.service'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { notification } from '@/ui/notification/notification'
import judicialFileCaseCache, {
  JudicialFileCaseTableRow,
} from '../../JudicialFileCasesList/JudicialFileCasesTable/utils/file-cases.cache'

const FileCaseActions = () => {
  const queryClient = useQueryClient()
  const {
    actions: { createFileCaseCache, editFileCaseCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseCache(queryClient)

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const {
    reset,
    getValues,
    formState: { isValid },
    watch,
  } = useFormContext<JudicialCaseFileType>()

  const { isLoading: loadingCreateFileCase, mutate: createFileCaseMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await createFileCase(restFileCase)
    },
    {
      onSuccess: (result) => {
        createFileCaseCache(result.data)
        reset()
        notification({ type: 'success', message: 'Expediente creado' })
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: updateFileCaseMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, clientId, ...restFileCase } = getValues()
      return await updateFileCase(id, restFileCase)
    },
    {
      onSuccess: (result) => {
        editFileCaseCache(result.data)
        notification({ type: 'success', message: 'Expediente actualizado' })
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onCreate = () => {
    createFileCaseMutate()
  }
  const onUpdate = () => {
    updateFileCaseMutate()
  }

  return (
    <StyledContainer width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="130px"
        label={greaterThanDesktopS && 'Guardar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        trailingIcon="ri-save-3-line"
        onClick={watch().id !== 0 ? onUpdate : onCreate}
        disabled={!isValid}
        loading={loadingCreateFileCase}
        permission="P13-02"
      />
    </StyledContainer>
  )
}

export default FileCaseActions

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
