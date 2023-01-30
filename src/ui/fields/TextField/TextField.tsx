import { createRef, useState } from "react";
import type CSS from "csstype";
import styled, { css } from "styled-components";
import Container from "../../Container";
import HelperText from "../../HelperText";
import type { InputSize } from "../../inputs/Input/Input.interfaces";
import type { HelperFieldProps, LabelFieldProps } from "../interfaces";
import InputText from "../../inputs/InputText";
import InputLabel from "../../Label";

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  LabelFieldProps &
  HelperFieldProps & {
    width?: string;
    leadingIcon?: string;
    trailingIcon?: string;
    suffix?: string;
    prefix?: string;
    size?: InputSize;
    clearInput?: boolean;
    onClickTrailing?: (value: string) => void;
  };

const initialCounter = 0;

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    value,
    width,
    wrap,
    tooltipMessage,
    helperText,
    optional,
    required,
    charactersLimit,
    onClickTrailing,
    ...rest
  } = props;

  const inputRef = createRef<HTMLInputElement>();

  const inputEvent = new Event("change", { bubbles: true });

  const onClear = () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement?.prototype,
      "value"
    )?.set;

    if (inputRef.current && nativeInputValueSetter) {
      nativeInputValueSetter.call(inputRef.current, "");
      inputRef.current.dispatchEvent(inputEvent);
      setCountDown(initialCounter);
    }
  };

  const onClickTrailingIcon = () => {
    onClickTrailing?.(String(value));
  };

  const [countDown, setCountDown] = useState<number>(
    props.defaultValue
      ? props.defaultValue?.toString()?.length
      : value
      ? value?.toString()?.length
      : initialCounter
  );

  const onKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      setCountDown(event.currentTarget.value.length);
    } else {
      setCountDown(initialCounter);
    }
  };

  return (
    <StyledWrapper width={width} gap={label ? "8px" : 0}>
      <InputLabel
        name={rest.name}
        label={label}
        tooltipMessage={tooltipMessage}
        required={required}
        optional={optional}
        disabled={rest.disabled}
      />

      <Container display="flex" flexDirection="column" gap="4px">
        <InputText
          ref={inputRef}
          onClear={onClear}
          onClickTrailingIcon={onClickTrailingIcon}
          onKeyUp={onKeyUpInput}
          value={value}
          numberCharacters={countDown}
          {...rest}
        />

        <HelperText
          wrap={wrap}
          hasError={rest.hasError}
          countDown={countDown}
          disabled={rest.disabled}
          width={width}
          charactersLimit={charactersLimit}
        >
          {helperText}
        </HelperText>
      </Container>
    </StyledWrapper>
  );
};

export default TextField;

const StyledWrapper = styled(Container)<{ width?: CSS.Property.Width }>`
  ${({ theme, width }) => css`
    display: flex;
    flex-direction: column;
    width: ${!!width ? width : "max-content"};
    color: ${theme.colors.Neutral6};
  `}
`;
