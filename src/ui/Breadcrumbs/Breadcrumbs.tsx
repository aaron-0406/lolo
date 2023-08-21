import React, { FC } from 'react'
import { BreadcrumbsProps } from './Breadcrumbs.type'
import Container from '../Container'
import Icon from '../Icon'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { routes } = props

  const navigate = useNavigate()
  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = e.currentTarget.dataset.link as string
    if (link !== '#') navigate(link)
  }

  return (
    <Container
      alignItems="center"
      width="100%"
      padding="0px 20px"
      justifyContent="start"
      display="flex"
      flexDirection="row"
    >
      {routes.map((item, index) => {
        if (index === routes.length - 1) {
          return (
            <StyledContainer className="capitalize" key={item.name}>
              {item.name}
            </StyledContainer>
          )
        }
        return (
          <StyledContainerLink
            alignItems="center"
            data-link={item.link}
            display="flex"
            justifyContent="justify-start"
            key={item.name}
            onClick={handleClickContainer}
          >
            {item.name}
            <Icon
              remixClass="ri-arrow-right-s-line"
              style={{
                color: '#4D4D4D',
                margin: '0.5rem',
              }}
            />
          </StyledContainerLink>
        )
      })}
    </Container>
  )
}

export default Breadcrumbs

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    color: ${theme.colors.Primary4};
    fontsize: 13px;
  `}
`

const StyledContainerLink = styled(Container)`
  ${({ theme }) => css`
    color: ${theme.colors.Neutral9};
    fontsize: 13px;
  `}
`
