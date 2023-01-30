import styled, { css } from "styled-components";
import Container from "../../Container";
import Icon from "../../Icon";
import TextArea from "../TextArea";
import type { TextAreaProps } from "../TextArea";

type InputTextAreaProps = TextAreaProps & {
  tooltipMessage?: string;
  optional?: boolean;
  hasError?: boolean;
  width?: string;
};

const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  const { disabled, width, hasError = false, rows, ...rest } = props;

  return (
    <StyledInputTextAreaWrapper
      width={width}
      display="flex"
      position="relative"
    >
      <StyledTextArea
        disabled={disabled}
        $hasError={hasError}
        $width={width}
        rows={rows}
        {...rest}
      />

      {!disabled && hasError && (
        <Icon
          size={20}
          containerClassName="error__icon"
          remixClass="ri-error-warning-line"
          color="Danger5"
        />
      )}
    </StyledInputTextAreaWrapper>
  );
};

export default InputTextArea;

const StyledTextArea = styled(TextArea)<{
  $hasError?: boolean;
  $width?: string;
}>`
  ${({ theme, $hasError, $width }) =>
    css`
      border-radius: 8px;
      padding: 4px 16px;
      background-color: ${theme.colors.Neutral0};
      border: 2px solid ${theme.colors.Neutral4};

      :hover {
        border: 2px solid ${theme.colors.Neutral5};
      }

      :focus-within {
        border: 2px solid ${theme.colors.Primary5};
      }

      ${$width &&
      css`
        width: ${$width};
      `}

      ${$hasError &&
      css`
        background: ${theme.colors.Danger1};
        border: 2px solid ${theme.colors.Danger5};
        padding-right: 50px;

        :hover,
        :focus-within {
          border: 2px solid ${theme.colors.Danger5};
        }
      `}

      :disabled {
        background: ${theme.colors.Neutral3};
        border: 2px solid ${theme.colors.Neutral4};

        :hover,
        :focus-within {
          border: 2px solid ${theme.colors.Neutral4};
        }
      }
    `}
`;

const StyledInputTextAreaWrapper = styled(Container)`
  .error__icon {
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 18px;
  }
`;
