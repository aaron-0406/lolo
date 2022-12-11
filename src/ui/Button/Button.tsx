import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { HierarchyType } from "./Button.interfaces";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: string;
  hierarchy?: HierarchyType;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { width, title, hierarchy = "primary", ...rest } = props;

  return (
    <StyledButton width={width} hierarchy={hierarchy} {...rest}>
      {title}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  width?: string;
  hierarchy?: HierarchyType;
}>`
  ${({ theme, width, hierarchy }) => css`
    height: 48px;
    border-radius: 10px;
    font-family: "DM Sans", sans-serif;

    ${width &&
    css`
      width: ${width};
    `}

    ${hierarchy === "primary" &&
    css`
      background-color: ${theme.colors.Primary5};
      color: ${theme.colors.Neutral0};

      :hover {
        background-color: ${theme.colors.Primary4};
      }

      :active {
        background-color: ${theme.colors.Primary6};
      }
    `}

    ${hierarchy === "secondary" &&
    css`
      border: 2px solid ${theme.colors.Primary5};
      color: ${theme.colors.Primary5};

      :hover {
        color: ${theme.colors.Primary4};
        border: 2px solid ${theme.colors.Primary4};
      }

      :active {
        color: ${theme.colors.Primary6};
        border: 2px solid ${theme.colors.Primary6};
      }
    `}

    ${hierarchy === "tertiary" &&
    css`
      color: ${theme.colors.Primary5};

      :hover {
        background-color: ${theme.colors.Neutral2};
      }

      :active {
        background-color: ${theme.colors.Neutral3};
      }
    `}
  `}
`;
