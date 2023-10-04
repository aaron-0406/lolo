import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import { getFileCaseByNumberFile } from '@/services/judicial/file-case.service'
import { FileCaseType } from '@/types/judicial/case-file.type'
import { notification } from '@/ui/notification/notification'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'
import Label from '@/ui/Label'

type FileCaseSearchProps = {
  setLoadingGlobal: (state: boolean) => void
}
const FileCaseSearch = ({ setLoadingGlobal }: FileCaseSearchProps) => {
  const [params] = useSearchParams()
  const codeParams = params.get('numberCase') ?? ''
  const [filter, setFilter] = useState<string>('')

  const { setValue, reset } = useFormContext<FileCaseType>()

  const { refetch } = useQuery(
    'query-file-case-by-case-number',
    async () => {
      return await getFileCaseByNumberFile(filter)
    },
    {
      onSuccess: ({ data }) => {
        setLoadingGlobal(false)
        notification({ type: 'success', message: 'expediente encontrado' })
        setValue('id', data.id)
        setValue('clientId', data.clientId)
        setValue('customerUserId', data.customerUserId)
        setValue('createdAt', data.createdAt)
        setValue('numberCaseFile', data.numberCaseFile)
        setValue('judgmentNumber', data.judgmentNumber)
        setValue('secretary', data.secretary)
        setValue('amountDemandedDollars', data.amountDemandedSoles)
        setValue('amountDemandedSoles', data.amountDemandedDollars)
        setValue('cautionaryCode', data.cautionaryCode)
        setValue('errandCode', data.errandCode)
        setValue('judicialVenue', data.judicialVenue)
        setValue('judge', data.judge)
        setValue('demandDate', data.demandDate)
        setValue('judicialCourtId', data.judicialCourtId)
        setValue('judicialSubjectId', data.judicialSubjectId)
        setValue('judicialProceduralWayId', data.judicialProceduralWayId)
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
        reset()
        setLoadingGlobal(false)
      },
      enabled: false,
    }
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoadingGlobal(true)
      refetch()
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
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
          defaultValue={filter}
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
