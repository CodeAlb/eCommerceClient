import {ReactNode} from 'react'

interface IDashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({children}: IDashboardLayoutProps) => {
  return <div>{children}</div>
}

export default DashboardLayout
