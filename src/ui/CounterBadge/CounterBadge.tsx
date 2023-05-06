import type { IRegular, IThemeColor } from 'styled-components'
import styled, { css, useTheme } from 'styled-components'

type CounterBadgeProps = {
  color?: keyof IThemeColor
  background?: keyof IThemeColor
  label?: number
  containerClassName?: string
  contentClassName?: string
}

const CounterBadge: React.FC<CounterBadgeProps> = ({
  color,
  label,
  background,
  containerClassName,
  contentClassName,
}) => {
  const theme = useTheme()
  const textStyle = theme.typography.body.m.bold

  if (label === undefined) {
    return null
  }

  return (
    <StyledCounter background={background} className={`counter ${containerClassName}`}>
      <StyledCounterText {...textStyle} className={`counter__content ${contentClassName}`} color={color}>
        {label}
      </StyledCounterText>
    </StyledCounter>
  )
}

export default CounterBadge

type StyledButtonTextProps = IRegular & {
  color?: keyof IThemeColor
}

/**
 * Styled Counter Text Component
 * Do not export, use CounterBadge
 */
const StyledCounterText = styled.span<StyledButtonTextProps>`
  ${({ color = 'Primary5', ...props }) => css`
    font-size: ${props.fontSize}px;
    font-family: ${props.fontFamily};
    font-weight: ${props.fontWeight};
    letter-spacing: ${props.letterSpacing}px;
    line-height: ${props.lineHeight}px;
    color: ${props.theme.colors[`${color}`]};
  `}
`

/**
 * Styled Counter Component
 * Do not export, use CounterBadge
 */
const StyledCounter = styled.div<{ background?: keyof IThemeColor }>`
  ${({ theme, background }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: transparent;
    background: ${!background ? 'transparent' : theme.colors[`${background}`]};
    border-radius: 45px;
  `}
`
