import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import styled, { css } from 'styled-components'
import { getDirectionsByClientID } from '@/services/extrajudicial/direction.service'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import Container from '@/ui/Container'
import { DirectionFormType } from '../hookforms.interfaces'
import ModalAddressesRow from './ModalAddressesRow'

const ModalAddressesTable = () => {
  const { getValues, setValue, watch } = useFormContext<DirectionFormType>()
  const [isLoading, setIsLoading] = useState(false)

  const clientId = getValues('clientId')
  const direcciones = watch('directions')
  const { refetch } = useQuery(
    'query-get-directions-by-client-id',
    async () => {
      return await getDirectionsByClientID(clientId)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('directions', data.data)
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
        {direcciones.map((direction: DirectionType, index: number) => {
          return (
            <ModalAddressesRow
              addressTypeId={direction.addressTypeId}
              key={index}
              id={index + 1}
              addressId={direction.id}
              selected={direction.id === watch('id')}
              direction={direction.direction}
            />
          )
        })}
      </div>
    </StyledContainer>
  )
}

export default ModalAddressesTable

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 2px solid ${theme.colors.Neutral4};
  `}
`
