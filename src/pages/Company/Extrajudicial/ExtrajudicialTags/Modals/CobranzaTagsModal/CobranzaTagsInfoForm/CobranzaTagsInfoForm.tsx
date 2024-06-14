import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'
import Container from '@/ui/Container'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'

type CobranzaTagsInforFormProps = {
  tagGroups: ExtTagType[]
}

const CobranzaTagsInfoForm = ({ tagGroups }: CobranzaTagsInforFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ExtTagType>()

  const optionsTagGroup: Array<SelectItemType> = tagGroups.map((group) => {
    return {
      key: String(group.id),
      label: group.name,
    }
  })

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            label="Nombre:"
            value={field.value}
            hasError={!!errors.name}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
          />
        )}
      />

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <StyleContainer>
            <Container width="100%" position='absolute'>
              <label
                htmlFor="color"
                className='label__text-field'
              />
              <TextField width="100%" label="Color:" value={field.value} hasError={!!errors.color} />
              <Container className='color__sample' style={{ backgroundColor: field.value }} />
            </Container>
            <Container className="color__field">
              <TextField
                id="color"
                type="color"
                width="100%"
                height="100%"
                hasError={!!errors.color}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
              />
            </Container>
          </StyleContainer>
        )}
      />

      <Controller
        name="tagGroupId"
        control={control}
        render={({ field }) => (
          <Select
            width="100%"
            label="Grupo de etiquetas:"
            value={!!field.value ? String(field.value) : ''}
            options={optionsTagGroup}
            onChange={(key) => {
              field.onChange(parseInt(key))
            }}
            hasError={!!errors.tagGroupId}
          />
        )}
      />
    </>
  )
}

export default CobranzaTagsInfoForm

const StyleContainer = styled(Container)`
  ${({ theme, width }) => css`
    height: 75px;
    position: relative;
    z-index: 1;
     .label__text-field {
      position: absolute;
      top: -5px;
      width: 100%;
      height: 100%;
      left: 0;
      opacity: 0;
    }
    .color__sample{
      position: absolute;
      right: 0px;
      top: 2px;
      bottom: 0;
      border-radius: 100%;
      width: 20px;
      height: 20px;
    }
    .color__field {
      position: absolute;
      top: 50px;
      left: -15px;
      opacity: 0;
      pointerevents: none;
    }
  `}
`
