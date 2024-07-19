import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import paths from 'shared/routes/paths'

type FileCaseModalsProps = {
  numberCaseFile?: string
}

const FileCaseModals = ({ numberCaseFile }: FileCaseModalsProps) => {
  const { getValues } = useFormContext<JudicialCaseFileType>()
  const navigate = useNavigate()
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
  const greaterThanTabletS = useMediaQuery(device.tabletS)

  const clientId = getValues('id')

  const onClickDemandedProducts = () => {
    navigate(`${paths.judicial.productosDemandados(urlIdentifier, numberCaseFile)}`)
  }

  const onClickObservations = () => {
    navigate(`${paths.judicial.observacion(urlIdentifier, codeParams)}`)
  }

  const onClickBitacora = () => {
    navigate(`${paths.judicial.bitacora(urlIdentifier, codeParams)}`)
  }

  const onClickProcessStatus = () => {
    navigate(`${paths.judicial.processStatus(urlIdentifier, codeParams)}`)
  }

  const onClickRelatedProcess = () => {
    navigate(`${paths.judicial.relatedProcess(urlIdentifier, codeParams)}`)
  }
  const onClickCollateral = () => {
    navigate(`${paths.judicial.collateral(urlIdentifier, codeParams)}`)
  }

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="row" gap="10px">
      <Button
        label="Bitacora"
        permission="P13-01-01"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickBitacora}
        trailingIcon="ri-book-3-line"
      />
      {/* <Button label="Bitacora" />
      <Button label="Garantías" />
      <Button label="Procesos Conexos" />
      <Button label="Estatus Procesal" /> */}
      <Button
        label="Observaciones"
        trailingIcon="ri-search-eye-line"
        disabled={!clientId}
        size={greaterThanTabletS ? 'default' : 'small'}
        onClick={onClickObservations}
        permission="P13-01-02"
      />
      <Button
        label="Productos Demandados"
        trailingIcon="ri-bank-card-line"
        width="250px"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickDemandedProducts}
        permission="P13-01-03"
      />
      <Button
        label="Estatus del proceso"
        trailingIcon="ri-donut-chart-line"
        width="250px"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickProcessStatus}
        permission="P13-01-04"
      />
      <Button
        label="Procesos conexos"
        trailingIcon="ri-archive-drawer-line"
        width="250px"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickRelatedProcess}
        permission="P13-01-05"
      />
      <Button
        label="Garantías"
        trailingIcon="ri-red-packet-line"
        size={greaterThanTabletS ? 'default' : 'small'}
        disabled={!clientId}
        onClick={onClickCollateral}
        permission="P13-01-06"
      />
      
    </Container>
  )
}

export default FileCaseModals
