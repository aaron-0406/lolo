import { useState, useRef, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../Button'

interface ScrollButtonsProps {
  children: ReactNode
}

const ScrollButtonsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const ScrollContent = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`

const ScrollButton = styled.button`
  position: relative;
  cursor: pointer;
`
const ScrollButtons = ({ children }: ScrollButtonsProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  const checkScrollability = () => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth
      const containerWidth = contentRef.current.offsetWidth
      setIsScrollable(contentWidth > containerWidth)
    }
  }

  const handleScroll = (scrollOffset: number) => {
    if (contentRef.current) {
      const newScrollLeft = contentRef.current.scrollLeft + scrollOffset
      contentRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    checkScrollability()
    const handleResize = () => {
      checkScrollability()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ScrollButtonsContainer>
      {isScrollable && (
        <ScrollButton onClick={() => handleScroll(-100)}>
          <Button trailingIcon="ri-arrow-left-s-fill" width="10px" shape="round" size="small" />
        </ScrollButton>
      )}
      <ScrollContent ref={contentRef}>{children}</ScrollContent>
      {isScrollable && (
        <ScrollButton onClick={() => handleScroll(100)}>
          <Button trailingIcon="ri-arrow-right-s-fill" width="10px" shape="round" size="small" />
        </ScrollButton>
      )}
    </ScrollButtonsContainer>
  )
}

export default ScrollButtons
