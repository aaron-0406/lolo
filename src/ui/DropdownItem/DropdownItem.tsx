import type { LiHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import Container from '../Container'
import Icon from '../Icon'
import Text from '../Text'
import type { DropdownItemSizeType } from './interfaces'

type DropdownProps = LiHTMLAttributes<HTMLLIElement> & {
  leadingIcon?: string
  trailingIcon?: string
  suffix?: string
  text?: string
  size?: DropdownItemSizeType
  active?: boolean
}

const DropdownItem: React.FC<DropdownProps> = (props) => {
  const { leadingIcon, text, suffix, trailingIcon, size = 'default', active = false, ...rest } = props

  const iconSizeDefault = 16
  const iconLargeDefault = 20

  return (
    <StyledLi $size={size} $active={active} {...rest}>
      <Container display="flex" alignItems="center" gap="8px">
        {!!leadingIcon && (
          <Container display="flex" justifyContent="center" alignItems="center" width="24px" height="24px">
            <Icon size={size === 'default' ? iconSizeDefault : iconLargeDefault} remixClass={leadingIcon} />
          </Container>
        )}

        {!!text && (
          <Text.Body size={size === 'default' ? 'm' : 'l'} weight="regular" className="prefix__text" color="Neutral8">
            {text}
          </Text.Body>
        )}
      </Container>

      <Container display="flex" alignItems="center" gap="8px">
        {!!suffix && (
          <Text.Body size="m" weight="regular" className="suffix__text">
            {suffix}
          </Text.Body>
        )}

        {!!trailingIcon && active && (
          <Container display="flex" justifyContent="center" alignItems="center" width="24px" height="24px">
            <Icon size={size === 'default' ? iconSizeDefault : iconLargeDefault} remixClass={trailingIcon} />
          </Container>
        )}
      </Container>
    </StyledLi>
  )
}

export default DropdownItem

const StyledLi = styled.li<{ $size: DropdownItemSizeType; $active: boolean }>`
  ${({ theme, $size, $active }) => css`
    width: auto;
    height: ${$size === 'default' ? '40px' : '48px'};
    color: ${theme.colors.Neutral6};
    background: ${theme.colors.Neutral0};
    padding: 8px 12px;
    list-style: none;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;

    .suffix__text {
      color: ${theme.colors.Neutral6};
    }

    .prefix__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :hover {
      background: ${theme.colors.Neutral2};
    }

    :active {
      background: ${theme.colors.Neutral3};

      .prefix__text {
        font-weight: bold;
      }
    }

    ${$active &&
    css`
      background: ${theme.colors.Neutral3};

      .prefix__text {
        font-weight: bold;
      }
    `}
  `}
`
