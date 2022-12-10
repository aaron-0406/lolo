import { useState } from 'react'
import Button from '../../../ui/Button'
import Checkbox from '../../../ui/Checkbox'
import Container from '../../../ui/Container'

export const HomeContainer = () => {
  const [value, setValue] = useState(false)
  return (
    <>
      <Container display='flex' flexWrap='wrap' padding='20px'>
        <Button content='Button' />
      </Container>
      <Container display='flex' gap='10px' flexWrap='wrap' padding='20px'>
        <Checkbox type='radio' />
        <Checkbox type='radio' isDisabled />
        <Checkbox type='checkbox' />
        <Checkbox type='checkbox' isDisabled />
      </Container>
    </>
  )
}
