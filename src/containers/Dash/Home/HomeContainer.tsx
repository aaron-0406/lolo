import Button from '../../../ui/Button'
import Container from '../../../ui/Container'

export const HomeContainer = () => {
  return (
    <Container display='flex' gap='10px' flexWrap='wrap' padding='20px'>
      <Button
        content='Button'
        iconRight='ri-shape-line'
        iconLeft='ri-shape-line'
      />
      <Button
        content='Button'
        iconRight='ri-shape-line'
        iconLeft='ri-shape-line'
      />
      <Button
        isLoading
        content='Button'
        iconRight='ri-shape-line'
        iconLeft='ri-shape-line'
      />
      <Button
        isDisabled
        content='Button'
        iconRight='ri-shape-line'
        iconLeft='ri-shape-line'
      />
      <Button link to='/dash' content='Link' />
      <Button link content='Link' state='danger' />
      <Button link content='Link' state='warning' />
      <Button link content='Link' state='warning' isDisabled />
    </Container>
  )
}
