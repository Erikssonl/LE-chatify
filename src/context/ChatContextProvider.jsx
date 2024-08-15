import { createContext } from "react"

export const ChatContext = createContext

const ChatContextProvider = (props) => {
  return (
    <ChatContext.Provider></ChatContext.Provider>
  )
}
export default ChatContextProvider