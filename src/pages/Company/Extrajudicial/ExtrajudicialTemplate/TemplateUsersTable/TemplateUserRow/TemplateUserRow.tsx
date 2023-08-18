import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Checkbox from '../../../../../../ui/Checkbox'
import Container from '../../../../../../ui/Container'
import Text from '../../../../../../ui/Text'
import { ClientTypeForm, TemplateFormType } from '../../hookforms.interfaces'

type TemplateUserRowProps = {
  client: ClientTypeForm
}

const TemplateUserRow: React.FC<TemplateUserRowProps> = (props) => {
  const { setValue, watch } = useFormContext<TemplateFormType>()

  const { client } = props
  return (
    <StyledContainer
      justifyContent="space-between"
      padding="10px 20px"
      backgroundColor="#fff"
      display="flex"
      flexDirection="row"
    >
      <Text.Body size="m" weight="regular">
        {client.name} - {client.code}
      </Text.Body>
      <Checkbox
        checked={!!client.state}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(
            'clients',
            watch('clients').map((item) => {
              if (item.id === client.id) return { ...client, state: e.target.checked }
              return item
            })
          )
          setValue(
            'clientSelected',
            watch('clients').filter((item) => item.state === true)[0]
              ? watch('clients').filter((item) => item.state === true)[0]
              : ({} as ClientTypeForm)
          )
        }}
      ></Checkbox>
    </StyledContainer>
  )
}

export default TemplateUserRow

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    transition: all 500ms;
    :hover {
      background-color: ${theme.colors.Neutral3};
    }
  `}
`
