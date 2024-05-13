import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useFormContext } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { getFileCaseByNumberFile, updateFileCaseProcessStatus } from '@/services/judicial/judicial-file-case.service'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import { notification } from '@/ui/notification/notification'
import judicialFileCaseCache, {
  JudicialFileCaseTableRow,
} from '../../JudicialFileCasesList/JudicialFileCasesTable/utils/file-cases.cache'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import paths from 'shared/routes/paths'


import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'

import Text from '@/ui/Text'

type FileCaseProcessStatusProps = {
  setLoadingGlobal: (state: boolean) => void
  setOwnerFileCase: (value: ClientType & { customerUser: { id: number; name: string } }) => void
  clientName: string
  loading: boolean
}

const FileCaseProcessStatusActions = ({ setLoadingGlobal, setOwnerFileCase, clientName, loading }: FileCaseProcessStatusProps) => {
  const queryClient = useQueryClient()
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const chb = selectedBank.idCHB.length ? parseInt(selectedBank.idCHB) : 0

  const {
    actions: { editFileCaseCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialFileCaseCache(queryClient)

  const greaterThanDesktopS = useMediaQuery(device.desktopS)
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  const { reset, getValues, watch, setValue, handleSubmit } = useFormContext<
    JudicialCaseFileType & {
      judicialCourt: { court: string; customerHasBankId: string }
      judicialSubject: { subject: string; customerHasBankId: string }
      judicialProceduralWay: { proceduralWay: string; customerHasBankId: string }
    }
  >()

  const { mutate: updateFileCaseMutate } = useMutation<
    AxiosResponse<JudicialFileCaseTableRow>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restFileCaseProcessStatus } = getValues()
      return await updateFileCaseProcessStatus(id, restFileCaseProcessStatus)
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
      return await getFileCaseByNumberFile(codeParams ?? '', chb)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('processStatus', data.data?.processStatus)
        setValue('processComment', data.data?.processComment)
        setValue('processReasonId', data.data?.processReasonId)

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


  const onUpdate = () => {
    handleSubmit(
      () => {
        updateFileCaseMutate()
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
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, codeParams),
      name: 'Estado del proceso',
    },
  ]

  useEffect(() => {
    if (!!codeParams.length && codeParams !== '000000000') {
      setLoadingGlobal(false)
      refetch()
    }
    // eslint-disable-next-line
  }, [codeParams])

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="20px"
      padding={greaterThanDesktopS ? '20px' : '20px'}
    >
      <Container display="flex" flexDirection="column" gap="15px">
        <Breadcrumbs routes={routers} />
        <Container padding="10px" width="100%" margin="0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
      </Container>

      <Container width="fit-content" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Button
          width="130px"
          loading={loading}
          label={greaterThanDesktopS && 'Guardar'}
          shape={greaterThanDesktopS ? 'default' : 'round'}
          size={greaterThanTabletS ? 'default' : 'small'}
          trailingIcon="ri-save-3-line"
          onClick={watch().id !== 0 ? onUpdate : () => {} }
          permission={watch().id !== 0 ? 'P13-03' : 'P13-02'}
          messageTooltip="Guardar cambios"
        />
      </Container>
    </Container>
  )
}

export default FileCaseProcessStatusActions
