import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import paths from 'shared/routes/paths'

type FileCaseModalsProps = {
  ownerFileCase?: ClientType & { customerUser: { id: number; name: string } }
  numberCaseFile?: string
}

const FileCaseModals = ({ ownerFileCase, numberCaseFile }: FileCaseModalsProps) => {
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

  const onClickBitacora = () => {
    navigate(`${paths.judicial.bitacora(urlIdentifier, codeParams)}`)
  }

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="row" gap="10px">
      <Button
        label="Bitacora"
        permission="P13-01-01"
        size={greaterThanTabletS ? "default": "small"}
        disabled={!clientId}
        onClick={onClickBitacora}
        trailingIcon="ri-book-3-line"

      />
    </Container>
  )
}

export default FileCaseModals
