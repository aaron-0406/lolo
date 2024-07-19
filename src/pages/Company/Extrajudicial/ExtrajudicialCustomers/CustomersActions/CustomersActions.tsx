import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import Button from '@/ui/Button/Button'
import Modal from '@/ui/Modal'
import useModal from '@/hooks/useModal'
import ModalManagementExcel from './ModalManagementExcel/ModalManagementExcel'
import paths from 'shared/routes/paths'
import { useFiltersContext } from '@/contexts/FiltersProvider'

const CustomersActions = ({
  archived,
  onChangeArchivedState,
}: {
  archived: boolean
  onChangeArchivedState: () => void
}) => {
  const location = useLocation()
  const currentPath = location.pathname

  const {
    client: { customer },
    bank: { selectedBank, setSelectedBank },
  } = useLoloContext()

  const {
    clearAllFilters,
    filterSearch: { getSearchFilters, setSearchFilters },
  } = useFiltersContext()

  const {
    visible: visibleModalManagementExcel,
    showModal: showModalManagementExcel,
    hideModal: hideModalManagementExcel,
  } = useModal()

  const navigate = useNavigate()

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

  const handleClickAddClient = () => {
    navigate(`${paths.cobranza.cobranza(customer.urlIdentifier, '000000000')}`)
  }

  return (
    <StyledContainer
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px 20px 0px 20px"
      gap="20px"
    >
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
          label="Buscar cliente:"
          placeholder="Buscar cliente por nombre"
          value={searchFilter.filter}
          clearInput
        />

        {!archived ? (
          <Button
            disabled={!selectedBank.idBank}
            size="small"
            label="Ver clientes archivados"
            trailingIcon="ri-archive-line"
            onClick={onChangeArchivedState}
          />
        ) : (
          <Button
            disabled={!selectedBank.idBank}
            size="small"
            label="Ver clientes activos"
            trailingIcon="ri-user-fill"
            onClick={onChangeArchivedState}
          />
        )}

        <Button
          className="btn-excel"
          width="100px"
          shape="round"
          trailingIcon="ri-file-excel-line"
          onClick={showModalManagementExcel}
          disabled={!selectedBank.idBank}
          messageTooltip="Exportar excel"
          permission="P02-01"
        />

        <Button
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          onClick={handleClickAddClient}
          disabled={!selectedBank.idBank}
          permission="P02-03"
          messageTooltip="Agregar cliente"
        />
      </Container>

      <Modal
        id="modal-eport-excel"
        title="EXPORTAR EXCEL DE GESTIÓN"
        visible={visibleModalManagementExcel}
        onClose={hideModalManagementExcel}
        contentOverflowY="auto"
        size="small"
        minHeight="360px"
      >
        <ModalManagementExcel />
      </Modal>
    </StyledContainer>
  )
}

export default CustomersActions

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
