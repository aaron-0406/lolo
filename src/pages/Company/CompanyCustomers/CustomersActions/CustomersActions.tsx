import React, { Dispatch, FC } from 'react'
import styled, { css } from 'styled-components'
import { useLoloContext } from '../../../../shared/contexts/LoloProvider'
import Container from '../../../../ui/Container'
import TextField from '../../../../ui/fields/TextField'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Select from '../../../../ui/Select'
import { SelectItemType } from '../../../../ui/Select/interfaces'

type CustomerActionsProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const CustomersActions: FC<CustomerActionsProps> = ({ opts, setOpts }) => {
  const {
    client: { customer },
    bank: { selectedBank, setSelectedBank },
  } = useLoloContext()

  const options: Array<SelectItemType> = customer.customerBanks.map((bank) => {
    return {
      key: String(bank.id),
      label: bank.name,
    }
  })

  const onChangeBank = (key: string) => {
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

  return (
    <StyledContainer width="100%" display="flex" flexDirection="column" alignItems="center" padding="20px" gap="20px">
      <Container className="actions__textfield" width="100%">
        <TextField
          onChange={onChangeSearch}
          width="100%"
          label="Buscar cliente:"
          placeholder="Buscar cliente por nombre"
        />
      </Container>

      <Container className="actions__select" width="100%">
        <Select
          width="100%"
          label="Seleccionar banco:"
          value={selectedBank.idBank}
          options={options}
          onChange={onChangeBank}
        />
      </Container>
    </StyledContainer>
  )
}

export default CustomersActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
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
