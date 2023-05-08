import styled, { css } from 'styled-components'
import Container from '../../../../../ui/Container/Container'
import Button from '../../../../../ui/Button'
import Modal from '../../../../../ui/Modal'
import ModalAddCustomers from './ModalAddCustomers'
import useModal from '../../../../../shared/hooks/useModal'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../shared/breakpoints/reponsive'

const CustomersActionsModal = () => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  return (
    <StyledContainer width={greaterThanMobile ? "10%" : "15%"}>
      <Button width="100%" className="actions-button" label="+" size="small" onClick={showModalAdd} />
      <Modal
        id="modal-files"
        title="Agregar Cliente"
        visible={visibleModalAdd}
        onClose={hideModalAdd}
        contentOverflowY="auto"
      >
        <ModalAddCustomers />
      </Modal>
    </StyledContainer>
  )
}

export default CustomersActionsModal

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

