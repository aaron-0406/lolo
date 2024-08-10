import { useLoloContext } from '@/contexts/LoloProvider'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import React from 'react'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'

const JudicialBinnacleActions = () => {
  const code = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const binnacleCode = useParams().binnacleCode ?? ''
  const {
    client: { customer },
  } = useLoloContext()

  const routers: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.judicial.relatedProcess(customer.urlIdentifier, code),
      name: 'Procesos Conexos',
    },
    {
      link: paths.judicial.detallesExpedienteRelatedProcess(customer.urlIdentifier, code, relatedProcessCodeParams),
      name: relatedProcessCodeParams,
    },
    {
      link: paths.judicial.bitacora(customer.urlIdentifier, code),
      name: 'Bitacora',
    },
    {
      link: paths.judicial.bitacoraDetalles(customer.urlIdentifier, code, binnacleCode),
      name: binnacleCode,
    }
  ]
  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Breadcrumbs routes={routers} />
      <Container>
        <Button
          label="Guardar"
          leadingIcon="ri-save-3-line"
          permission="P13-01-01-01"
          messageTooltip="Agregar bitacora"
        />
      </Container>
    </Container>
  )
}

export default JudicialBinnacleActions