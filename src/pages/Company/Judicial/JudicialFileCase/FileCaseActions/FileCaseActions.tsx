import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createFileCase, getFileCaseByNumberFile, updateFileCase } from '@/services/judicial/judicial-file-case.service'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { notification } from '@/ui/notification/notification'
import judicialFileCaseCache, {
  JudicialFileCaseTableRow,
} from '../../JudicialFileCasesList/JudicialFileCasesTable/utils/file-cases.cache'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import moment from 'moment'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'

type FileCaseActionsProps = {
  setLoadingGlobal: (state: boolean) => void
  setOwnerFileCase: (value: ClientType & { customerUser: { id: number; name: string } }) => void
}

const FileCaseActions = ({ setLoadingGlobal, setOwnerFileCase }: FileCaseActionsProps) => {
  const queryClient = useQueryClient()
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const navigate = useNavigate()

  const {
    actions: { createFileCaseCache, editFileCaseCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseCache(queryClient)

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const { reset, getValues, watch, setValue, handleSubmit } = useFormContext<
    JudicialCaseFileType & {
      judicialCourt: { court: string; customerHasBankId: string }
      judicialSubject: { subject: string; customerHasBankId: string }
      judicialProceduralWay: { proceduralWay: string; customerHasBankId: string }
    }
  >()

  const { isLoading: loadingCreateFileCase, mutate: createFileCaseMutate } = useMutation<
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
        createFileCaseCache(result.data)
        notification({ type: 'success', message: 'Expediente creado' })
        navigate(`${paths.judicial.detallesExpediente(customer.urlIdentifier, result.data.numberCaseFile)}`)
      },
      onMutate: () => {
        return onMutateCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      },
      onSettled: () => {
        onSettledCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: updateFileCaseMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await updateFileCase(id, restFileCase)
    },
    {
      onSuccess: (result) => {
        editFileCaseCache(result.data)
        notification({ type: 'success', message: 'Expediente actualizado' })
      },
      onMutate: () => {
        return onMutateCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      },
      onSettled: () => {
        onSettledCache(selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, selectedBank.idCHB?.length ? parseInt(selectedBank.idCHB) : 0)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )

  const codeParams = useParams().code ?? ''
  const { refetch } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '')
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
        setValue('demandDate', moment(data.data.demandDate).format('DD-MM-YYYY'))
        setValue('clientId', data.data.clientId)
        setValue('customerUserId', data.data.customerUserId)
        setValue('judicialCourtId', data.data.judicialCourtId)
        setValue('judicialSubjectId', data.data.judicialSubjectId)
        setValue('judicialProceduralWayId', data.data.judicialProceduralWayId)
        setValue('customerHasBankId', data.data.customerHasBankId)
        setValue('judicialCourt', data.data?.judicialCourt)
        setValue('judicialSubject', data.data?.judicialSubject)
        setValue('judicialProceduralWay', data.data?.judicialProceduralWay)

        //TODO: Work here
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
      createFileCaseMutate()
    })()
  }

  const onUpdate = () => {
    handleSubmit(
      () => {
        updateFileCaseMutate()
      },
      (error) => {
        console.log(error)
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
  ]

  useEffect(() => {
    if (!!codeParams.length && codeParams !== '000000000') {
      setLoadingGlobal(false)
      refetch()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container width="100%" display="flex" justifyContent="space-between" alignItems="center" gap="20px">
      <Breadcrumbs routes={routers} />
      <Container width="130px" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Button
          width="130px"
          label={greaterThanDesktopS && 'Guardar'}
          shape={greaterThanDesktopS ? 'default' : 'round'}
          trailingIcon="ri-save-3-line"
          onClick={watch().id !== 0 ? onUpdate : onCreate}
          loading={loadingCreateFileCase}
          permission={watch().id !== 0 ? 'P13-03' : 'P13-02'}
          messageTooltip="Guardar cambios"
        />
      </Container>
    </Container>
  )
}

export default FileCaseActions
