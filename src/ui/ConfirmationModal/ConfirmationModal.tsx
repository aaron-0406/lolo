import type { IThemeColor } from "styled-components";
import styled, { css } from "styled-components";
import ReactPortal from "../ReactPortal";
import { usePortal } from "../../shared/hooks/usePortal";
import type { ConfirmationModalType } from "./interfaces";
import Container from "../Container";
import Icon from "../Icon";
import Text from "../Text";

const actionsConfig: Record<
  ConfirmationModalType,
  { iconClass: string; color: keyof IThemeColor }
> = {
  success: {
    iconClass: "ri-checkbox-circle-line",
    color: "Success5",
  },
  error: {
    iconClass: "ri-close-circle-line",
    color: "Danger5",
  },
  warning: {
    iconClass: "ri-error-warning-line",
    color: "Warning4",
  },
  info: {
    iconClass: "ri-error-warning-line",
    color: "Primary5",
  },
};

export type ModalProps = {
  id: string;
  visible?: boolean;
  className?: string;
  onClose?: () => void;
  clickOutsideToClose?: () => void;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  withPortal?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ConfirmationModalType;
};

const ConfirmationModal: React.FC<ModalProps> = (props) => {
  const {
    id,
    body,
    className,
    clickOutsideToClose,
    footer,
    visible = false,
    withPortal = true,
    title,
    description,
    type,
  } = props;

  const portal = usePortal(`${id}-portal`);

  const config = type && actionsConfig[type];

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
            className="modal-box"
            onClick={(event) => event.stopPropagation()}
          >
            <StyledContent display="flex" padding="24px 24px 0">
              {!!body
                ? body
                : !!config && (
                    <Container
                      key="1"
                      display="flex"
                      flexDirection="row"
                      gap="16px"
                    >
                      <Icon
                        remixClass={config.iconClass}
                        color={config.color}
                      />
                      <Container
                        display="flex"
                        flexDirection="column"
                        gap="16px"
                      >
                        <Text.Body size="m" weight="bold">
                          {title}
                        </Text.Body>

                        <Text.Body size="m" weight="regular">
                          {description}
                        </Text.Body>
                      </Container>
                    </Container>
                  )}
            </StyledContent>

            <Container
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding="24px"
              gap="8px"
            >
              {footer}
            </Container>
          </StyledModalBox>
        </StyledBackdrop>
      )}
    </ReactPortal>
  );
};

const StyledBackdrop = styled(Container)`
  ${({ theme }) => css`
    &.modal-overlay {
      top: 0;
      z-index: ${theme.zIndex.modal};
      width: 100vw;
      height: 100%;
      position: absolute;
      background: ${theme.colors.TransparentDark};
    }
  `}
`;

const StyledModalBox = styled(Container)`
  ${({ theme }) => css`
    &.modal-box {
      background: ${theme.colors.Neutral0};
      position: absolute;
      width: calc(100vw - 32px);
      border-radius: 8px;
      box-shadow: ${theme.shadows.elevationHigh};
      min-height: 100px;

      @media ${theme.device.tabletS} {
        max-width: 452px;
      }
    }
  `}
`;

const StyledContent = styled(Container)`
  flex-grow: 1;
`;

export default ConfirmationModal;
