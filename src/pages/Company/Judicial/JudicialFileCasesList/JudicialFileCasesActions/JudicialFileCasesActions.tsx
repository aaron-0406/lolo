import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useLoloContext } from '@/contexts/LoloProvider'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import TextField from '@/ui/fields/TextField'
import { useLocation, useNavigate } from 'react-router-dom'
import paths from 'shared/routes/paths'
import styled, { css } from 'styled-components'

const JudicialFileCasesActions = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const {
    client: { customer },
    bank: { selectedBank },
  } = useLoloContext()

  const {
    filterSearch: { getSearchFilters, setSearchFilters },
  } = useFiltersContext()

  const searchFilter = getSearchFilters(currentPath)?.opts ?? { filter: '', limit: 50, page: 1 }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchFilters({ url: currentPath, opts: { ...searchFilter, filter: value } })
  }

  const handleClickCaseFile = () => {
    navigate(`${paths.judicial.detallesExpediente(customer.urlIdentifier, '000000000')}`)
  }

  return (
    <StyledContainer width="100%" display="flex" flexDirection="row" alignItems="center" padding="20px" gap="20px">
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
        trailingIcon="ri-add-fill"
        onClick={handleClickCaseFile}
        disabled={!selectedBank.idBank}
        permission="P13-02"
        messageTooltip="Agregar expediente"
      />
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
  `}
`
