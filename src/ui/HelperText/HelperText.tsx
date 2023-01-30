import React from "react";
import styled, { css } from "styled-components";
import Container from "../Container";
import Text from "../Text";

const INITIAL_COUNTER = 0;

/**
 * HelperText Component
 * @prop {boolean} wrap Auto wrap line, when horizontal effective
 * @prop {string} width Can be set width of the helper text
 * @prop {boolean} hasError Can be set to true if the status is error
 * @prop {number} countDown Whether show text count
 * @prop {number} charactersLimit Set the limit number of characters that can be entered in the input
 * @prop {string} children Can be set text of the helper text
 * @prop {boolean} disabled Disabled state of helper text
 */
export type HelperTextProps = {
  wrap?: boolean;
  width?: string;
  hasError?: boolean;
  countDown?: number;
  charactersLimit?: number;
  children?: string;
  disabled?: boolean;
};

const HelperText: React.FC<HelperTextProps> = ({
  width,
  children,
  disabled,
  charactersLimit,
  countDown = INITIAL_COUNTER,
  hasError = false,
  wrap = false,
}) => {
  return children || charactersLimit ? (
    <Container
      display="flex"
      flexDirection="column"
      position="relative"
      width={width}
    >
      <StyledHelperTextWrapper
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        position="absolute"
        width="100%"
        $hasError={hasError}
        $wrap={wrap}
        $disabled={disabled}
        className="helper__text"
      >
        <Text.Body size="m" weight="regular" className="body__text">
          {children}
        </Text.Body>

        {!!charactersLimit && (
          <Text.Body size="m" weight="regular" className="counter">
            {`${countDown}/${charactersLimit}`}
          </Text.Body>
        )}
      </StyledHelperTextWrapper>
    </Container>
  ) : null;
};

export default HelperText;

interface StyledHelperTextWrapperProps {
  $hasError: boolean;
  $wrap?: boolean;
  $disabled?: boolean;
}

/**
 * Styled HelperText Wrapper Text Component
 * Do not export, use HelperText
 */
export const StyledHelperTextWrapper = styled(
  Container
)<StyledHelperTextWrapperProps>`
  ${({ theme, $wrap, $disabled, $hasError }) => css`
    white-space: ${$wrap ? "normal" : "nowrap"};

    .body__text,
    .counter {
      color: ${theme.colors.Neutral6};
    }

    ${$hasError &&
    css`
      .body__text {
        color: ${theme.colors.Danger5};
      }
    `};

    ${$disabled &&
    css`
      .body__text,
      .counter {
        color: ${theme.colors.Neutral5};
      }
    `};
  `}
`;
