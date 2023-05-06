import type { IThemeColor } from 'styled-components'
import styled, { css } from 'styled-components'

const DEFAULT_ICON_SIZE = 24

type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  remixClass: string
  size?: number
  className?: string
  containerClassName?: string
  color?: keyof IThemeColor
}

const Icon: React.FC<IconProps> = ({
  remixClass,
  className,
  containerClassName,
  size = DEFAULT_ICON_SIZE,
  ...rest
}) => {
  return (
    <StyledIcon {...rest} size={size} className={containerClassName}>
      <i className={`${remixClass} ${className}`} />
    </StyledIcon>
  )
}

export default Icon

/**
 * Styled Icon Component
 * Do not export, use Icon
 */
const StyledIcon = styled.div<{
  size: number
  color?: keyof IThemeColor
}>`
  ${({ theme, size, color = 'Neutral8' }) => css`
    width: ${size}px;
    height: ${size}px;
    font-size: ${size}px;

    i {
      color: ${theme.colors[`${color}`]};
    }
  `}

  display: flex;
  justify-content: center;
  align-items: center;
`
