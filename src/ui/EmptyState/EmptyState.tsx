import React from 'react'
import styled from 'styled-components'
import Container from '../Container'
import Button from '../Button'
import Text from '../Text'

type EmptyStateProps = {
  title: string
  description:string
  buttonLabel: string
  buttonAction: () => void
}

const EmptyState:React.FC<EmptyStateProps> = ({title, description, buttonLabel, buttonAction}) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      width="400"
      height="100%"
      justifyContent="center"
      alignItems="center"
      gap="5px"
      padding="20px 0px 20px 0px"
    >
      <StyledIcon
        color="rgb(187, 187, 188)"
        stroke="currentColor"
        fill="none"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
        ></path>
      </StyledIcon>
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="5px"
        maxWidth="500px"
        textAlign="center"
      >
        <Text.Title size="m" weight="bold" color="Neutral8">
          {title}
        </Text.Title>
        <Text.Body size="m" weight="regular">
          {description}
        </Text.Body>
      </Container>
      <Button 
      onClick={buttonAction}
      label={buttonLabel} />
    </Container>
  )
}

export default EmptyState
const StyledIcon = styled.svg`
  height: 4rem;
  width: 4rem;
`