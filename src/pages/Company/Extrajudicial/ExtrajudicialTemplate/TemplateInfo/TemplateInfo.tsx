import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import Label from '@/ui/Label'
import { TemplateFormType } from '../hookforms.interfaces'
import TemplateInfoField from './TemplateInfoField'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const TemplateInfo = () => {
  const { watch, setValue } = useFormContext<TemplateFormType>()

  const handleChangeTemplateName = (e: ChangeEvent) => {
    setValue('templateHasValuesSelected.name', e.target.value)
  }

  return (
    <StyledContainer
      maxHeight="calc(45% - 40px)"
      overFlowY="auto"
      width="100%"
      display="flex"
      flexDirection="column"
      gap="10px"
      padding="20px"
    >
      <Container>
        <Label label="Nombre de la Plantilla" name={'template_name'} />
        <TextField
          onChange={handleChangeTemplateName}
          width="100%"
          name={'template_name'}
          value={watch('templateHasValuesSelected.name')}
        />
      </Container>
      {watch('fields').map((item) => {
        return <TemplateInfoField key={item.field + item.id} ecampo={item} />
      })}
    </StyledContainer>
  )
}

export default TemplateInfo

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
