import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ChatContext } from '../context/ChatContextProvider';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(ChatContext)

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

  return (
    <div>
        <Outlet />
    </div>
  )
}
export default ProtectedRoute