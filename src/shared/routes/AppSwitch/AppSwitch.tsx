import { BrowserRouterProps, Routes } from 'react-router-dom'

const AppSwitch = ({ children, ...props }: BrowserRouterProps) => {
  return <Routes {...props}>{children}</Routes>
}

export default AppSwitch
