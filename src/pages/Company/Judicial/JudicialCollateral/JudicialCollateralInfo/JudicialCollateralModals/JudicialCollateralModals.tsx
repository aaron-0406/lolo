import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import paths from 'shared/routes/paths'


const JudicialCollateralModals = () => {
  const { getValues } = useFormContext<JudicialCaseFileType>()
  const navigate = useNavigate()
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
  const collateralCode = useParams().collateralCode ?? ''
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  const clientId = getValues('id')

  const onClickChargesEncumbrances = () => {
    navigate(`${paths.judicial.chargesEncumbrances(urlIdentifier, codeParams, collateralCode)}`)
  }

  const onClickFiles = () => {
    navigate(`${paths.judicial.collateralFiles(urlIdentifier, codeParams, collateralCode)}`)
  }

  const onClickAuction = () => {
    navigate(`${paths.judicial.collateralAuctionList(urlIdentifier, codeParams, collateralCode)}`)
  }

  return (
    <Container
      width="100%"
      height="78px"
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap="10px"
      padding="0px 20px"
      backgroundColor="#eff0f6ff"
    >
      <Button
        label="Cargas y gravámenes"
        permission="P13-01-06-01-02"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickChargesEncumbrances}
        trailingIcon="ri-folder-shield-2-fill"
      />
      <Button
        label="Archivos"
        permission="P13-01-06-01-03"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickFiles}
        trailingIcon="ri-file-4-line"
      />
      <Button
        label="Rondas de remates"
        permission="P13-01-06-01-04"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickAuction}
        trailingIcon="ri-auction-fill"
      />
    </Container>
  )
}

export default JudicialCollateralModals
