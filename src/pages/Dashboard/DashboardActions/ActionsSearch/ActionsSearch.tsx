import { Dispatch, FC, useState } from 'react'
import TextField from '../../../../ui/fields/TextField/TextField'
import Container from '../../../../ui/Container/Container'
import Select from '../../../../ui/Select/Select'
import Button from '../../../../ui/Button/Button'
import Modal from '../../../../ui/Modal/Modal'
import { useDashContext } from '../../../../shared/contexts/DashProvider'
import { SelectItemType } from '../../../../ui/Select/interfaces'
import Label from '../../../../ui/Label/Label'
import { Opts } from '../../../../ui/Pagination/interfaces'
import useModal from '../../../../shared/hooks/useModal'
import ActionModal from '../ActionsModal/ActionModal'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'

type SelectedBankType = {
  idCHB: string
}

type ActionsTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  setLoadingGlobal: (state: boolean) => void
}

const ActionsSearch: FC<ActionsTableProps> = ({ opts, setOpts, setLoadingGlobal }) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const [selectedBank, setSelectedBank] = useState<SelectedBankType>()

  const options: Array<SelectItemType> = selectedCustomer.customerBanks.map((customerBank) => {
    return {
      key: String(customerBank.CUSTOMER_HAS_BANK.id),
      label: customerBank.name,
    }
  })

  const greaterThanMobile = useMediaQuery(device.tabletS)
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onChangeBank = (key: string) => {
    setSelectedBank({
      idCHB: key,
    })
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setOpts({ ...opts, filter: '', page: 1 })
      setLoadingGlobal(true)
      return
    }

    if (value.length < 3) return

    setOpts({ ...opts, filter: value.trim(), page: 1 })
    setLoadingGlobal(true)
  }

  const handleClickButton = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px" justify-content="space-around" margin='20px 0' gap='20px'>
      <Container width="calc(100% - 60px)" display="flex" justify-content="space-around" >
        <Container display={greaterThanMobile ? 'flex' : 'none'} padding="0 10px 0 0">
          <Label label="Buscar:" />
        </Container>
        <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar cliente por nombre" />
      </Container>
      <Select
        width="calc(100% - 700px)"
        placeholder="Selecciona un banco"
        value={String(selectedBank?.idCHB)}
        options={options}
        onChange={onChangeBank}
      />
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={handleClickButton} />
      {/* <ActionModal visible={visibleModalAdd} onClose={onCloseModal} setLoadingGlobal={setLoadingGlobal} /> */}
    </Container>
  )
}

export default ActionsSearch

// const StyledContainer = styled(Container)`
//   ${({ theme }) => css`
//     @media ${theme.device.tabletS} {
//       flex-direction: row;

//       .actions__textfield .actions_select {
//         width: 50%;
//       }
//     }

//     @media ${theme.device.tabletL} {
//       .actions__textfield {
//         width: 60%;
//       }

//       .actions__select {
//         width: 40%;
//       }
//     }

//     @media ${theme.device.desktopS} {
//       .actions__textfield {
//         width: 70%;
//       }

//       .actions__select {
//         width: 30%;
//       }
//     }
//   `}
// `
