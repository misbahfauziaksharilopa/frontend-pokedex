import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'

export default function AdminLayout() {
  return (
    <div className="h-screen flex bg-base overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}