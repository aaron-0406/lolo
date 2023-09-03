import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { AxiosError } from 'axios'
import { getEcampoByTemplateId } from '@/services/extrajudicial/ecampo.service'
import { getTemplateJson, getTemplatesById } from '@/services/extrajudicial/template.service'
import { getValuesByTemplateHasValuesIdService } from '@/services/extrajudicial/values.service'
import { TemplateHasValuesType } from '@/types/extrajudicial/template-has-values.type'
import { DOMAIN } from '../../../../../../shared/utils/constant/api'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'
import { TemplateFormType } from '../../hookforms.interfaces'
import { CustomErrorResponse } from 'types/customErrorResponse'

type TableHasValueRoProps = {
  templateHasValues: TemplateHasValuesType
  selected: boolean
}

const TableHasValueRow: React.FC<TableHasValueRoProps> = (props) => {
  const {
    templateHasValues: { name, id },
    selected,
    templateHasValues,
  } = props
  const { setValue, watch } = useFormContext<TemplateFormType>()

  const { mutate: getEcampos } = useMutation<any, Error>(
    async () => {
      return await getEcampoByTemplateId(templateHasValues.templateId)
    },
    {
      onSuccess: ({ data }) => {
        setValue('fields', data)
      },
    }
  )

  const { mutate: getValuesByTemplatesHasValuesId } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await getValuesByTemplateHasValuesIdService(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('values', data)
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
        })
      },
    }
  )

  // OBTENER PLANTILLA
  const { mutate: getPlantilla } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await getTemplatesById(templateHasValues.templateId)
    },
    {
      onSuccess: async ({ data }) => {
        try {
          if (data.templateJson === '') {
            setValue('templateJson', { parrafos: [] })
          } else {
            const templateJson = await getTemplateJson(data.templateJson)
            setValue('templateJson', templateJson.data)
          }
          if (data.templatePhoto === '') {
            setValue('templatePhoto', '')
          } else {
            setValue('templatePhoto', `${DOMAIN}/download/${data.templatePhoto}`)
          }
        } catch (error) {
          setValue('templateJson', { parrafos: [] })
          setValue('templatePhoto', '')
        }
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors.map((error) => error.message),
        })
      },
    }
  )

  const handleClickTemplate = () => {
    getPlantilla()
    setValue('templateHasValuesSelected', templateHasValues)
    setValue('templateSelected', watch('templates').filter((item) => item.id === templateHasValues.templateId)[0])
    getEcampos()
    getValuesByTemplatesHasValuesId()
  }

  return (
    <StyledContainer
      $selected={selected}
      onClick={handleClickTemplate}
      width="100%"
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      gap="5px"
      padding="2px 0"
      alignItems="center"
      backgroundColor="#fff"
    >
      <Icon remixClass="ri-file-text-line"></Icon>
      <Text.Body size="s" weight="regular">
        {name}
      </Text.Body>
    </StyledContainer>
  )
}

export default TableHasValueRow

const StyledContainer = styled(Container)<{ $selected: boolean }>`
  ${({ theme, $selected }) => css`
    border-bottom: 2px solid ${theme.colors.Neutral4};
    background-color: ${$selected ? '#eff0f6ff' : ''};
  `}
  transition: all 400ms;
  cursor: pointer;
  :hover {
    background-color: #eff0f6ff;
  }
`
