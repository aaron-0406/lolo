import { useMutation } from 'react-query'
import { useFormContext, Controller } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { AxiosError } from 'axios'
import Button from '@/ui/Button/Button'
import Modal from '@/ui/Modal/Modal'
import Container from '@/ui/Container/Container'
import { GoalFormType } from '../hookform.type'
import { GoalApiResponse, createGoalService, editGoalService } from '@/services/extrajudicial/goal.service'
import { notification } from '@/ui/notification/notification'
import TextField from '@/ui/fields/TextField/TextField'
import DatePicker from '@/ui/DatePicker/DatePicker'
import { CustomErrorResponse } from 'types/customErrorResponse'

type PModalAddGoal = {
  visible: boolean
  onClose: () => void
}

const MetasModal = ({ visible, onClose }: PModalAddGoal) => {
  const {
    watch,
    setValue,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useFormContext<GoalFormType>()

  const { isLoading: loadingCreateGoal, mutate: onCreateGoal } = useMutation<
    GoalApiResponse,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {
        goal: { id, createdAt, customerId, endDate, ...rest },
      } = watch()
      return await createGoalService(rest)
    },
    {
      onSuccess: (data) => {
        setValue('goals', [data.data, ...watch('goals')])
        notification({ type: 'success', message: 'Meta creada' })
        onClose()
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

  const { isLoading: loadingEditGoal, mutate: onEditGoal } = useMutation<
    GoalApiResponse,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const {
        goal: { id, createdAt, customerId, endDate, total, totalMeta, ...rest },
      } = watch()
      return await editGoalService(rest, id)
    },
    {
      onSuccess: ({ data }) => {
        setValue(
          'goals',
          watch('goals').map((goal) => {
            if (goal.id === data.id) return data
            return goal
          })
        )
        notification({ type: 'success', message: 'Meta editada' })
        onClose()
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

  const handleClickCloseModal = () => {
    resetField('goal')
    onClose()
  }

  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-goal-create-edit"
      title={watch('goal.id') !== 0 ? 'Editar Meta' : 'Agregar Meta'}
      contentOverflowY="auto"
      size="small"
      footer={
        <StyledContainerButton
          width="100%"
          height="75px"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap="20px"
        >
          <Button
            width="125px"
            label={watch('goal.id') !== 0 ? 'Editar' : 'Agregar'}
            shape="default"
            trailingIcon="ri-add-fill"
            onClick={() => {
              handleSubmit(() => {
                watch('goal.id') !== 0 ? onEditGoal() : onCreateGoal()
              })()
            }}
            loading={loadingCreateGoal || loadingEditGoal}
          />
        </StyledContainerButton>
      }
    >
      <Container
        width="100%"
        height="100%"
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
        padding="20px"
        minHeight="300px"
      >
        <Container width="100%" display="flex" flexDirection="column" gap="15px">
          <Controller
            name="goal.name"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Nombre:"
                required
                value={field.value}
                helperText={errors.goal?.name?.message ? errors.goal?.name.message : ''}
                hasError={!!errors.goal?.name}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="goal.startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                required
                label="Fecha de Inicio:"
                selectedDate={field.value}
                placeholder="Ingrese la fecha"
                dateFormat="DD-MM-YYYY"
                value={field.value}
                getDate={(e) => {
                  setValue('goal.startDate', e)
                }}
              />
            )}
          />

          <Controller
            name="goal.week"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                label="Cantidad de Semanas:"
                required
                value={field.value}
                helperText={errors.goal?.week?.message ? errors.goal?.week.message : ''}
                hasError={!!errors.goal?.week}
                onChange={(data) => {
                  if (parseInt(data.target.value) % 1 === 0) {
                    field.onChange(parseInt(data.target.value))
                  } else if (data.target.value === '') {
                    field.onChange(0)
                  }
                }}
              />
            )}
          />
        </Container>
      </Container>
    </Modal>
  )
}

export default MetasModal

const StyledContainerButton = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletL} {
      gap: 10px;
    }
    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`
