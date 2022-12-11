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
      background-color: ${theme.colors.primary};
      color: ${theme.colors["ghost-white"]};

      :hover {
        background-color: ${theme.colors["queen-blue"]};
      }

      :active {
        background-color: ${theme.colors["blue-yonder"]};
      }
    `}

    ${hierarchy === "secondary" &&
    css`
      border: 2px solid ${theme.colors.primary};
      color: ${theme.colors.primary};

      :hover {
        color: ${theme.colors["blue-yonder"]};
        border: 2px solid ${theme.colors["blue-yonder"]};
      }

      :active {
        color: ${theme.colors["sapce-cadet"]};
        border: 2px solid ${theme.colors["sapce-cadet"]};
      }
    `}

    ${hierarchy === "tertiary" &&
    css`
      color: ${theme.colors.primary};

      :hover {
        background-color: ${theme.colors.neutral1};
      }

      :active {
        background-color: ${theme.colors.neutral2};
      }
    `}
  `}
`;
