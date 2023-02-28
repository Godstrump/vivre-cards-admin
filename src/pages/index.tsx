import { Outlet } from 'react-router-dom'
import AppDrawer from '../components/common/app-drawer'

const Dashboard = () => {
    
  return (
    <AppDrawer>
        <Outlet />
    </AppDrawer>
  )
}

export default Dashboard