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
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import moment from 'moment'
import { FileCaseOwnerType } from '../JudicialFileCase'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'

type FileCaseActionsProps = {
  setLoadingGlobal: (state: boolean) => void
  setOwnerFileCase: (value: FileCaseOwnerType) => void
}

const FileCaseActions = ({ setLoadingGlobal, setOwnerFileCase }: FileCaseActionsProps) => {
  const queryClient = useQueryClient()
  const {
    client: { customer },
  } = useLoloContext()

  const {
    actions: { createFileCaseCache, editFileCaseCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseCache(queryClient)

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const { reset, getValues, watch, setValue, handleSubmit } = useFormContext<JudicialCaseFileType>()

  const { isLoading: loadingCreateFileCase, mutate: createFileCaseMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restFileCase } = getValues()
      return await createFileCase(restFileCase)
    },
    {
      onSuccess: (result) => {
        createFileCaseCache(result.data)
        reset()
        notification({ type: 'success', message: 'Expediente creado' })
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
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
      const { id, clientId, ...restFileCase } = getValues()
      return await updateFileCase(id, restFileCase)
    },
    {
      onSuccess: (result) => {
        editFileCaseCache(result.data)
        notification({ type: 'success', message: 'Expediente actualizado' })
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
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
        setValue('amountDemandedDollars', data.data.amountDemandedDollars)
        setValue('amountDemandedSoles', data.data.amountDemandedSoles)
        setValue('cautionaryCode', data.data.cautionaryCode)
        setValue('clientId', data.data.clientId)
        setValue('customerUserId', data.data.customerUserId)
        setValue('demandDate', moment(data.data.demandDate).format('DD-MM-YYYY'))
        setValue('judge', data.data.judge)
        setValue('judgmentNumber', data.data.judgmentNumber)
        setValue('judicialCourtId', data.data.judicialCourtId)
        setValue('judicialProceduralWayId', data.data.judicialProceduralWayId)
        setValue('judicialSubjectId', data.data.judicialSubjectId)
        setValue('judicialVenue', data.data.judicialVenue)
        setValue('numberCaseFile', data.data.numberCaseFile)
        setValue('secretary', data.data.secretary)
        setValue('customerHasBankId', data.data.customerHasBankId)
        setOwnerFileCase({
          name: data.data.client.name,
          id: data.data.client.id,
          code: data.data.client.code,
          customerUser: {
            id: data.data.client.customerUser.id,
            name: data.data.client.customerUser.name,
          },
        })
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
      },
    }
  )

  useEffect(() => {
    if (!!codeParams.length && codeParams !== '000000000') {
      setLoadingGlobal(false)
      refetch()
    }
    // eslint-disable-next-line
  }, [])

  const onCreate = () => {
    handleSubmit(() => {
      createFileCaseMutate()
    })()
  }
  const onUpdate = () => {
    handleSubmit(() => {
      updateFileCaseMutate()
    })()
  }
  const routers: LinkType[] = [
    {
      link: paths.judicial.expedientes(),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, codeParams),
      name: codeParams,
    },
  ]
  return (
    <Container width="100%" display="flex" justifyContent="space-between" alignItems="center" gap="20px">
      <Breadcrumbs routes={routers} />
      <Container width="230px" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Button
          width="130px"
          label={greaterThanDesktopS && 'Guardar'}
          shape={greaterThanDesktopS ? 'default' : 'round'}
          trailingIcon="ri-save-3-line"
          onClick={watch().id !== 0 ? onUpdate : onCreate}
          loading={loadingCreateFileCase}
          permission="P13-02"
        />
      </Container>
    </Container>
  )
}

export default FileCaseActions
