import { Dispatch, FC, useState } from 'react'
import TextField from '../../../../ui/fields/TextField/TextField'
import Container from '../../../../ui/Container/Container'
import Select from '../../../../ui/Select/Select'
import Button from '../../../../ui/Button/Button'
import Modal from '../../../../ui/Modal/Modal'
import styled, { css } from 'styled-components'
import { useDashContext } from '../../../../shared/contexts/DashProvider'
import { SelectItemType } from '../../../../ui/Select/interfaces'
import { BankType } from '../../../../shared/types/bank.type'

const ActionsMenu: FC = () => {
  const {
    dashCustomer: { selectedCustomer },
    // client: { customer },
    // bank: { selectedBank, setSelectedBank },
  } = useDashContext()

  const options: Array<SelectItemType> = selectedCustomer.customerBanks.map((bank) => {
    return {
      key: String(bank.id),
      label: bank.name,
    }
  })
  type SelectedBankType = {
    idBank: string
    idCHB: string
  }

  const [selectedBank, setSelectedBank] = useState<SelectedBankType>(); 
  console.log(selectedBank);
 
  const onChangeBank = (key: string) => {
    const customerBank = selectedCustomer.customerBanks.find((customerBank) => String(customerBank.id) === (key))
    
    setSelectedBank({
      idBank: key,
      idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id);
      // idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id),
    })
  }
//   const onChangeBank = (key: number) => {
//     const customerBank = selectedCustomer.customerBanks.find((customerBank) => (customerBank.id) === key)

//     setSelectedBank({
//       id: key,
//       ,
//     //   idCHB: String(customerBank?.CUSTOMER_HAS_BANK.id),
//     })
//   }
  return (
    <StyledContainer width="100%" display="flex" flexDirection="column" alignItems="center" padding="20px" gap="20px">
      <Container className="actions__textfield" width="100%" display="flex" alignItems="center" gap="10px">
        <TextField width="100%" label="Buscar acción:" placeholder="Buscar acción por nombre" />

        <Button width="100px" shape="round" trailingIcon="ri-add-fill" />
      </Container>

      <Container className="actions__select" width="100%">
        <Select width="100%" label="Seleccionar banco:" value={String(selectedBank.id)} options={options} onChange={onChangeBank} />
      </Container>

      <Modal
        id="modal-eport-excel"
        title="EXPORTAR EXCEL DE GESTIÓN"
        contentOverflowY="auto"
        size="small"
        minHeight="360px"
      ></Modal>
    </StyledContainer>
  )
}

export default ActionsMenu

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
