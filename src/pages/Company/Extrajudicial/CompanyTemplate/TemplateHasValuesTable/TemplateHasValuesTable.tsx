import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Container from '../../../../../ui/Container'
import { TemplateFormType } from '../hookforms.interfaces'
import TemplateHasValueRow from './TemplateHasValueRow'

type TemplateHasValuesTableProps = {
  templateId: number
}

const TemplateHasValuesTable: React.FC<TemplateHasValuesTableProps> = ({ templateId }) => {
  const { watch } = useFormContext<TemplateFormType>()

  return (
    <StyledContainer width="100%" height="100%" backgroundColor="#eff0f6ff">
      {watch('templateHasValues')
        .filter((item) => item.templateId === templateId)
        .map((templateHasValues) => {
          return (
            <TemplateHasValueRow
              key={templateHasValues.id + templateHasValues.name}
              selected={templateHasValues.id === watch().templateHasValuesSelected.id}
              templateHasValues={templateHasValues}
            />
          )
        })}
    </StyledContainer>
  )
}

export default TemplateHasValuesTable

const StyledContainer = styled(Container)`
  ${({ theme }) =>
    css`
      border: 2px solid ${theme.colors.Neutral4};
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
