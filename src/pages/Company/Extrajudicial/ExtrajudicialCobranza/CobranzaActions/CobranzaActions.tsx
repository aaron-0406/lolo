import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { generateDocumentService } from '@/services/extrajudicial/document.service'
import { getClientByCode } from '@/services/extrajudicial/client.service'
import { device } from '@/breakpoints/responsive'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { saveClient } from '@/services/extrajudicial/client.service'
import { ClientType } from '@/types/extrajudicial/client.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { DOMAIN } from '../../../../../shared/utils/constant/api'
import paths from 'shared/routes/paths'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'

type CobranzaActionsProps = {
  setLoadingGlobal: (state: boolean) => void
}

const CobranzaActions = ({ setLoadingGlobal }: CobranzaActionsProps) => {
  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const navigate = useNavigate()

  const codeParams = useParams().code ?? ''
  const { setValue, reset, handleSubmit, getValues } = useFormContext<ClientType>()

  const { refetch } = useQuery(
    'query-get-client-by-code',
    async () => {
      return await getClientByCode(codeParams, selectedBank.idCHB)
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue('id', data.data.id)
        setValue('code', data.data.code)
        setValue('negotiationId', data.data.negotiationId)
        setValue('dniOrRuc', data.data.dniOrRuc ?? '')
        setValue('name', data.data.name)
        setValue('salePerimeter', data.data.salePerimeter ?? '')
        setValue('phone', data.data.phone ?? '')
        setValue('email', data.data.email ?? '')
        setValue('createdAt', data.data.createdAt)
        setValue('cityId', data.data.cityId)
        setValue('funcionarioId', data.data.funcionarioId)
        setValue('customerUserId', data.data.customerUserId)
        setValue('customerHasBankId', data.data.customerHasBankId)

        setLoadingGlobal(false)
      },
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })

        reset()
        setValue('salePerimeter', '')
        setValue('phone', '')
        setValue('email', '')

        setLoadingGlobal(false)
      },
    }
  )

  const greaterThanTableS = useMediaQuery(device.tabletS)

  const { isLoading: loadingSaveClient, mutate: saveCustomer } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await saveClient(getValues(), Number(customer.id))
    },
    {
      onSuccess: (data) => {
        const notificationMessage = getValues().id === 0 ? 'Cliente creado' : 'Cliente actualizado'
        notification({ type: 'success', message: `${notificationMessage}` })
        setValue('id', data.data.id)

        navigate(`${paths.cobranza.cobranza(customer.urlIdentifier, getValues().code)}`)
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { mutate: generateDocument } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      return await generateDocumentService(3, [getValues('id')])
    },
    {
      onSuccess: ({ data }) => {
        const anchor = document.createElement('a')
        anchor.href = `${DOMAIN}/download/${data.docName}`
        anchor.click()
        notification({
          type: 'success',
          message: 'Documento creado',
        })
      },
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const onSaveClient = () => {
    setValue('customerHasBankId', parseInt(selectedBank.idCHB))

    handleSubmit(() => {
      saveCustomer()
    })()
  }

  const onGenerateWord = () => {
    generateDocument()
  }

  const routers: LinkType[] = [
    {
      link: paths.cobranza.clientes(customer.urlIdentifier),
      name: 'Clientes',
    },
    {
      link: paths.cobranza.cobranza(customer.urlIdentifier, codeParams),
      name: codeParams,
    },
  ]

  useEffect(() => {
    if (!!codeParams.length && codeParams !== '000000000') {
      setLoadingGlobal(true)
      refetch()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container width="100%" display="flex" justifyContent="space-between" alignItems="center" gap="20px">
      <Breadcrumbs routes={routers} />
      <Container width="230px" display="flex" justifyContent="space-between" alignItems="center" gap="10px">
        <Button
          width="130px"
          label={greaterThanTableS && 'Guardar'}
          shape={greaterThanTableS ? 'default' : 'round'}
          trailingIcon="ri-save-3-line"
          onClick={onSaveClient}
          loading={loadingSaveClient}
          messageTooltip="Guardar cambios"
        />
        <Button
          width="100px"
          shape="round"
          trailingIcon="ri-file-word-line"
          onClick={onGenerateWord}
          disabled={!getValues('id')}
          permission="P02-02-02"
          messageTooltip="(WORD) Descargar información del cliente!"
        />
      </Container>
    </Container>
  )
}

export default CobranzaActions
