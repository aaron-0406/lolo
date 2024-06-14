import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import { useLocation, useNavigate } from 'react-router-dom'
import paths from 'shared/routes/paths'
import styled, { css } from 'styled-components'
import JudicialCaseFilesScanQrModal from './Modals/JudicialCaseFilesScanQrModal/JudicialCaseFilesScanQrModal'

const JudicialFileCasesActions = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const {
    hideModal: hideScanQrModal,
    showModal: showScanQrModal,
    visible: isVisebleScanQrModal,
  } = useModal()
  const {
    client: { customer },
    bank: { selectedBank, setSelectedBank },
  } = useLoloContext()

  const {
    clearAllFilters,
    filterSearch: { getSearchFilters, setSearchFilters },
  } = useFiltersContext()

  const options: Array<SelectItemType> = customer.customerBanks.map((bank) => {
    return {
      key: String(bank.id),
      label: bank.name,
    }
  })

  const onChangeBank = (key: string) => {
    clearAllFilters()

    const customerBank = customer.customerBanks.find((customerBank) => String(customerBank.id) === key)

    setSelectedBank({
      idBank: key,
      idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id),
    })
  }

  const searchFilter = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchFilters({ url: currentPath, opts: { ...searchFilter, filter: value } })
  }

  const handleClickCaseFile = () => {
    navigate(`${paths.judicial.detallesExpediente(customer.urlIdentifier, '000000000')}`)
  }

  return (
    <StyledContainer width="100%" display="flex" flexDirection="column" alignItems="center" padding="20px" gap="20px">
      <Container className="actions__select" width="100%">
        <Select
          width="100%"
          label="Seleccionar banco:"
          value={selectedBank.idBank}
          options={options}
          onChange={onChangeBank}
        />
      </Container>
      <Container className="actions__textfield" width="100%" display="flex" alignItems="end" gap="10px">
        <TextField
          onChange={onChangeSearch}
          width="100%"
          label="Buscar expediente:"
          placeholder="Buscar con nombre del cliente"
          value={searchFilter.filter}
          clearInput
        />
        <Button
          width="100px"
          shape="round"
          trailingIcon="ri-qr-code-line"
          permission="P13-01"
          messageTooltip="Escanea código QR"
          disabled={!selectedBank.idBank}
          onClick={showScanQrModal}
        />
        <Button
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          onClick={handleClickCaseFile}
          disabled={!selectedBank.idBank}
          permission="P13-02"
          messageTooltip="Agregar expediente"
        />
      </Container>
      {isVisebleScanQrModal ? (
        <JudicialCaseFilesScanQrModal isVisible={isVisebleScanQrModal} onClose={hideScanQrModal} />
      ) : null}
    </StyledContainer>
  )
}

export default JudicialFileCasesActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    .btn-excel {
      background-color: ${theme.colors.Success5};
      border: none;
    }
    @media ${theme.device.tabletS} {
      flex-direction: row;

      .actions__textfield .actions_select {
        width: 50%;
      }
    }

    @media ${theme.device.tabletL} {
      .actions__textfield {
        width: 60%;
      }

      .actions__select {
        width: 40%;
      }
    }

    @media ${theme.device.desktopS} {
      .actions__textfield {
        width: 70%;
      }

      .actions__select {
        width: 30%;
      }
    }
  `}
`
