import get from "lodash/get";
import type { IRegular, IThemeColor } from "styled-components";
import styled, { css, useTheme } from "styled-components";
import type {
  ITitleText,
  IBodyText,
  INumberText,
  SpanProps,
} from "./interfaces";

type StyledTextProps = IRegular & {
  color?: keyof TextColor;
  ellipsis?: boolean;
};

/**
 * Styled Text Component
 * Do not export, use Title, Body, Number instead
 */
const StyledText = styled.span<StyledTextProps>`
  ${({ ellipsis, color = "Neutral9", ...props }) => css`
    font-size: ${props.fontSize}px;
    font-family: ${props.fontFamily};
    font-weight: ${props.fontWeight};
    letter-spacing: ${props.letterSpacing}px;
    line-height: ${props.lineHeight}px;
    color: ${props.theme.colors[`${color}`]};

    ${ellipsis &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
  `}
`;

type TextTypeProps = ITitleText | IBodyText | INumberText;

/**
 * Text Color Type
 * If you change this type you also have to change the storybook for all Body, Title and Number Stories
 */
type TextColor = Pick<
  IThemeColor,
  | "Neutral0"
  | "Neutral1"
  | "Neutral4"
  | "Neutral5"
  | "Neutral6"
  | "Neutral8"
  | "Neutral9"
  | "Danger5"
  | "Primary5"
>;

type TextProps = SpanProps & {
  color?: keyof TextColor;
  ellipsis?: boolean;
};

/**
 * Text Component
 * This is a base component, do not export, use Title, Body, Number instead
 */
const Text: React.FC<TextTypeProps & TextProps> = (props) => {
  const { type, size, weight, ellipsis = false, ...rest } = props;

  const theme = useTheme();

  const style = get(
    theme.typography,
    `${type}.${size}.${weight}`,
    theme.typography.body.m.regular
  );

  return <StyledText {...rest} {...style} ellipsis={ellipsis} />;
};

type NumberTextProps = Omit<INumberText, "type"> & TextProps;

/**
 * Number Text Component
 * @prop {NumberTextSizeType} size
 * @prop {TextWeightType} weight
 */
const NumberText: React.FC<NumberTextProps> = (props) => {
  return <Text {...props} type="numbers" />;
};

type BodyTextProps = Omit<IBodyText, "type"> & TextProps;

/**
 * Body Text Component
 * @prop {BodyTextSizeType} size
 * @prop {TextWeightType} weight
 */
const BodyText: React.FC<BodyTextProps> = (props) => {
  return <Text {...props} type="body" />;
};

type TitleTextProps = Omit<ITitleText, "type"> & TextProps;

/**
 * Body Title Component
 * @prop {TitleTextSizeType} size
 * @prop {TextWeightType} weight
 */
const TitleText: React.FC<TitleTextProps> = (props) => {
  return <Text {...props} type="title" />;
};

/**
 * Text Component
 * @exports {TitleTextProps} Title
 ** Exported Component, this is meant to be used for displaying heading labels and titles
 * @exports {BodyTextProps} Body
 ** Exported Component, this is meant to be used for displaying content and labels
 * @exports {NumberTextProps} Number
 ** Exported Component, this is meant to be used for displaying numbers only
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Title: TitleText,
  Body: BodyText,
  Number: NumberText,
};
