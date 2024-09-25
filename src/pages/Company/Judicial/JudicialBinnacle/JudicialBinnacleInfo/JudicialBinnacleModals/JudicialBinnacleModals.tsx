import Container from '@/ui/Container'
import Button from '@/ui/Button'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useNavigate, useParams } from "react-router-dom"
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'

const JudicialBinnacleModals = () => {
  const codeParams = useParams().code ?? ''
  const relatedProcessCodeParams = useParams().relatedProcessCode ?? ''
  const binnacleCode = useParams().binnacleCode ?? ''
  const greaterThanTabletS = useMediaQuery(device.tabletS)
  const navigate = useNavigate()
  const {
    client: {
      customer: { urlIdentifier },
    }
  } = useLoloContext() 

  const onClickNotifications = () => {
    if (relatedProcessCodeParams) {
      navigate(`${paths.judicial.notificationsRelatedProcess(urlIdentifier, codeParams, relatedProcessCodeParams, binnacleCode)}`)
    }else {
      navigate(`${paths.judicial.notifications(urlIdentifier, codeParams, binnacleCode)}`)
    }
  }

  return (
    <Container
      className="container__down"
      width="100%"
      height="78px"
      padding="10px 40px"
      backgroundColor="#eff0f6ff"
      overFlowX="auto"
    >
      <Container width="100%" height="100%" display="flex" flexDirection="row" gap="10px">
      <Button
        label="Notificaciones"
        permission={relatedProcessCodeParams ? "P13-01-05-01-01-06-01" :"P13-01-04-01"}
        size={greaterThanTabletS ? 'default' : 'small'}
        onClick={onClickNotifications}
        trailingIcon="ri-notification-badge-fill"
      />
      </Container>
    </Container>
  )
}

export default JudicialBinnacleModals