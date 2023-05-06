import type CSS from 'csstype'
import styled, { css } from 'styled-components'

const OPACITY_1 = 1
const OPACITY_0_8 = 0.8

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  display?: CSS.Property.Display
  alignItems?: CSS.Property.AlignItems
  justifyContent?: CSS.Property.JustifyContent
  textAlign?: CSS.Property.TextAlign
  position?: CSS.Property.Position
  centered?: boolean
  fullScreen?: boolean
  minHeight?: CSS.Property.MinHeight
  minWidth?: CSS.Property.MinWidth
  maxHeight?: CSS.Property.MaxHeight
  maxWidth?: CSS.Property.MaxWidth
  height?: CSS.Property.Height
  width?: CSS.Property.Width
  flexDirection?: CSS.Property.FlexDirection
  padding?: CSS.Property.Padding
  margin?: CSS.Property.Margin
  flexWrap?: CSS.Property.FlexWrap
  gap?: CSS.Property.Gap
  readonly?: boolean
  pointerEvents?: CSS.Property.PointerEvents
  overFlowX?: CSS.Property.OverflowX
  overFlowY?: CSS.Property.OverflowY
  cursor?: CSS.Property.Cursor
  backgroundColor?: CSS.Property.BackgroundColor
}

const Container: React.FC<ContainerProps> = (props) => {
  return <StyledContainer {...props} />
}

export default Container

export const StyledContainer = styled.div<ContainerProps>`
  ${({ centered, fullScreen }) =>
    !!centered &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      ${!!fullScreen &&
      css`
        min-height: 70vh;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
    `}

  ${({ pointerEvents }) =>
    !!pointerEvents &&
    css`
      pointer-events: ${pointerEvents};
    `}

  ${({ readonly }) => css`
    pointer-events: ${readonly ? 'none' : 'auto'};
    opacity: ${readonly ? OPACITY_0_8 : OPACITY_1};
  `}

  ${({ display }) =>
    !!display &&
    css`
      display: ${display};
    `}

  ${({ padding }) =>
    !!padding &&
    css`
      padding: ${padding};
    `}
    
  ${({ margin }) =>
    !!margin &&
    css`
      margin: ${margin};
    `}

  ${({ alignItems }) =>
    !!alignItems &&
    css`
      align-items: ${alignItems};
    `}

  ${({ justifyContent }) =>
    !!justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

  ${({ textAlign }) =>
    !!textAlign &&
    css`
      text-align: ${textAlign};
    `}
    
  ${({ position }) =>
    !!position &&
    css`
      position: ${position};
    `}

  ${({ minHeight }) =>
    !!minHeight &&
    css`
      min-height: ${minHeight};
    `}

    ${({ minWidth }) =>
    !!minWidth &&
    css`
      min-width: ${minWidth};
    `}

    ${({ maxHeight }) =>
    !!maxHeight &&
    css`
      max-height: ${maxHeight};
    `}

    ${({ maxWidth }) =>
    !!maxWidth &&
    css`
      max-width: ${maxWidth};
    `}

  ${({ flexDirection }) =>
    !!flexDirection &&
    css`
      flex-direction: ${flexDirection};
    `}

    ${({ flexWrap }) =>
    !!flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}
      
  ${({ gap }) =>
    !!gap &&
    css`
      gap: ${gap};
    `}

    ${({ width }) =>
    !!width &&
    css`
      width: ${width};
    `}

    ${({ overFlowX }) =>
    !!overFlowX &&
    css`
      overflow-x: ${overFlowX};
    `}
    
    ${({ overFlowY }) =>
    !!overFlowY &&
    css`
      overflow-y: ${overFlowY};
    `}
    
    ${({ cursor }) =>
    !!cursor &&
    css`
      cursor: ${cursor};
    `}
      
    ${({ height }) =>
    !!height &&
    css`
      height: ${height};
    `}

    ${({ backgroundColor }) =>
    !!backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}
`
