import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import {
  createFileCase,
  getFileCaseByNumberFile,
  updateFileCase,
} from '@/services/judicial/judicial-file-case-related-process.service'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { notification } from '@/ui/notification/notification'
import { JudicialFileCaseTableRow } from '../../JudicialFileCasesList/JudicialFileCasesTable/utils/file-cases.cache'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import moment from 'moment'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import judicialFileCaseRelatedProcessCache from '../../JudicialFileCaseRelatedProcessesList/FileCaseRelatedProcessesTable/utils/file-cases-related-Process.cache'

type FileCaseActionsProps = {
  setLoadingGlobal: (state: boolean) => void
  setOwnerFileCase: (value: ClientType & { customerUser: { id: number; name: string } }) => void
  caseFileRelatedProcessId: number
}

const FileCaseActions = ({ setLoadingGlobal, setOwnerFileCase, caseFileRelatedProcessId }: FileCaseActionsProps) => {
  const queryClient = useQueryClient()
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()
  const codeParams = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''

  const chb = selectedBank.idCHB.length ? parseInt(selectedBank.idCHB) : 0

  const navigate = useNavigate()

  const {
    actions: { createFileCaseRelatedProcessCache, editFileCaseRelatedProcessCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseRelatedProcessCache(queryClient)

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  const { reset, getValues, watch, setValue, handleSubmit } = useFormContext<
    JudicialCaseFileType & {
      judicialCourt: { court: string; customerHasBankId: string }
      judicialSubject: { subject: string; customerHasBankId: string }
      judicialProceduralWay: { proceduralWay: string; customerHasBankId: string }
    }
  >()

  const { isLoading: loadingCreateFileCase, mutate: createFileCaseRelatedProcessMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await createFileCase(restFileCase, String(customer.id))
    },
    {
      onSuccess: (result) => {
        setValue('id', result.data.id)
        createFileCaseRelatedProcessCache(result.data)
        notification({ type: 'success', message: 'Expediente creado' })
        navigate(
          `${paths.judicial.detallesExpedienteRelatedProcess(
            customer.urlIdentifier,
            codeParams,
            result.data.numberCaseFile
          )}`
        )
      },
      onMutate: () => {
        return onMutateCache(caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
      },
      onSettled: () => {
        onSettledCache(caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: updateFileCaseRelatedProcessMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await updateFileCase(id, restFileCase)
    },
    {
      onSuccess: (result) => {
        editFileCaseRelatedProcessCache(result.data)
        notification({ type: 'success', message: 'Expediente actualizado' })
      },
      onMutate: () => {
        return onMutateCache(caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
      },
      onSettled: () => {
        onSettledCache(caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, caseFileRelatedProcessId ? caseFileRelatedProcessId : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', relatedProcessCodeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(relatedProcessCodeParams ?? '', chb)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('numberCaseFile', data.data.numberCaseFile)
        setValue('judgmentNumber', data.data?.judgmentNumber ?? 0)
        setValue('secretary', data.data?.secretary ?? '')
        setValue('amountDemandedSoles', data.data?.amountDemandedSoles ?? 0)
        setValue('amountDemandedDollars', data.data?.amountDemandedDollars ?? 0)
        setValue('cautionaryCode', data.data?.cautionaryCode ?? '')
        setValue('errandCode', data.data?.errandCode ?? '')
        setValue('judicialVenue', data.data?.judicialVenue ?? '')
        setValue('judge', data.data?.judge ?? '')
        setValue('demandDate', moment(data.data.demandDate.split('T')[0]).format('DD-MM-YYYY'))
        setValue('clientId', data.data.clientId)
        setValue('customerUserId', data.data.customerUserId)
        setValue('judicialCourtId', data.data.judicialCourtId)
        setValue('judicialSubjectId', data.data.judicialSubjectId)
        setValue('judicialProceduralWayId', data.data.judicialProceduralWayId)
        setValue('customerHasBankId', data.data.customerHasBankId)
        setValue('judicialCourt', data.data?.judicialCourt)
        setValue('judicialSubject', data.data?.judicialSubject)
        setValue('judicialProceduralWay', data.data?.judicialProceduralWay)
        setValue('idJudicialCaseFileRelated', data.data?.idJudicialCaseFileRelated)
        setValue('bankId', data.data.bankId)

        setOwnerFileCase(data.data?.client)
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
        setLoadingGlobal(false)
      },
    }
  )

  const onCreate = () => {
    handleSubmit(() => {
      createFileCaseRelatedProcessMutate()
    })()
  }

  const onUpdate = () => {
    handleSubmit(
      () => {
        updateFileCaseRelatedProcessMutate()
      },
      (error) => {
        if (error.clientId) {
          notification({ type: 'warning', message: 'Necesitas seleccionar un cliente para el expediente.' })
        }
      }
    )()
  }

  const routers: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, codeParams),
      name: codeParams,
    },
    {
      link: paths.judicial.relatedProcess(customer.urlIdentifier, codeParams),
      name: 'Procesos Conexos',
    },
    {
      link: paths.judicial.detallesExpedienteRelatedProcess(
        customer.urlIdentifier,
        codeParams,
        relatedProcessCodeParams
      ),
      name: relatedProcessCodeParams,
    },
  ]

  useEffect(() => {
    setValue('idJudicialCaseFileRelated', caseFileRelatedProcessId)
  }, [caseFileRelatedProcessId])

  useEffect(() => {
    if (!!relatedProcessCodeParams.length && relatedProcessCodeParams !== '000000000') {
      setLoadingGlobal(false)
      refetch()
    }
    // eslint-disable-next-line
  }, [relatedProcessCodeParams])

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems={greaterThanDesktopS ? 'center' : 'start'}
      gap="20px"
      padding={greaterThanDesktopS ? '0px 0px 0px 20px' : '0px'}
      flexDirection={greaterThanDesktopS ? 'row' : 'column'}
    >
      <Breadcrumbs routes={routers} />

      <Container width="fit-content" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Button
          width="130px"
          label={greaterThanDesktopS && 'Guardar'}
          shape={greaterThanDesktopS ? 'default' : 'round'}
          size={greaterThanTabletS ? 'default' : 'small'}
          trailingIcon="ri-save-3-line"
          onClick={watch().id !== 0 ? onUpdate : onCreate}
          loading={loadingCreateFileCase}
          permission={watch().id !== 0 ? 'P13-01-05-03' : 'P13-01-05-02'}
          messageTooltip="Guardar cambios"
        />
      </Container>
    </Container>
  )
}

export default FileCaseActions
