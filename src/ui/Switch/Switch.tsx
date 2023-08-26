import styled from 'styled-components'
import Spinner from '@/ui/Spinner'

type SwitchProps = {
  checked: boolean
  onChange: () => void
  loading?: boolean
}

const Switch = ({ checked, onChange, loading }: SwitchProps) => {
  return (
    <StyledSwitchWrapper>
      <StyledSwitchInput
        type="checkbox"
        checked={!loading && checked}
        onChange={loading ? undefined : onChange}
        disabled={loading}
      />
      <StyledSwitchSlider loading={loading}>{loading && <StyledSpinner />}</StyledSwitchSlider>
    </StyledSwitchWrapper>
  )
}

const StyledSwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`

const StyledSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + div {
    background-color: ${({ theme }) => theme.colors['Secondary5']};
  }

  &:checked + div:before {
    transform: translateX(20px);
  }

  &:disabled + div {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const StyledSwitchSlider = styled.div<{ loading?: boolean }>`
  position: absolute;
  cursor: ${({ loading }) => (loading ? 'not-allowed' : 'pointer')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors['Neutral5']};
  transition: 0.4s;
  border-radius: 15px;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Switch
