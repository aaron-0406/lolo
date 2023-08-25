import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import styled, { css } from 'styled-components'
import { getGuarantorsByClientID } from '@/services/extrajudicial/guarantor.service'
import { GuarantorType } from '@/types/extrajudicial/guarantor.type'
import Container from '@/ui/Container'
import { GuarantorFormType } from '../hookforms.interfaces'
import ModalFiadoresRow from './ModalFiadoresRow'

const ModalFiadoresTable = () => {
  const { getValues, setValue, watch } = useFormContext<GuarantorFormType>()

  const [isLoading, setIsLoading] = useState(false)

  const clientId = getValues('clientId')
  const fiadores = watch('guarantors')

  const { refetch } = useQuery(
    'query-get-guarantors-by-client-id',
    async () => {
      return await getGuarantorsByClientID(clientId)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('guarantors', data.data)
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
      },
    }
  )

  useEffect(() => {
    setIsLoading(true)
    refetch()

    // eslint-disable-next-line
  }, [])

  if (isLoading) return <div>Loading</div>

  return (
    <StyledContainer width="100%" minHeight="100px" maxHeight="300px" overFlowY="auto">
      <div>
        {fiadores.map((guarantor: GuarantorType, index: number) => {
          return (
            <ModalFiadoresRow
              key={index}
              id={index + 1}
              guarantorId={guarantor.id}
              selected={guarantor.id === watch('id')}
              email={guarantor.email}
              phone={guarantor.phone}
              name={guarantor.name}
            />
          )
        })}
      </div>
    </StyledContainer>
  )
}

export default ModalFiadoresTable

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 2px solid ${theme.colors.Neutral4};
  `}
`
