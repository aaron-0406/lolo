import styled, { css } from 'styled-components'
import Container from '@/ui/Container'

export const StyledLoginContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      .login__container {
        width: 430px;
        height: 90%;
        border: 2px solid ${theme.colors.Neutral4};
        border-radius: 12px;
        box-shadow: ${theme.shadows.elevationHigh};
      }
    }
  `}
`
