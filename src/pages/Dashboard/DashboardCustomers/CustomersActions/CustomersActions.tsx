import styled, { css } from 'styled-components'
import Container from '../../../../ui/Container/Container'
import Button from '../../../../ui/Button'
import Modal from '../../../../ui/Modal'
import useModal from '../../../../shared/hooks/useModal'
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../shared/breakpoints/reponsive'
import ModalAddCustomers from './ModalAddCustomers'

type propsCustomerActions = {
  setLoad: (state: boolean) => void
}

const CustomersActions = ({ setLoad }: propsCustomerActions) => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const handleClickButton = () => {
    setLoad(true)
    showModalAdd()
  }

  const handleClickModal = () => {
    hideModalAdd()
    setLoad(false)
  }

  return (
    <StyledContainer width={greaterThanMobile ? '10%' : '15%'}>
      <Button width="100%" className="actions-button" label="+" size="small" onClick={handleClickButton} />
      <Modal
        id="modal-files"
        title="Agregar Cliente"
        visible={visibleModalAdd}
        onClose={handleClickModal}
        contentOverflowY="auto"
      >
        <ModalAddCustomers />
      </Modal>
    </StyledContainer>
  )
}

export default CustomersActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    .actions-button {
      span {
        font-size: 20px;
      }
    }

    @media ${theme.device.tabletS} {
      .actions-button {
        span {
          font-size: 30px;
        }
      }
    }
    @media ${theme.device.desktopS} {
      .actions-button {
        span {
          font-size: 25px;
        }
      }
    }
  `}
`
