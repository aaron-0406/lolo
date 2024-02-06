import styled from 'styled-components'
import Text from '../Text'

type TagProp = {
  text: string
  color: string
}

const Tag = ({ text, color }: TagProp) => {
  return (
    <StyledTag color={color}>
      <Text.Body size="s" weight="bold">
        {text}
      </Text.Body>
    </StyledTag>
  )
}

export default Tag

const StyledTag = styled.div<{ color: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
`
