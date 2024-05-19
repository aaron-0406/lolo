import { css } from 'styled-components'

import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import Input from '@/ui/inputs/Input'
import Label from '@/ui/Label'
import Switch from '@/ui/Switch'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

type ScheduledNotificationFormProps = {
  modalActions: "edit" | "add"
}

const ScheduledNotificationForm = ({ modalActions }: ScheduledNotificationFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const  formatDateToTimeString = (dateString: string) => { 
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <StyledContainer display="flex" flexDirection="column" gap="20px" width={modalActions === 'add' ? '100%' : '40%'}>
      <Controller
        name="scheduledNotification.nameNotification"
        control={control}
        render={({ field }) => (
          <Container>
            <TextField
              width="100%"
              label="Nombre de la notificación"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.nameNotification}
            />
          </Container>
        )}
      />

      <Controller
        name="scheduledNotification.descriptionNotification"
        control={control}
        render={({ field }) => (
          <Container>
            <TextField
              width="100%"
              label="Descripción"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.descriptionNotification}
            />
          </Container>
        )}
      />

      <Controller
        name="scheduledNotification.frequencyToNotify"
        control={control}
        render={({ field }) => (
          <Container>
            <TextField
              width="100%"
              label="Frecuencia"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.frequencyToNotify}
            />
          </Container>
        )}
      />

      <Controller
        name="scheduledNotification.hourTimeToNotify"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="column" gap="10px">
            <Label label="Hora" />
            <Input className="input-time" type="time" value={field.value} placeholder={ formatDateToTimeString(field.value) } onChange={field.onChange} />
          </Container>
        )}
      />

      <Controller
        name="scheduledNotification.logicKey"
        control={control}
        render={({ field }) => (
          <Container>
            <TextField
              width="100%"
              label="Clave lógica"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.logicKey}
            />
          </Container>
        )}
      />

      <Controller
        name="scheduledNotification.state"
        control={control}
        render={({ field }) => (
          <Container display="flex" flexDirection="column" gap="10px">
            <Label label="Estado de la notificación" />
            <Switch checked={!!field.value} onChange={field.onChange} />
          </Container>
        )}
      />
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    .input-time {
      box-sizing: border-box;
      width: 100%;
      height: 44px;
      gap: 10px;
      padding: 8px 16px 8px 16px;
      border-radius: 8px;
      border: 2px solid ${theme.colors.Neutral4};
    }
  `}
`

export default ScheduledNotificationForm