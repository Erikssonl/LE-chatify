import { useState } from 'react'
import './Styles/App.css'
import ChatContextProvider from './context/ChatContextProvider'
import Home from './routes/Home'
import Switch from './Components/Switch'

function App() {

  return (
    // <ChatContextProvider>
      <>
        <Switch />
      </>
    // </ChatContextProvider>
  )
}

export default App
