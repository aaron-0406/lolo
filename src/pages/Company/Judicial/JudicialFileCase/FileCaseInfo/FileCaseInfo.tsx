import { Controller, useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import { FileCaseType } from '@/types/judicial/case-file.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import Select from '@/ui/Select'
import TextAreaField from '@/ui/fields/TextAreaField'
import TextField from '@/ui/fields/TextField'
import { SelectItemType } from '@/ui/Select/interfaces'

type FileCaseInfoProps = {
  loading: boolean
}
const FileCaseInfo = ({ loading }: FileCaseInfoProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FileCaseType>()
  const {
    judicial: {
      judicialCourt: { judicialCourts },
      judicialProceduralWay: { judicialProceduralWays },
      judicialSubject: { judicialSubjects },
    },
  } = useLoloContext()

  const optionsJudicialCourts: Array<SelectItemType> = judicialCourts.map((court) => {
    return {
      key: String(court.id),
      label: court.court,
    }
  })
  const optionsJudicialSubjects: Array<SelectItemType> = judicialSubjects.map((subject) => {
    return {
      key: String(subject.id),
      label: subject.subject,
    }
  })
  const optionsJudicialProceduralWays: Array<SelectItemType> = judicialProceduralWays.map((proceduralWay) => {
    return {
      key: String(proceduralWay.id),
      label: proceduralWay.proceduralWay,
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
        <div className="field-wrapper">
          <Label label="Nº Expediente:" />
          <Controller
            name="numberCaseFile"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.numberCaseFile}
              />
            )}
          />
        </div>
        <div className="field-wrapper">
          <Label label="Código Cautelar:" />
          <Controller
            name="cautionaryCode"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.cautionaryCode}
              />
            )}
          />
        </div>
      </div>
      <div className="fields-wrapper-container-d">
        <div className="field-wrapper">
          <Controller
            name="judicialCourtId"
            control={control}
            render={({ field }) => (
              <Select
                label="Juzgado:"
                width="100%"
                value={String(field.value)}
                options={optionsJudicialCourts}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                hasError={!!errors.judicialCourtId}
              />
            )}
          />
        </div>
        <div className="field-wrapper">
          <Controller
            name="judicialSubjectId"
            control={control}
            render={({ field }) => (
              <Select
                label="Materia:"
                width="100%"
                value={String(field.value)}
                options={optionsJudicialSubjects}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                hasError={!!errors.judicialSubjectId}
              />
            )}
          />
        </div>
      </div>
      <div className="fields-wrapper-container-d"></div>
      <div className="fields-wrapper-container-d"></div>
      <div className="fields-wrapper-container-d"></div>
      <div className="fields-wrapper-container-d"></div>
      {/* <div className="fields-wrapper-container-t">
        <div className="field-wrapper">
          <Label label="Código:" />
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.code} />
            )}
          />
        </div>

        <div className="field-wrapper">
          <Label label="Estado:" />

          <Controller
            name="negotiationId"
            control={control}
            render={({ field }) => (
              <Select
                width="100%"
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
      </div>

      <div className="field-wrapper">
        <Label label="DNI o RUC:" />
        <Controller
          name="dniOrRuc"
          control={control}
          render={({ field }) => (
            <TextField
              width="calc(100% - 98px)"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.dniOrRuc}
            />
          )}
        />
      </div>

      <div className="field-wrapper">
        <Label label="Cliente:" />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.name}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-d">
        <Controller
          name="salePerimeter"
          control={control}
          render={({ field }) => (
            <TextAreaField
              label="Perímetro venta:"
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.salePerimeter}
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

      <div className="fields-wrapper-container-d">
        <div className="field-wrapper">
          <Label label="Funcionario:" />
          <Controller
            name="funcionarioId"
            control={control}
            render={({ field }) => (
              <Select
                width="calc(100% - 108px)"
                value={String(field.value)}
                options={optionsFuncionarios}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                hasError={!!errors.funcionarioId}
              />
            )}
          />
        </div>

        <div className="field-wrapper">
          <Label label="Jurisdicción:" />
          <Controller
            name="cityId"
            control={control}
            render={({ field }) => (
              <Select
                width="100%"
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
      </div> */}
    </StyledContainer>
  )
}

export default FileCaseInfo

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
