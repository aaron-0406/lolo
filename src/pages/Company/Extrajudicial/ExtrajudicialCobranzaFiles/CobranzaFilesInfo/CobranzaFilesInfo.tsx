import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import CobranzaFilesModal from '../Modals/CobranzaFilesModal'
import Text from '@/ui/Text'
import TextField from '@/ui/fields/TextField'
import { useLocation } from 'react-router-dom'
import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'

type CobranzaFilesInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaFilesInfo = ({ name, clientId }: CobranzaFilesInfoProps) => {
  const code = useParams().code ?? ''
  const location = useLocation()
  const currentPath = location.pathname
  const {
    client: { customer },
  } = useLoloContext()
  const {
    filterSearch: { getSearchFilters, setSearchFilters },
  } = useFiltersContext()
  const greaterThanTabletL = useMediaQuery(device.tabletL)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }

  const routers: LinkType[] = [
    {
      link: paths.cobranza.clientes(customer.urlIdentifier),
      name: 'Clientes',
    },
    {
      link: paths.cobranza.cobranza(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.cobranza.cobranzaFiles(customer.urlIdentifier, code),
      name: 'Archivos',
    },
  ]

  const searchFilter = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchFilters({ url: currentPath, opts: { ...searchFilter, filter: value } })
  }

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Container display="flex" flexDirection="column" gap="15px" width="100%">
        <Container
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={greaterThanTabletL ? 'row' : 'column'}
        >
          <Breadcrumbs routes={routers} />
          <TextField
            width="100%"
            onChange={onChangeSearch}
            placeholder="Buscar con nombre del documento"
            value={searchFilter.filter}
            clearInput
          />
        </Container>

        <Container
          display="flex"
          className="flex-row"
          width="100%"
          margin="0px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Container
            padding="10px"
            width="fit-content"
            margin="0px"
            display="flex"
            flexDirection="row"
            backgroundColor="#eff0f6ff"
          >
            <Text.Body size="m" weight="bold">
              {name ?? '-'}
            </Text.Body>
          </Container>
          <Button
            onClick={onShowModal}
            disabled={!name}
            width="100px"
            shape="round"
            trailingIcon="ri-add-fill"
            permission="P02-02-03-02"
            messageTooltip="Agregar archivo"
          />
        </Container>
      </Container>

      <Container>
        {clientId && (
          <CobranzaFilesModal
            visible={visibleModalAdd}
            onClose={onCloseModal}
            clientId={clientId}
            clientCode={Number(code)}
          />
        )}
      </Container>
    </Container>
  )
}

export default CobranzaFilesInfo
