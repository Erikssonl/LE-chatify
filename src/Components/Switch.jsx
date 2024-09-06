import { Routes, Route } from "react-router-dom"
import Home from "../routes/Home"
import SignIn from "../routes/SignIn"
import Register from "../routes/Register"
import ProtectedRoute from "../routes/ProtectedRoute"
import Chat from "../routes/Chat"
import Profile from "../routes/Profile"

const Switch = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/register" element={<Register/>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    </div>
  )
}
export default Switch