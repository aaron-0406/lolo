import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { generateDocumentService } from '@/services/extrajudicial/document.service'
import {
  createTemplateHasValuesService,
  deleteTemplateHasValuesService,
  updateTemplateHasValuesService,
} from '@/services/extrajudicial/template-has-values.service'
import { ECampoType } from '@/types/extrajudicial/ecampo.type'
import { DOMAIN } from '../../../../../shared/utils/constant/api'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import { TemplateFormType } from '../hookforms.interfaces'

const TemplateActions = () => {
  const { watch, setValue, getValues } = useFormContext<TemplateFormType>()

  const onCleanFields = () => {
    // Deselect template
    setValue('templateHasValuesSelected', {
      id: 0,
      name: '',
      createdAt: new Date(),
      templateId: watch('templateSelected.id'),
    })

    // Set Values field to default
    setValue(
      'values',
      watch('fields').map((item: ECampoType) => {
        return {
          id: 0,
          field: item.field,
          value: '',
          ecampoId: item.id,
          templateHasValuesId: 0,
          createdAt: new Date(),
        }
      })
    )
  }

  const { mutate: createTemplateHasValues } = useMutation<any, Error>(
    async () => {
      const {
        templateHasValuesSelected: { id, createdAt, ...rest },
        values,
      } = getValues()
      return await createTemplateHasValuesService(rest, values)
    },
    {
      onSuccess: ({ data }) => {
        // Set Template as selected
        setValue('templateHasValuesSelected', data.template_has_values)

        // Add template to list
        setValue('templateHasValues', [...watch('templateHasValues'), data.template_has_values])

        // Set Values
        setValue('values', data.values)
        notification({
          type: 'success',
          message: 'Plantilla Creada',
        })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )
  const { mutate: deleteTemplateHasValues } = useMutation<any, Error>(
    async () => {
      const {
        templateHasValuesSelected: { id },
      } = getValues()
      return await deleteTemplateHasValuesService(id)
    },
    {
      onSuccess: ({ data }) => {
        // Changing the list
        setValue(
          'templateHasValues',
          watch('templateHasValues').filter((item) => item.id !== Number(data.id))
        )

        // Reset the template
        setValue('templateHasValuesSelected', {
          createdAt: new Date(),
          id: 0,
          name: '',
          templateId: watch('templateSelected.id'),
        })

        // Reset the template values
        setValue(
          'values',
          watch('fields').map((item: ECampoType) => {
            return {
              id: 0,
              field: item.field,
              value: '',
              ecampoId: item.id,
              templateHasValuesId: 0,
              createdAt: new Date(),
            }
          })
        )
        notification({
          type: 'success',
          message: 'Plantilla eliminada',
        })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )
  const { mutate: updateTemplateHasValues } = useMutation<any, Error>(
    async () => {
      const {
        templateHasValuesSelected: { id },
      } = getValues()
      return await updateTemplateHasValuesService(id, {
        name: watch('templateHasValuesSelected.name'),
        values: watch('values'),
      })
    },
    {
      onSuccess: ({ data }) => {
        setValue(
          'templateHasValues',
          watch('templateHasValues').map((item) => {
            if (item.id === data.template_has_values.id) return data.template_has_values
            return item
          })
        )
        notification({
          type: 'success',
          message: 'Plantilla editada',
        })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )
  const { mutate: generateDocument } = useMutation<any, Error>(
    async () => {
      const {
        templateHasValuesSelected: { id },
        clients,
      } = getValues()
      return await generateDocumentService(
        id,
        clients.filter((item) => item.state === true).map((item) => item.id)
      )
    },
    {
      onSuccess: ({ data }) => {
        const anchor = document.createElement('a')
        anchor.href = `${DOMAIN}/download/${data.docName}`
        anchor.click()
        notification({
          type: 'success',
          message: 'Documento creado',
        })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )
  const onAddTemplateHasValues = () => {
    createTemplateHasValues()
  }

  const onUpdateTemplateHasValues = () => {
    updateTemplateHasValues()
  }

  const onDeleteTemplateHasValues = () => {
    deleteTemplateHasValues()
  }

  const onDownLoad = () => {
    generateDocument()
  }
  return (
    <StyledContainer
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      gap="20px"
      flexWrap="wrap"
      backgroundColor="#fff"
    >
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-add-fill"
        disabled={watch('templateHasValuesSelected.id') !== 0 || watch('templateSelected.id') === 0}
        onClick={onAddTemplateHasValues}
      />
      <Button
        width="100px"
        shape="round"
        trailingIcon="ri-edit-2-line"
        disabled={watch('templateHasValuesSelected.id') === 0}
        onClick={onUpdateTemplateHasValues}
      />
      <Button
        width="100px"
        shape="round"
        disabled={watch('templateHasValuesSelected.id') === 0}
        display="danger"
        trailingIcon="ri-close-line"
        onClick={onDeleteTemplateHasValues}
      />
      <Button width="100px" shape="round" display="warning" trailingIcon="ri-brush-2-line" onClick={onCleanFields} />
      <Button
        width="100px"
        shape="round"
        disabled={
          watch('clients').filter((item) => item.state === true).length === 0 ||
          watch('templateHasValuesSelected.id') === 0
        }
        display="default"
        trailingIcon="ri-download-cloud-line"
        onClick={onDownLoad}
      />
    </StyledContainer>
  )
}

export default TemplateActions

const StyledContainer = styled(Container)`
  border-radius: 10px;
`
