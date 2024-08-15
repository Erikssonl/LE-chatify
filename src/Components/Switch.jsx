import { Routes, Route } from "react-router-dom"
import Home from "../routes/Home"
import SignIn from "../routes/SignIn"
import Register from "../routes/Register"

const Switch = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </div>
  )
}
export default Switch