import styled, { css } from 'styled-components'
import Button from '../../../../ui/Button/Button'
import { useFormContext, Controller } from 'react-hook-form'
import Modal from '../../../../ui/Modal/Modal'
import Container from '../../../../ui/Container/Container'
import Label from '../../../../ui/Label/Label'
import { GoalFormType } from '../hookform.type'
import { useMutation } from 'react-query'
import { GoalApiResponse, createGoalService, editGoalService } from '../../../../shared/services/goal.service'
import { notification } from '../../../../ui/notification/notification'
import React from 'react'

type PModalAddGoal = {
  visible: boolean
  onClose: () => void
  edits?: { edit: boolean; url: string }
}

const CompanyMetasModal = ({ visible, onClose }: PModalAddGoal) => {
  const { watch, setValue, resetField } = useFormContext<GoalFormType>()

  const { isLoading: loadingCreateGoal, mutate: onCreateGoal } = useMutation<GoalApiResponse, Error>(
    async () => {
      const {
        goal: { id, ...rest },
      } = watch()
      return await createGoalService(rest)
    },
    {
      onSuccess: (data) => {
        setValue('goal', data.data)
        notification({ type: 'success', message: 'Meta creada' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingEditGoal, mutate: onEditGoal } = useMutation<any, Error>(
    async () => {
      const {
        goal: { id, ...rest },
      } = watch()
      return await editGoalService(rest, id)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Meta editada' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleClickCloseModal = () => {
    resetField('goal')
    onClose()
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Modal
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-files"
      title={watch('goal.id') !== 0 ? 'Editar Meta' : 'Agregar Meta'}
      contentOverflowY="auto"
    >
      <Container
        width="100%"
        height="410px"
        display="flex"
        justify-content="center"
        flexDirection="column"
        align-items="center"
        gap="20px"
      >
        <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
          {/* <AddGoalInfo /> */}
        </Container>
        <StyledContainerButton
          width="100%"
          height="75px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <form onSubmit={handleFormSubmit}>
            <Button
              width="125px"
              type="submit"
              label={watch('goal.id') !== 0 ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={() => {
                watch('goal.id') !== 0 ? onEditGoal() : onCreateGoal()
              }}
              loading={loadingCreateGoal || loadingEditGoal}
              // disabled={!isValid}
            />
          </form>
        </StyledContainerButton>
      </Container>
    </Modal>
  )
}

export default CompanyMetasModal

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
