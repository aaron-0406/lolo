import { Controller, useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Container from '@/ui/Container'
import Select from '@/ui/Select'
import TextField from '@/ui/fields/TextField'
import DatePicker from '@/ui/DatePicker/DatePicker'
import moment from 'moment'
import { getSubjectByCHB } from '@/services/judicial/judicial-subject.service'
import { getCourtByCHB } from '@/services/judicial/judicial-court.service'
import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_JUDICIAL_COURTS_CACHE } from '../../JudicialCourt/CourtTable/utils/judicial-court.cache'
import { KEY_JUDICIAL_SUBJECT_CACHE } from '../../JudicialSubject/SubjectTable/utils/judicial-subject.cache'
import { KEY_JUDICIAL_PROCEDURAL_WAY_CACHE } from '../../JudicialProceduralWay/ProceduralWayTable/utils/judicial-procedural-way.cache'
import { getProceduralWayByCHB } from '@/services/judicial/judicial-procedural-way.service'
import { AxiosResponse } from 'axios'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import { SelectItemType } from '@/ui/Select/interfaces'
import Button from '@/ui/Button'
import FileCasesRelatedModal from './FileCasesRelatedModal'
import useModal from '@/hooks/useModal'
import { useQuery } from 'react-query'
import { BankType } from '@/types/dash/bank.type'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
import { getSedeByCHB } from '@/services/judicial/judicial-sede.service'
import { KEY_JUDICIAL_SEDE_CACHE } from '../../JudicialSede/SedeTable/utils/judicial-sede.cache'

type FileCaseInfoProps = {
  loading: boolean
}

