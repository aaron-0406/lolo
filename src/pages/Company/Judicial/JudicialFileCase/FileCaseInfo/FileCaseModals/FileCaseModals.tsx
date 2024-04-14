import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import paths from 'shared/routes/paths'
import { FileCaseOwnerType } from '../../JudicialFileCase'

type FileCaseModalsProps = {
  ownerFileCase: FileCaseOwnerType
}

const FileCaseModals = ({ ownerFileCase }: FileCaseModalsProps) => {
  const { getValues } = useFormContext<JudicialCaseFileType>()
  const navigate = useNavigate()
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const clientId = getValues('id')

  const onClickComment = () => {
    navigate(`${paths.cobranza.cobranzaComments(urlIdentifier, ownerFileCase.code)}`)
  }

  const onClickContact = () => {
    navigate(`${paths.cobranza.cobranzaContacts(urlIdentifier, ownerFileCase.code)}`)
  }

  return (
    <Container width="100%" height="48px" display="flex" alignItems="center" gap="10px">
      <Button label="Bitacora" />
      <Button label="Garantías" />
      <Button label="Procesos Conexos" />
      <Button label="Observaciones" />
      <Button label="Estatus Procesal" />
      <Button label="Productos Demandados" />
      <Button
        trailingIcon="ri-discuss-line"
        width="170px"
        label="Comentarios"
        disabled={!clientId}
        onClick={onClickComment}
        permission="P02-02-01"
      />
      <Button
        trailingIcon="ri-customer-service-2-line"
        width="150px"
        label="Contactos"
        disabled={!clientId}
        onClick={onClickContact}
        permission="P02-02-07"
      />
    </Container>
  )
}

export default FileCaseModals
