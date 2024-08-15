import { Routes, Route } from "react-router-dom"
import Home from "../routes/Home"

const Switch = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
    </div>
  )
}
export default Switch