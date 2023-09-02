import styled, { css } from 'styled-components'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { notification } from '@/ui/notification/notification'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useFormContext } from 'react-hook-form'
import { FileCaseType } from '@/types/judicial/case-file.type'
import { useMutation } from 'react-query'
import { createFileCase, deleteFileCase, updateFileCase } from '@/services/judicial/file-case.service'

const FileCaseActions = () => {
  const {
    client: { customer },
  } = useLoloContext()

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const { setValue, reset, handleSubmit, getValues } = useFormContext<FileCaseType>()

  const onClean = () => {
    reset()
    // setValue('salePerimeter', '')
    // setValue('phone', '')
    // setValue('email', '')
  }
  const { isLoading: loadingCreateFileCase, mutate: createFileCaseMutate } = useMutation<any, Error>(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await createFileCase(restFileCase, Number(customer.id))
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        notification({ type: 'success', message: 'Expediente creado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingUpdateFileCase, mutate: updateFileCaseMutate } = useMutation<any, Error>(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await updateFileCase(id, restFileCase)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Expediente actualizado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingDeleteFileCase, mutate: deleteFileCaseMutate } = useMutation<any, Error>(
    async () => {
      const { id } = getValues()
      return await deleteFileCase(id)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Expediente eliminado' })
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
  const onAddFileCase = () => {
    handleSubmit(() => {
      createFileCaseMutate()
    })()
  }

  const onUpdateFileCase = () => {
    handleSubmit(() => {
      updateFileCaseMutate()
    })()
  }

  const onDeleteFileCase = () => {
    handleSubmit(() => {
      deleteFileCaseMutate()
    })()
  }

  return (
    <StyledContainer width="100%" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="125px"
        label={greaterThanDesktopS && 'Agregar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        trailingIcon="ri-add-fill"
        onClick={onAddFileCase}
        loading={loadingCreateFileCase}
      />
      <Button
        width="140px"
        label={greaterThanDesktopS && 'Modificar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        trailingIcon="ri-edit-2-line"
        onClick={onUpdateFileCase}
        loading={loadingUpdateFileCase}
        disabled={!getValues('id')}
      />
      <Button
        width="125px"
        label={greaterThanDesktopS && 'Eliminar'}
        shape={greaterThanDesktopS ? 'default' : 'round'}
        display="danger"
        trailingIcon="ri-close-line"
        onClick={onDeleteFileCase}
        loading={loadingDeleteFileCase}
        disabled={!getValues('id')}
      />
      <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onClean} />
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
