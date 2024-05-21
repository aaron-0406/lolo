import { Controller, useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import Container from '@/ui/Container'
import TextAreaField from '@/ui/fields/TextAreaField'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import { KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE } from '../../ExtrajudicialNegotiations/NegotiationTable/utils/ext-negociaciones.cache'
import { useQuery } from 'react-query'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import { AxiosResponse } from 'axios'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE } from '../../ExtrajudicialFuncionarios/FuncionariosTable/utils/ext-funcionarios.cache'
import { getAllFuncionariosByCHB } from '@/services/extrajudicial/funcionario.service'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'
import FuncionariosModal from '../../ExtrajudicialFuncionarios/Modals/FuncionariosModal'
import Button from '@/ui/Button'
import useModal from '@/hooks/useModal'
import DatePicker from '@/ui/DatePicker/DatePicker'
import { useState } from 'react'
import moment from 'moment'

type CobranzaInfoProps = {
  loading: boolean
}

const CobranzaInfo = ({ loading }: CobranzaInfoProps) => {
  const [currentDate, setCurrentDate] = useState("")
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
    city: { cities },
    user: { users },
  } = useLoloContext()

  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<
    ClientType & {
      funcionario: { name: string; customerHasBankId: string }
      negotiation: { name: string; customerHasBankId: string }
    }
  >()

  const funcionario = getValues('funcionario')
  const negotiation = getValues('negotiation')

  const { data: dataNegotiations } = useQuery<AxiosResponse<Array<NegotiationType>>>(
    [KEY_EXT_COBRANZA_NEGOCIACIONES_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getAllNegociacionesByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const negociaciones = dataNegotiations?.data ?? []

  const { data: dataFuncionarios } = useQuery<AxiosResponse<Array<FuncionarioType>>>(
    [KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getAllFuncionariosByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const funcionarios = dataFuncionarios?.data ?? []

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

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

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

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
              placeholder={negotiation?.name}
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
            <Container
              display="flex"
              flexDirection="row"
              gap="10px"
              flexWrap="nowrap"
              width="100%"
              alignItems="flex-end"
            >
              <Select
                width="100%"
                label="Funcionario:"
                value={String(field.value)}
                options={optionsFuncionarios}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                placeholder={funcionario?.name}
                hasError={!!errors.funcionarioId}
              />

              <Button
                shape="round"
                leadingIcon="ri-add-fill"
                size="small"
                onClick={onShowModal}
                disabled={!chb}
                permission="P08-01"
              />
            </Container>
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
      <Container className='fields-wrapper-container-t'>
        <Controller
          name="memoAssignmentDate"
          control={control}
          render={({ field }) => (
            <DatePicker 
              width="100%"
              dateFormat='MM-DD-YYYY'
              label="Fecha de asignación:"
              selectedDate={field.value}
              value={field.value ?? ""} 
              getDate={(e) => {
                field.onChange(e) 
              }}
            />
          )}
        />
        <Container width="100%"/>
      </Container>

      <FuncionariosModal visible={visibleModalAdd} onClose={onCloseModal} />
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
