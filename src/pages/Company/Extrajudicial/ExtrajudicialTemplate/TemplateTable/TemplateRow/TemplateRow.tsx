/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import { AxiosError } from 'axios'
import { getEcampoByTemplateId } from '@/services/extrajudicial/ecampo.service'
import { getTemplateJson, getTemplatesById } from '@/services/extrajudicial/template.service'
import { ECampoType } from '@/types/extrajudicial/ecampo.type'
import { TemplateType } from '@/types/extrajudicial/template.type'
import { DOMAIN } from '../../../../../../shared/utils/constant/api'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'
import notification from '@/ui/notification'
import { TemplateFormType } from '../../hookforms.interfaces'
import TemplateHasValuesTable from '../../TemplateHasValuesTable'
import { CustomErrorResponse } from 'types/customErrorResponse'

type TemplateRowProps = {
  template: TemplateType
  selected?: boolean
}

const TemplateRow: React.FC<TemplateRowProps> = (props) => {
  const {
    template: { id, name },
    template,
    selected = false,
  } = props
  const { setValue } = useFormContext<TemplateFormType>()

  // OBTENER CAMPOS
  const { mutate: getEcampos } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await getEcampoByTemplateId(id)
    },
    {
      onSuccess: ({ data }) => {
        setValue('fields', data)
        setValue(
          'values',
          data.map((item: ECampoType) => {
            return {
              id: 0,
              field: item.field,
              templateHasValuesId: 0,
              createdAt: new Date(),
              ecampoId: item.id,
              value: '',
            }
          })
        )
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )
  // OBTENER PLANTILLA
  const { mutate: getPlantilla } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await getTemplatesById(id)
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
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const handleClickTemplate = () => {
    getEcampos()
    getPlantilla()
    setValue('templateSelected', template)
    setValue('templateHasValuesSelected', {
      id: 0,
      createdAt: new Date(),
      name: '',
      templateId: id,
    })
  }

  return (
    <>
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
      <Container width="100%" padding="0 0 0 2rem">
        <TemplateHasValuesTable templateId={id} />
      </Container>
    </>
  )
}

export default TemplateRow

const StyledContainer = styled(Container)<{ $selected: boolean }>`
  transition: all 400ms;
  ${({ theme, $selected }) => css`
    border-bottom: 2px solid ${theme.colors.Neutral4};
    background-color: ${$selected ? '#eff0f6ff' : ''};
  `}
  cursor: pointer;
  :hover {
    background-color: #eff0f6ff;
  }
`
