import Breadcrumbs from '@/ui/Breadcrumbs'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import paths from 'shared/routes/paths'
import Text from '@/ui/Text'
import { useNavigate } from 'react-router-dom'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useParams } from 'react-router-dom'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { JudicialBinFileType } from '@/types/judicial/judicial-bin-file.type'


type JudicialBinnacleActionsProps = {
  judicialFileCaseId: number
  clientCode: string
  clientName: string
  binnacles: Array<
    JudicialBinnacleType & {
      binnacleType: JudicialBinTypeBinnacleType
      judicialBinProceduralStage: JudicialBinProceduralStageType
      judicialBinDefendantProceduralAction: JudicialBinDefendantProceduralActionType
      judicialBinFiles: JudicialBinFileType[]
    }
  >
  isLoading: boolean
}

const JudicialBinnacleActions = ({ clientName, binnacles }: JudicialBinnacleActionsProps) => {
  const navigate = useNavigate()
  const code = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const {
    client: { customer },
  } = useLoloContext()

  const totalTariff = binnacles?.reduce((acc: number, cur: JudicialBinnacleType) => acc + Number(cur.totalTariff), 0)

  const onClickCreateBinnacle = () => {
    if (relatedProcessCodeParams) {
      navigate(paths.judicial.bitacoraDetallesRelatedProcess(customer.urlIdentifier, code, relatedProcessCodeParams, '000000000'))
    } else {
      navigate(paths.judicial.bitacoraDetalles(customer.urlIdentifier, code, '000000000'))
    } 
  }

  const routersFileCase: LinkType[] = [
    {
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.judicial.bitacora(customer.urlIdentifier, code),
      name: 'Bitacora',
    },
  ]

  const routersFileCaseRelatedProcess: LinkType[] = [
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
  ]

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Container display="flex" flexDirection="column" gap="10px">
        <Breadcrumbs routes={relatedProcessCodeParams ? routersFileCaseRelatedProcess : routersFileCase} />
        <Container padding="10px" width="100%" margin="0px 0px 10px 0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {clientName ?? '-'}
          </Text.Body>
        </Container>
      </Container>

      <Container display='flex' gap="20px" alignItems='center' justifyContent='space-between'>
        <Text.Body size="m" weight="bold" >
          Total: S/. {totalTariff.toFixed(2) ?? '0.00'}
        </Text.Body>
        <Button
          onClick={onClickCreateBinnacle}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission={relatedProcessCodeParams ? "P13-01-05-01-01-01":"P02-02-01-01"}
          messageTooltip="Agregar bitacora"
        />

        {/* {judicialFileCaseId && (
          <JudicialBinnacleModal
            clientCode={clientCode}
            visible={visibleModalAdd}
            onClose={onCloseModal}
            judicialFileCaseId={judicialFileCaseId}
          />
        )} */}
      </Container>
    </Container>
  )
}

export default JudicialBinnacleActions