import React from 'react'
import type { SkeletonProps } from 'react-loading-skeleton'
import ReactSkeleton from 'react-loading-skeleton'
import styled, { useTheme } from 'styled-components'

const Skeleton: React.FC<SkeletonProps> = ({ ...props }) => {
  const theme = useTheme()

  return <StyledReactSkeleton {...props} baseColor={theme.colors.Neutral4} />
}

export default Skeleton

const StyledReactSkeleton = styled(ReactSkeleton)`
  position: relative;
  top: -3px;
`
