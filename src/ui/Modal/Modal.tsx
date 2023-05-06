import type CSS from 'csstype'
import styled, { css } from 'styled-components'
import { usePortal } from '../../shared/hooks/usePortal'
import type { ModalSize } from './interfaces'
import ModalFooter from './ModalFooter'
import ModalHeader from './ModalHeader'
import ReactPortal from '../ReactPortal'
import Container from '../Container'

export type ModalProps = {
  id: string
  title?: string
  visible?: boolean
  className?: string
  size?: ModalSize
  minHeight?: string
  onClose?: () => void
  onBack?: () => void
  clickOutsideToClose?: () => void
  footer?: React.ReactNode
  children?: React.ReactNode
  contentOverflowY?: CSS.Property.OverflowY
  withPortal?: boolean
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    id,
    children,
    className,
    clickOutsideToClose,
    footer,
    onBack,
    onClose,
    title,
    contentOverflowY,
    minHeight,
    size = 'large',
    visible = false,
    withPortal = true,
  } = props

  const headerProps = { onBack, onClose, title }
  const portal = usePortal(`${id}-portal`)

  return (
    <ReactPortal element={withPortal ? portal : undefined}>
      {visible && (
        <StyledBackdrop
          id={id}
          onClick={clickOutsideToClose}
          className={`modal-overlay ${className}`}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <StyledModalBox
            display="flex"
            flexDirection="column"
            width="100%"
            className="modal-box"
            size={size}
            onClick={(event) => event.stopPropagation()}
            minHeight={minHeight}
          >
            <ModalHeader {...headerProps} />

            <StyledContent display="flex" contentOverflowY={contentOverflowY}>
              {children}
            </StyledContent>

            {!!footer && <ModalFooter>{footer}</ModalFooter>}
          </StyledModalBox>
        </StyledBackdrop>
      )}
    </ReactPortal>
  )
}

const StyledBackdrop = styled(Container)`
  ${({ theme }) => css`
    &.modal-overlay {
      top: 0;
      z-index: ${theme.zIndex.modal};
      width: 100%;
      height: 100%;
      position: absolute;
      background: ${theme.colors.TransparentDark};
    }
  `}
`

const StyledModalBox = styled(Container)<{ size?: ModalSize }>`
  ${({ theme, size }) => css`
    &.modal-box {
      background: ${theme.colors.Neutral0};
      position: absolute;
      border-radius: 12px 12px 0 0;
      box-shadow: ${theme.shadows.elevationHigh};
      width: 100%;
      top: 48px;
      height: calc(100vh - 48px);

      ${size === 'small' &&
      css`
        top: unset;
        bottom: 0;
        height: auto;
      `}

      @media ${theme.device.tabletS} {
        top: auto;
        height: 80vh;
        max-height: 80vh;

        bottom: auto;
        border-radius: 12px;
        max-width: calc(100vw - 48px);

        ${size === 'small' &&
        css`
          max-width: 452px;
          height: auto;
          max-height: auto;
        `}
      }

      @media ${theme.device.tabletL} {
        max-width: 650px;

        ${size === 'small' &&
        css`
          max-width: 452px;
        `}
      }
    }
  `}
`

const StyledContent = styled(Container)<{
  contentOverflowY?: CSS.Property.OverflowY
}>`
  flex-grow: 1;
  ${({ contentOverflowY }) =>
    !!contentOverflowY &&
    css`
      overflow-y: ${contentOverflowY};
    `}
`

export default Modal
