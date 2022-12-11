import React, { useState } from "react";
import styled, { css } from "styled-components";
import Container from "../Container";
import Text from "../Text";
import type { IOption } from "./interfaces";

type SegmentedControlProps<T> = {
  name: string;
  options: Array<IOption>;
  defaultValue?: T;
  callback?: (value: T) => void;
  width?: string;
};

const SegmentedControl = <T extends string>(
  props: SegmentedControlProps<T>
) => {
  const { name, options, callback, defaultValue, width } = props;
  const [checked, setChecked] = useState<T | undefined>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.value as T);
    callback?.(event.target.value as T);
  };

  return (
    <Container display="flex">
      {options.map(({ value, label, disabled }) => {
        return (
          <StyledContSegmentControl
            key={value}
            checked={value === checked}
            disabled={disabled}
            htmlFor={value}
            width={width}
          >
            <input
              type="radio"
              value={value}
              id={value}
              name={name}
              onChange={handleChange}
              checked={value === checked}
              disabled={disabled}
            />
            <StyledSegmentControl>
              <Text.Body size="m" weight="regular">
                {label}
              </Text.Body>
            </StyledSegmentControl>
          </StyledContSegmentControl>
        );
      })}
    </Container>
  );
};

export default SegmentedControl;

const StyledContSegmentControl = styled.label<{
  checked?: boolean;
  disabled?: boolean;
  width?: string;
}>`
  input[type="radio"] {
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  ${({ theme, checked, disabled, width }) => css`
    border: 1px solid ${theme.colors.Neutral4};
    min-width: ${width ? width : "200px"};
    height: 48px;
    background: ${theme.colors.Neutral0};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 12px 8px;
    transition: 0.3s background;
    border-left-width: 0;
    position: relative;
    &:first-child {
      border-left-width: 1px;
    }

    ${checked &&
    css`
      border: 2px solid ${theme.colors.Primary5};
      background: ${theme.colors.Primary1};
      &:first-child {
        border-left-width: 2px;
      }
      span {
        color: ${theme.colors.Primary5};
        font-weight: ${theme.typography.body.m.bold.fontWeight};
        font-family: ${theme.typography.body.m.bold.fontFamily};
      }
    `}

    ${disabled &&
    css`
      border-color: ${theme.colors.Neutral4};
      cursor: not-allowed;
      span {
        color: ${theme.colors.Neutral5};
      }
    `}
  `}
`;

const StyledSegmentControl = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
