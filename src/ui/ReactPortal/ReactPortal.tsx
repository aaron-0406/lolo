import { createPortal } from 'react-dom'

type ReactPortalProps = {
  children: React.ReactNode
  element?: HTMLDivElement
}

const ReactPortal: React.FC<ReactPortalProps> = ({ children, element }) => {
  if (element) {
    return createPortal(children, element)
  }

  return <>{children}</>
}
export default ReactPortal
