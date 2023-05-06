export enum TextWeightEnum {
  'regular' = 'regular',
  'bold' = 'bold',
}

type TextWeightType = `${TextWeightEnum}`

export enum TitleTextSizeEnum {
  'xxl' = 'xxl',
  'xl' = 'xl',
  'l' = 'l',
  'm' = 'm',
  's' = 's',
}

type TitleTextSizeType = `${TitleTextSizeEnum}`

export enum BodyTextSizeEnum {
  'l' = 'l',
  'm' = 'm',
  's' = 's',
  'xs' = 'xs',
}

type BodyTextSizeType = `${BodyTextSizeEnum}`

export enum NumberTextSizeEnum {
  'xl' = 'xl',
  'l' = 'l',
  'm' = 'm',
  's' = 's',
  'xs' = 'xs',
}

type NumberTextSizeType = `${NumberTextSizeEnum}`

export interface ITitleText {
  type: 'title'
  size: TitleTextSizeType
  weight: TextWeightType
}

export interface IBodyText {
  type: 'body'
  size: BodyTextSizeType
  weight: TextWeightType
}

export interface INumberText {
  type: 'numbers'
  size: NumberTextSizeType
  weight: TextWeightType
}

export type SpanProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>
