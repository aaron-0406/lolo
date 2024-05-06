import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useLoloContext } from '@/contexts/LoloProvider'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import Button from '@/ui/Button/Button'
import Modal from '@/ui/Modal'
import useModal from '@/hooks/useModal'
import ModalManagementExcel from './ModalManagementExcel/ModalManagementExcel'
import paths from 'shared/routes/paths'
import { useFiltersContext } from '@/contexts/FiltersProvider'

const CustomersActions = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const {
    filterSearch: { getSearchFilters, setSearchFilters },
  } = useFiltersContext()

  const {
    visible: visibleModalManagementExcel,
    showModal: showModalManagementExcel,
    hideModal: hideModalManagementExcel,
  } = useModal()

  const navigate = useNavigate()
  const searchFilter = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchFilters({ url: currentPath, opts: { ...searchFilter, filter: value } })
  }

  const handleClickAddClient = () => {
    navigate(`${paths.cobranza.cobranza(customer.urlIdentifier, '000000000')}`)
  }

  return (
    <StyledContainer width="100%" display="flex" flexDirection="row" alignItems="center" padding="20px" gap="20px">
      <TextField
        onChange={onChangeSearch}
        width="100%"
        label="Buscar cliente:"
        placeholder="Buscar cliente por nombre"
        value={searchFilter.filter}
        clearInput
      />

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
  `}
`
