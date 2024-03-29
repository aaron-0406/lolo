import { Controller, useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import Container from '@/ui/Container'
import TextAreaField from '@/ui/fields/TextAreaField'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'

type CobranzaInfoProps = {
  loading: boolean
}

const CobranzaInfo = ({ loading }: CobranzaInfoProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ClientType>()

  const {
    city: { cities },
    user: { users },
    extrajudicial: {
      funcionario: { funcionarios },
      negociacion: { negociaciones },
    },
  } = useLoloContext()

  const optionsCities: Array<SelectItemType> = cities.map((city) => {
    return {
      key: String(city.id),
      label: city.name,
    }
  })

  const optionsUsers: Array<SelectItemType> = users.map((user) => {
    return {
      key: String(user.id),
      label: user.name,
    }
  })

  const optionsFuncionarios: Array<SelectItemType> = funcionarios.map((funcionario) => {
    return {
      key: String(funcionario.id),
      label: funcionario.name,
    }
  })

  const optionsStates: Array<SelectItemType> = negociaciones.map((negociacion) => {
    return {
      key: String(negociacion.id),
      label: negociacion.name,
    }
  })

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <StyledContainer
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      padding="20px 40px"
      gap="20px"
      overFlowY="auto"
    >
      <div className="fields-wrapper-container-t">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              width="100%"
              label="Código"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.code}
            />
          )}
        />

        <Controller
          name="negotiationId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              label="Estado:"
              value={String(field.value)}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.negotiationId}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-t">
        <Controller
          name="dniOrRuc"
          control={control}
          render={({ field }) => (
            <TextField
              width="100%"
              label="DNI o RUC:"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.dniOrRuc}
            />
          )}
        />

        <Controller
          name="customerUserId"
          control={control}
          render={({ field }) => (
            <Select
              label="Gestor:"
              width="100%"
              value={String(field.value)}
              options={optionsUsers}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.customerUserId}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-t">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              label="Cliente:"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.name}
            />
          )}
        />

        <Controller
          name="salePerimeter"
          control={control}
          render={({ field }) => (
            <TextAreaField
              label="Perímetro venta:"
              width="100%"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.salePerimeter}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-t">
        <Controller
          name="funcionarioId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              label="Funcionario:"
              value={String(field.value)}
              options={optionsFuncionarios}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.funcionarioId}
            />
          )}
        />

        <Controller
          name="cityId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              label="Jurisdicción:"
              value={String(field.value)}
              options={optionsCities}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.cityId}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-t">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              label="Teléfonos:"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.phone}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              label="Email:"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.email}
            />
          )}
        />
      </div>
    </StyledContainer>
  )
}

export default CobranzaInfo

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;

    .fields-wrapper-container-t {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .fields-wrapper-container-d {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .field-wrapper {
      width: 100%;
      display: flex;
      gap: 15px;
    }

    @media ${theme.device.tabletL} {
      .fields-wrapper-container-t {
        flex-direction: row;
        gap: 15px;
      }
    }

    @media ${theme.device.desktopL} {
      .fields-wrapper-container-d {
        flex-direction: row;
        gap: 15px;
      }
    }
  `}
`