const FileCaseInfo = ({ loading }: FileCaseInfoProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
    user: { users },
    city: { cities },
    client: {
      customer: { customerBanks },
    },
  } = useLoloContext()

  const {
    control,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<
    JudicialCaseFileType & {
      judicialCourt: { court: string; customerHasBankId: string }
      judicialSubject: { subject: string; customerHasBankId: string }
      judicialProceduralWay: { proceduralWay: string; customerHasBankId: string }
    }
  >()

  const optionsStates: Array<SelectItemType> = customerBanks.map((bank: BankType) => {
    return {
      key: String(bank.id),
      label: bank.name,
    }
  })

  const clientId = getValues('clientId')

  const judicialCourt = getValues('judicialCourt')
  const judicialSubject = getValues('judicialSubject')
  const judicialProceduralWay = getValues('judicialProceduralWay')

  const { data: dataCourts } = useQuery<AxiosResponse<Array<JudicialCourtType & { city: { name: string } }>>>(
    [KEY_JUDICIAL_COURTS_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getCourtByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const courts = dataCourts?.data ?? []
  const optionsCourts: Array<SelectItemType> = courts.map(
    (court: { id: number; court: string; city: { name: string } }) => {
      return {
        key: String(court.id),
        label: `${court.court} ${court?.city?.name ? ' - ' + court?.city?.name.toUpperCase() : ''}`,
      }
    }
  )

  const { data: dataSubject } = useQuery<AxiosResponse<Array<JudicialSubjectType>>>(
    [KEY_JUDICIAL_SUBJECT_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getSubjectByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const subjects = dataSubject?.data ?? []
  const optionsSubjects: Array<SelectItemType> = subjects.map((subject: { id: number; subject: string }) => {
    return {
      key: String(subject.id),
      label: subject.subject,
    }
  })

  const { data: dataSede } = useQuery<AxiosResponse<Array<JudicialSedeType>>>(
    [KEY_JUDICIAL_SEDE_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getSedeByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const sedes = dataSede?.data ?? []
  const optionsSede: Array<SelectItemType> = sedes.map((sede: { id: number; sede: string }) => {
    return {
      key: String(sede.id),
      label: sede.sede,
    }
  })

  const { data: dataProceduralWay } = useQuery<AxiosResponse<Array<JudicialProceduralWayType>>>(
    [KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, parseInt(chb?.length ? chb : '0')],
    async () => {
      return await getProceduralWayByCHB(parseInt(chb.length ? chb : '0'))
    }
  )
  const proceduralWays = dataProceduralWay?.data ?? []
  const optionsProceduralWay: Array<SelectItemType> = proceduralWays.map(
    (proceduralWay: { id: number; proceduralWay: string }) => {
      return {
        key: String(proceduralWay.id),
        label: proceduralWay.proceduralWay,
      }
    }
  )

  const { hideModal, showModal, visible } = useModal()

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

  if (loading) {
    return <Container>Loading ...</Container>
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
      <Container className="fields-wrapper-container-t">
        <Controller
          name="numberCaseFile"
          control={control}
          render={({ field }) => (
            <Container display="flex" flexDirection="row" gap="10px" flexWrap="nowrap" width="100%" alignItems="center">
              <TextField
                helperText={errors.numberCaseFile?.message}
                width="100%"
                label="Nº Expediente"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.numberCaseFile}
                disabled={!clientId}
              />
              {watch('id') !== 0 && (
                <Button
                  size="small"
                  style={{
                    marginTop: '30px',
                  }}
                  onClick={() => showModal()}
                  shape="round"
                  trailingIcon="ri-eye-line"
                  messageTooltip="Ver expedientes relacionados"
                />
              )}
            </Container>
          )}
        />
        <Controller
          name="cautionaryCode"
          control={control}
          render={({ field }) => (
            <TextField
              label="Código Cautelar:"
              helperText={errors.cautionaryCode?.message}
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.cautionaryCode}
              disabled={!clientId}
            />
          )}
        />
      </Container>
      <Container className="fields-wrapper-container-t">
        <Controller
          name="judicialCourtId"
          control={control}
          render={({ field }) => (
            <Select
              label="Juzgado:"
              helperText={errors.judicialCourtId?.message}
              width="100%"
              value={String(field.value)}
              options={optionsCourts}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              placeholder={judicialCourt?.court}
              hasError={!!errors.judicialCourtId}
              disabled={!clientId}
            />
          )}
        />
        <Controller
          name="judicialSedeId"
          control={control}
          render={({ field }) => (
            <Select
              label="Sede Judicial:"
              width="100%"
              value={String(field.value)}
              options={optionsSede}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.customerUserId}
              disabled={!clientId}
            />
          )}
        />
      </Container>
      <Container className="fields-wrapper-container-t">
        <Controller
          name="judicialSubjectId"
          control={control}
          render={({ field }) => (
            <Select
              label="Materia:"
              helperText={errors.judicialSubjectId?.message}
              width="100%"
              value={String(field.value)}
              options={optionsSubjects}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              placeholder={judicialSubject?.subject}
              hasError={!!errors.judicialSubjectId}
              disabled={!clientId}
            />
          )}
        />
        <Controller
          name="judicialProceduralWayId"
          control={control}
          render={({ field }) => (
            <Select
              label="Via Procedimental:"
              helperText={errors.judicialProceduralWayId?.message}
              width="100%"
              value={String(field.value)}
              options={optionsProceduralWay}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              placeholder={judicialProceduralWay?.proceduralWay}
              hasError={!!errors.judicialProceduralWayId}
              disabled={!clientId}
            />
          )}
        />
      </Container>
      <Container className="fields-wrapper-container-t">
        <Controller
          name="secretary"
          control={control}
          render={({ field }) => (
            <TextField
              label="Secretario:"
              width="100%"
              helperText={errors.secretary?.message}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.secretary}
              disabled={!clientId}
            />
          )}
        />
        <Controller
          name="judge"
          control={control}
          render={({ field }) => (
            <TextField
              label="Juez:"
              width="100%"
              helperText={errors.judge?.message}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.judge}
              disabled={!clientId}
            />
          )}
        />
      </Container>
      <Container className="fields-wrapper-container-t">
        <Controller
          name="amountDemandedSoles"
          control={control}
          render={({ field }) => (
            <TextField
              label="Monto Demandado S/:"
              width="100%"
              helperText={errors.amountDemandedSoles?.message}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.amountDemandedSoles}
              disabled={!clientId}
            />
          )}
        />
        <Controller
          name="amountDemandedDollars"
          control={control}
          render={({ field }) => (
            <TextField
              label="Monto Demandado US$:"
              width="100%"
              value={field.value}
              helperText={errors.amountDemandedDollars?.message}
              onChange={field.onChange}
              hasError={!!errors.amountDemandedDollars}
              disabled={!clientId}
            />
          )}
        />
      </Container>
      <Container className="fields-wrapper-container-t">
        <Controller
          name="customerUserId"
          control={control}
          render={({ field }) => (
            <Select
              label="Abogado:"
              width="100%"
              value={String(field.value)}
              options={optionsUsers}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.customerUserId}
              disabled={!clientId}
            />
          )}
        />
        <Controller
          name="errandCode"
          control={control}
          render={({ field }) => (
            <TextField
              label="Codemandado:"
              width="100%"
              value={field.value}
              helperText={errors.errandCode?.message}
              onChange={field.onChange}
              hasError={!!errors.errandCode}
              disabled={!clientId}
            />
          )}
        />
      </Container>
      <Container className="fields-wrapper-container-t">
        <Controller
          name="demandDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              labelWidth="10rem"
              label="Fecha de Demanda:"
              selectedDate={moment(field.value).format('DD-MM-YYYY')}
              placeholder="Ingrese la fecha:"
              dateFormat="DD-MM-YYYY"
              value={field.value ?? moment(new Date()).format('DD-MM-YYYY')}
              getDate={(e) => {
                field.onChange(e)
              }}
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
      </Container>
      <Container className="fields-wrapper-container-t">
        <Container width="100%">
          <Controller
            control={control}
            name="bankId"
            render={({ field }) => (
              <Select
                label="Banco"
                width="100%"
                value={String(field.value)}
                options={optionsStates}
                onChange={(key) => {
                  field.onChange(parseInt(key))
                }}
                hasError={!!errors.bankId}
                disabled={!clientId}
              />
            )}
          />
        </Container>
        <Controller
          name="judgmentNumber"
          control={control}
          render={({ field }) => (
            <TextField
              width="100%"
              label="Nº de Juicio:"
              value={field.value}
              onChange={field.onChange}
              helperText={errors.judgmentNumber?.message}
              hasError={!!errors.judgmentNumber}
              disabled={!clientId}
            />
          )}
        />
      </Container>

      <FileCasesRelatedModal
        onClose={() => {
          hideModal()
        }}
        visible={visible}
      />
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
