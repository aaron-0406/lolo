import { useMutation } from 'react-query'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { AxiosError } from 'axios'
import { useLoloContext } from '@/contexts/LoloProvider'
import Container from '@/ui/Container'
import ModalUserRow from './ModalUserRow'
import { UserFormType } from './hookforms.type'
import Button from '@/ui/Button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import notification from '@/ui/notification'
import { postDashboardSendXslx } from '@/services/extrajudicial/dashboard.service'
import { DashFormType } from '../../hookform.type'
import { CustomErrorResponse } from 'types/customErrorResponse'

const ModalUsers = () => {
  const {
    user: { users },
  } = useLoloContext()

  const { watch } = useFormContext<DashFormType>()

  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const formMethods = useForm<UserFormType>({
    defaultValues: {
      users: [],
    },
  })

  const onSendEmail = () => {
    formMethods.handleSubmit(() => {
      sendEmailXlsx()
    })()
  }

  const { isLoading, mutate: sendEmailXlsx } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await postDashboardSendXslx({
        usersId: formMethods.watch('users'),
        clientsAdded: watch('clientsAdded'),
        clientsDeleted: watch('clientsDeleted'),
        productsAdded: watch('productsAdded'),
        productsDeleted: watch('productsDeleted'),
        productsCastigo: watch('productsCastigo'),
      })
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Email enviado' })
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

  return (
    <FormProvider {...formMethods}>
      <Container width="100%">
        <Container
          width="100%"
          padding="20px"
          display="flex"
          flexDirection="column"
          gap="20px"
          height="80%"
          overFlowY="scroll"
        >
          {users.map((user) => {
            return <ModalUserRow key={user.customerId + user.dni} user={user} />
          })}
        </Container>
        <Container padding="20px" display="flex" alignItems="self-end" justifyContent="end">
          <Button
            onClick={onSendEmail}
            label={greaterThanDesktopS && 'Enviar Email'}
            shape={greaterThanDesktopS ? 'default' : 'round'}
            leadingIcon="ri-mail-send-line"
            loading={isLoading}
            disabled={isLoading || formMethods.watch('users').length === 0}
          />
        </Container>
      </Container>
    </FormProvider>
  )
}

export default ModalUsers
