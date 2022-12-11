import React from "react";
import type CSS from "csstype";
import styled, { css } from "styled-components";

type RadioButtonContainerProps = {
  flexDirection?: CSS.Property.FlexDirection;
  justifyContent?: CSS.Property.JustifyContent;
};

export type RadioButtonProps = React.HTMLProps<HTMLInputElement> &
  RadioButtonContainerProps & {
    containerClassName?: string;
  };

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const {
    children,
    flexDirection,
    justifyContent,
    containerClassName,
    ...rest
  } = props;

  return (
    <StyledRadioButton
      className={`${containerClassName} radio-button-container`}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
    >
      <div className="input-container">
        <input {...rest} type="radio" />
      </div>
      {children}
    </StyledRadioButton>
  );
};

export default RadioButton;

/**
 * Styled RadioButton Component
 * Do not export, use RadioButton
 */
const StyledRadioButton = styled.label<RadioButtonContainerProps>`
  ${({ theme, flexDirection, justifyContent }) => css`
    &.radio-button-container {
      display: flex;
      align-items: center;
      flex-direction: ${flexDirection};
      justify-content: ${justifyContent};
      gap: 4px;
    }

    .input-container {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      display: block;
      margin: 0;
      box-sizing: border-box;
    }

    input::after {
      content: "";
      display: block;
      border-radius: 50%;
      border: 2px solid ${theme.colors.Neutral4};
      box-sizing: border-box;
      width: 20px;
      height: 20px;
    }

    input:hover:not(:disabled) {
      ::after {
        border-color: ${theme.colors.Primary5};
      }
    }

    input:active {
      ::after {
        background-color: ${theme.colors.Primary2};
      }
    }

    input:disabled {
      cursor: not-allowed;

      ::after {
        background-color: ${theme.colors.Neutral3};
      }
    }

    input:checked {
      ::after {
        border: 6px solid ${theme.colors.Primary5};
      }

      :hover {
        ::after {
          border-color: ${theme.colors.Primary4};
          background-color: ${theme.colors.Neutral0};
        }
      }

      :active {
        ::after {
          border-color: ${theme.colors.Primary3};
        }
      }

      :disabled {
        ::after {
          border-color: ${theme.colors.Neutral4};
          background-color: ${theme.colors.Neutral0};
        }
      }
    }
  `}
`;
