import styled, { css } from 'styled-components'
import Icon from '@/ui/Icon'
import Button from '@/ui/Button'
import type { FloatingContainerType } from '@/ui/FloatingContainer/interfaces'

const FloatingContainer = ({ numberItems, buttons, onClose }: FloatingContainerType) => {
  const message = numberItems === 1 ? '1 seleccionado' : `${numberItems} seleccionados`
  return (
    <StyledNotification>
      <MessageContainer>{message}</MessageContainer>
      <ButtonsContainer>
        {buttons.map((button, index) => (
          <Buttons key={index} onClick={button.onClick} label={button.label} display={button.type || 'default'} />
        ))}
      </ButtonsContainer>
      <CloseButton
        onClick={() => {
          onClose()
        }}
      >
        <Icon remixClass="ri-close-line" size={24} />
      </CloseButton>
    </StyledNotification>
  )
}

export default FloatingContainer

const StyledNotification = styled.div`
  ${({ theme }) => css`
    position: relative;
    left: 50%;
    bottom: 70px;
    transform: translateX(-50%);
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 5px 20px;
    background-color: ${theme.colors.Neutral4};
    box-shadow: ${theme.shadows.elevationHigh};
    border-radius: 8px;
    height: 60px;
    z-index: 1000;

    @media ${theme.device.tabletS} {
      width: 60%;
    }
  `}
`

const MessageContainer = styled.p`
  font-size: 16px;
  color: black;
  min-width: 30px;
  width: 121px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
`

const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-left: 5px;
    justify-content: space-around;
    width: 60%;
    min-width: 140px;
    gap: 8px;
    overflow-x: auto;

    @media ${theme.device.tabletS} {
      min-width: 180px;
    }
  `}
`

const Buttons = styled(Button)`
  border-radius: 4px;
  height: 30px;
  width: 120px;
  padding: 0px 8px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  left: 2%;

  i {
    color: #000;
  }
`
