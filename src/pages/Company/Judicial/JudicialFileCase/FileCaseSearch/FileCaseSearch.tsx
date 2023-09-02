import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useQuery } from 'react-query'
import { notification } from '@/ui/notification/notification'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import { getFileCaseByNumberFile } from '@/services/judicial/file-case.service'
import { FileCaseType } from '@/types/judicial/case-file.type'

type FileCaseSearchProps = {
  setLoadingGlobal: (state: boolean) => void
}
const FileCaseSearch = ({ setLoadingGlobal }: FileCaseSearchProps) => {
  const [params] = useSearchParams()
  const codeParams = params.get('numberCase') ?? ''
  const [numberCase, setNumberCase] = useState<string>(codeParams)

  const { setValue, reset } = useFormContext<FileCaseType>()

  const { refetch } = useQuery(
    'query-file-case-by-case-number',
    async () => {
      return await getFileCaseByNumberFile(numberCase)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        // setValue('id', data.data.id)
        // setValue('code', data.data.code)
        // setValue('negotiationId', data.data.negotiationId)
        // setValue('dniOrRuc', data.data.dniOrRuc ?? '')
        // setValue('name', data.data.name)
        // setValue('salePerimeter', data.data.salePerimeter ?? '')
        // setValue('phone', data.data.phone ?? '')
        // setValue('email', data.data.email ?? '')
        // setValue('createdAt', data.data.createdAt)
        // setValue('cityId', data.data.cityId)
        // setValue('funcionarioId', data.data.funcionarioId)
        // setValue('customerUserId', data.data.customerUserId)
        // setValue('customerHasBankId', data.data.customerHasBankId)

        setLoadingGlobal(false)

        notification({ type: 'success', message: 'Cliente encontrado' })
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
        // setValue('salePerimeter', '')
        // setValue('phone', '')
        // setValue('email', '')

        setLoadingGlobal(false)
      },
    }
  )
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoadingGlobal(true)
      refetch()
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCode(e.target.value)
  }

  const onClickTrailing = () => {
    setLoadingGlobal(true)
    refetch()
  }

  useEffect(() => {
    if (!!codeParams.length) {
      setLoadingGlobal(true)
      refetch()
    }
    // eslint-disable-next-line
  }, [])
  return (
    <StyledContainer display="flex" flexDirection="column" width="100%" gap="15px" justifyContent="center">
      <Container display="flex" gap="15px">
        <Label label="Buscar:" />
        <TextField
          width="100%"
          placeholder="Nº Expediente"
          trailingIcon="ri-search-line"
          defaultValue={numberCase}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onClickTrailing={onClickTrailing}
        />
      </Container>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      width: 50%;
    }
  `}
`

export default FileCaseSearch
