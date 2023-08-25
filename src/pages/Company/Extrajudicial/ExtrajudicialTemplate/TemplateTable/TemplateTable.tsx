/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getTemplatesHasValuesByCustomerId } from '@/services/extrajudicial/template-has-values.service'
import { getTemplatesByCustomerId } from '@/services/extrajudicial/template.service'
import Container from '@/ui/Container'
import { TemplateFormType } from '../hookforms.interfaces'
import TemplateRow from './TemplateRow'
// eff0f6ff
const TemplateTable = () => {
  const {
    client: {
      customer: { id },
    },
  } = useLoloContext()

  const { setValue, watch } = useFormContext<TemplateFormType>()

  // GET TEMPLATES
  const { mutate: getTemplatesQuery } = useMutation<any, Error>(
    async () => {
      return await getTemplatesByCustomerId(id)
    },
    {
      onSuccess: (response) => {
        setValue('templates', response.data)
      },
    }
  )

  // GET TEMPLATES HAS VALUES
  const { mutate: getTemplatesHasValuesQuery } = useMutation<any, Error>(
    async () => {
      return await getTemplatesHasValuesByCustomerId(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('templateHasValues', data)
      },
    }
  )

  const getTemplates = () => {
    getTemplatesQuery()
    getTemplatesHasValuesQuery()
  }

  useEffect(() => {
    getTemplates()
    return () => {}
  }, [])

  return (
    <StyledContainer overFlowY="auto" width="100%" height="100%" backgroundColor="#eff0f6ff">
      {watch('templates').map((template) => (
        <TemplateRow
          selected={template.id === watch().templateSelected.id}
          template={template}
          key={template.name + template.id}
        />
      ))}
    </StyledContainer>
  )
}

export default TemplateTable

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
