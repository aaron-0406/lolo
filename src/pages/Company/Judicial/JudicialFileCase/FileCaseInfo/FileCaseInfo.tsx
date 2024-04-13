import { Controller, useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import Select from '@/ui/Select'
import TextField from '@/ui/fields/TextField'
import { SelectItemType } from '@/ui/Select/interfaces'
import DatePicker from '@/ui/DatePicker/DatePicker'
import moment from 'moment'

type FileCaseInfoProps = {
  loading: boolean
}

const FileCaseInfo = ({ loading }: FileCaseInfoProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialCaseFileType>()
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

  const optionsJudicialProceduralWays: Array<SelectItemType> = judicialProceduralWays.map((subject) => {
    return {
      key: String(subject.id),
      label: subject.proceduralWay,
    }
  })

  if (loading) return <div>Loading ...</div>

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
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="Nº Expediente" />
          <Controller
            name="numberCaseFile"
            control={control}
            render={({ field }) => (
              <TextField
                helperText={errors.numberCaseFile?.message}
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
                helperText={errors.cautionaryCode?.message}
                width="100%"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.cautionaryCode}
              />
            )}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="Juzgado:" />
          <Controller
            name="judicialCourtId"
            control={control}
            render={({ field }) => (
              <Select
                helperText={errors.judicialCourtId?.message}
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
          <Label label="Sede Judicial:" />
          <Controller
            name="judicialVenue"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                helperText={errors.judicialVenue?.message}
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.judicialVenue}
              />
            )}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="Materia:" />
          <Controller
            name="judicialSubjectId"
            control={control}
            render={({ field }) => (
              <Select
                helperText={errors.judicialSubjectId?.message}
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
        <div className="field-wrapper">
          <Label label="Via Procedimental:" />
          <Controller
            name="judicialProceduralWayId"
            control={control}
            render={({ field }) => (
              <Select
                helperText={errors.judicialProceduralWayId?.message}
                width="100%"
                value={String(field.value)}
                options={optionsJudicialProceduralWays}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                hasError={!!errors.judicialProceduralWayId}
              />
            )}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="Secretario:" />
          <Controller
            name="secretary"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                helperText={errors.secretary?.message}
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.secretary}
              />
            )}
          />
        </div>
        <div className="field-wrapper">
          <Label label="Juez:" />
          <Controller
            name="judge"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                helperText={errors.judge?.message}
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.judge}
              />
            )}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="Monto Demandado S/:" />
          <Controller
            name="amountDemandedSoles"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                helperText={errors.amountDemandedSoles?.message}
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.amountDemandedSoles}
              />
            )}
          />
        </div>
        <div className="field-wrapper">
          <Label label="Monto Demandado US$:" />
          <Controller
            name="amountDemandedDollars"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                value={field.value}
                helperText={errors.amountDemandedDollars?.message}
                onChange={field.onChange}
                hasError={!!errors.amountDemandedDollars}
              />
            )}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Controller
            name="demandDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                orientation="horizontal"
                labelWidth="10rem"
                label="Fecha de Demanda:"
                selectedDate={moment(field.value).format('DD-MM-YYYY')}
                placeholder="Ingrese la fecha:"
                dateFormat="DD-MM-YYYY"
                value={field.value}
                getDate={(e) => {
                  field.onChange(e)
                }}
              />
            )}
          />
        </div>
        <div className="field-wrapper">
          <Label label="Nº de Juicio:" />
          <Controller
            name="judgmentNumber"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                value={field.value}
                onChange={field.onChange}
                helperText={errors.judgmentNumber?.message}
                hasError={!!errors.judgmentNumber}
              />
            )}
          />
        </div>
      </Container>
      <Container className="fields-wrapper-container">
        <div className="field-wrapper">
          <Label label="codemandado:" />
          <Controller
            name="errandCode"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                helperText={errors.errandCode?.message}
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.errandCode}
              />
            )}
          />
        </div>
      </Container>
    </StyledContainer>
  )
}

export default FileCaseInfo

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;

    .fields-wrapper-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .field-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    @media ${theme.device.tabletL} {
      .fields-wrapper-container {
        flex-direction: row;
        gap: 15px;
      }

      .field-wrapper {
        flex-direction: row;
      }
    }
  `}
`
