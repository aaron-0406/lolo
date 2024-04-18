import { useFiltersContext } from '@/contexts/FiltersProvider'
import { useLoloContext } from '@/contexts/LoloProvider'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { Opts } from '@/ui/Pagination/interfaces'
import Select from '@/ui/Select'
import { SelectItemType } from '@/ui/Select/interfaces'
import TextField from '@/ui/fields/TextField'
import { Dispatch, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import paths from 'shared/routes/paths'
import styled, { css } from 'styled-components'

type JudicialFileCasesActionsProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const JudicialFileCasesActions: FC<JudicialFileCasesActionsProps> = ({ opts, setOpts }) => {
  const navigate = useNavigate()

  const {
    client: { customer },
    bank: { selectedBank, setSelectedBank },
  } = useLoloContext()

  const { clearAllFilters } = useFiltersContext()

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

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') return setOpts({ ...opts, filter: '', page: 1 })
    if (value.length < 3) return
    return setOpts({ ...opts, filter: value.trim(), page: 1 })
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
      <Container className="actions__textfield" width="100%" display="flex" alignItems="center" gap="10px">
        <TextField
          onChange={onChangeSearch}
          width="100%"
          label="Buscar expediente:"
          placeholder="Buscar con nombre del cliente"
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
