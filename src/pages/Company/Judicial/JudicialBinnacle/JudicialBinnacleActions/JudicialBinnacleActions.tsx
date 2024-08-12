import { useLoloContext } from '@/contexts/LoloProvider'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import judicialBinnacleCache from '../../JudicialBinnacleList/JudicialBinnacleTable/utils/judicial-binnacle.cache'
import { useFormContext } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createBinnacle, updateBinnacle } from '@/services/judicial/judicial-binnacle.service'
import notification from '@/ui/notification'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'

type JudicialBinnacleActionsProps = {
  judicialFileCaseId: number
  clientCode: string
  clientName: string
}

const JudicialBinnacleActions = ({ judicialFileCaseId, clientCode }: JudicialBinnacleActionsProps) => {
  const code = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const idBinnacle = useParams().binnacleCode ?? ''
  const {
    client: {
      customer: { id: customerId , urlIdentifier: customerUrlIdentifier },
    },
  } = useLoloContext()
  const {
    getValues,
    setValue, 
    watch,
  } = useFormContext<Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
    judicialBinFiles: JudicialBinFileType[]
    filesDnD: File[]
  }>()
  const queryCLient = useQueryClient()
  const {
    actions: { createJudicialBinnacleCache, editJudicialBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialBinnacleCache(queryCLient)

  const { isLoading: loadingCreateJudicialBinnacle, mutate: createJudicialBinnacle } = useMutation<
    AxiosResponse<JudicialBinnacleType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await createBinnacle({ ...restClient, files: watch('filesDnD') }, customerId, clientCode)
    },
    {
      onSuccess: (result) => {
        createJudicialBinnacleCache(result.data)
        notification({ type: 'success', message: 'Bitacora creado' })
      },
      onMutate: () => {
        return onMutateCache(judicialFileCaseId)
      },
      onSettled: () => {
        onSettledCache(judicialFileCaseId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, judicialFileCaseId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditJudicialBinnacle, mutate: editJudicialBinnacle } = useMutation<
  AxiosResponse<JudicialBinnacleType>,
  AxiosError<CustomErrorResponse>
>(
  async () => {
    const { customerHasBankId, judicialFileCaseId, ...restClient } = getValues()
    return await updateBinnacle(
      Number(idBinnacle),
      { ...restClient, files: watch('filesDnD') },
      customerId,
      clientCode
    )
  },
  {
    onSuccess: (result) => {
      editJudicialBinnacleCache(result.data)
      setValue('filesDnD', [])
      notification({ type: 'success', message: 'Bitacora editada' })
    },
    onMutate: () => {
      return onMutateCache(judicialFileCaseId)
    },
    onSettled: () => {
      onSettledCache(judicialFileCaseId)
    },
    onError: (error, _, context: any) => {
      onErrorCache(context, judicialFileCaseId)
      notification({
        type: 'error',
        message: error.response?.data.message,
        list: error.response?.data?.errors?.map((error) => error.message),
      })
    },
  }
)
  const routersCaseFile: LinkType[] = [
    {
      link: paths.judicial.expedientes(customerUrlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customerUrlIdentifier, code),
      name: code,
    },
    {
      link: paths.judicial.bitacora(customerUrlIdentifier, code),
      name: 'Bitacora',
    },
    {
      link: paths.judicial.bitacoraDetalles(customerUrlIdentifier, code, idBinnacle),
      name: idBinnacle,
    },
  ]

  const routersRelatedProcess: LinkType[] = [
    {
      link: paths.judicial.expedientes(customerUrlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customerUrlIdentifier, code),
      name: code,
    },
    {
      link: paths.judicial.relatedProcess(customerUrlIdentifier, code),
      name: 'Procesos Conexos',
    },
    {
      link: paths.judicial.detallesExpedienteRelatedProcess(customerUrlIdentifier, code, relatedProcessCodeParams),
      name: relatedProcessCodeParams,
    },
    {
      link: paths.judicial.bitacora(customerUrlIdentifier, code),
      name: 'Bitacora',
    },
    {
      link: paths.judicial.bitacoraDetalles(customerUrlIdentifier, code, idBinnacle),
      name: idBinnacle,
    },
  ]

  const addBitacora = () => {
    createJudicialBinnacle()
  }

  const editBitacora = () => {
    editJudicialBinnacle()
  }

  const binnacleCondition = !idBinnacle || idBinnacle !== '00000000'
  const binnacleActionLoading = binnacleCondition ? loadingCreateJudicialBinnacle : loadingEditJudicialBinnacle
  const binnacleAction = binnacleCondition ? editBitacora : addBitacora

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Breadcrumbs routes={relatedProcessCodeParams ? routersRelatedProcess : routersCaseFile} />
      <Container>
        <Button
          label="Guardar"
          loading={binnacleActionLoading}
          onClick={binnacleAction}
          leadingIcon="ri-save-3-line"
          permission="P13-01-01-01"
          messageTooltip="Agregar bitacora"
        />
      </Container>
    </Container>
  )
}

export default JudicialBinnacleActions