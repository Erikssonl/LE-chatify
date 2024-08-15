import { useState } from 'react'
import './Styles/App.css'
import ChatContextProvider from './context/ChatContextProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChatContextProvider>
      <>
        <h1>Chatify</h1>

      </>
    </ChatContextProvider>
  )
}

export default App
