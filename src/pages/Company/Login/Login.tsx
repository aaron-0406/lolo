import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import LoginHeader from '../../../components/Login/LoginHeader'
import { StyledLoginContainer } from '../../../components/Login/LoginStyled'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ResponseLogin, signin } from '@/services/extrajudicial/auth.service'
import { LoginType } from '@/types/extrajudicial/auth.type'
import storage from '../../../shared/utils/storage'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import logo from '@/assets/images/logo.png'
import notification from '@/ui/notification'
import { LoginResolver } from './Login.yup'
import QRCode from 'react-qr-code'
import Text from '@/ui/Text'
import Img from '@/ui/Img'

const Login = () => {
  const {
    client: { customer },
    customerUser: { setUser },
    auth: { setAuthenticate },
  } = useLoloContext()

  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: LoginResolver,
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      customerId: 0,
      code2fa: '',
    },
  })

  const { mutate: loginQuery, isLoading } = useMutation<ResponseLogin, Error>(
    async (): Promise<ResponseLogin> => {
      notification({ type: 'info', message: 'Espere por favor...' })
      return await signin(getValues())
    },
    {
      onSuccess: ({ data }) => {
        if (data.qr) {
          setQrCodeUrl(data.qr)
          notification({ type: 'success', message: data.message })
        } else {
          storage.set('token', data.token)
          setUser(data.user)
          setAuthenticate(true)
          notification({ type: 'success', message: 'Bienvenido' })
        }
      },
      onError: (error: any) => {
        setAuthenticate(false)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const onLogin = () => {
    setValue('customerId', customer.id)
    handleSubmit(() => {
      loginQuery()
    })()
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onLogin()
    }
  }

  return (
    <StyledLoginContainer className="login">
      <Container className="login__form-container">
        <Container className="login__header">
          <Img src={logo} alt="logo" placeholderImage="" className="login__header-img" />
          <Text.Body size="l" weight="bold" color="Primary5">
            LoloBank
          </Text.Body>
        </Container>

        <Container className="login__form">
          <LoginHeader />
          <Container
            width="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="30px"
            padding="23px"
          >
            {qrCodeUrl ? (
              <Container width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Text.Body size="s" weight="bold">
                  Escanea el código QR:
                </Text.Body>
                <QRCode value={qrCodeUrl} size={150} />
              </Container>
            ) : null}
            <Container width="100%" display="flex" flexDirection="column" gap="30px">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    width="100%"
                    label="Email"
                    type="email"
                    value={field.value}
                    helperText={errors.email?.message}
                    hasError={!!errors.email}
                    onChange={field.onChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    width="100%"
                    label="Password"
                    type="password"
                    value={field.value}
                    helperText={errors.password?.message}
                    hasError={!!errors.password}
                    onChange={field.onChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              />

              <Controller
                name="code2fa"
                control={control}
                render={({ field }) => (
                  <TextField
                    width="100%"
                    label="Código de 6 dígitos"
                    type="text"
                    value={field.value}
                    helperText={errors.code2fa?.message}
                    hasError={!!errors.code2fa}
                    onChange={field.onChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              />
            </Container>

            <Button onClick={onLogin} disabled={isLoading} loading={isLoading} width="100%" label="Continuar" />
          </Container>
        </Container>
      </Container>

      <Container className="content__container">
        <Container className="content__balls-container">
          <Container className="content__ball-first" />
          <Container className="content__ball-second" />
        </Container>

        <Container className="info__container">
          <Container className="info__cover" />

          <Container className="info__text-container">
            <Text.Body size="l" weight="bold" color="Neutral0" className="info__text-title">
              Bienvenido a LoloBank
            </Text.Body>
            <Text.Body weight="regular" size="s" color="Neutral0" className="info__text-title--sub">
              Optimización de la Cobranza: Enfoques Judiciales y Extrajudiciales para la Gestión de Cartera
            </Text.Body>
          </Container>
        </Container>
      </Container>
    </StyledLoginContainer>
  )
}

export default Login
