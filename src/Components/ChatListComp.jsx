import { useContext } from 'react'
import { ChatContext } from '../context/ChatContextProvider'
import styles from '../Styles/ChatComp-style.module.css'

const ChatListComp = () => {
    const { allConversations, decodedJwt, selectConversation } = useContext(ChatContext)

    const inviteArray = JSON.parse(decodedJwt.invite);

  return (
    <div>
        {allConversations.map((convId, idx) => (
            <>
              <div className="card bg-base-100 mb-4 p-3" onClick={() => selectConversation(convId)}>
                <div className={styles.chatsWrap}>
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                    className="w-10 rounded-full"/>
                  <small>Konversation {idx + 1}</small>
                </div>
              </div>
            </>
        ))}
        {inviteArray.length > 0 ? (
            <div>
                {inviteArray.map((invite, index) => (
                    <div className="card bg-base-100 mb-4 p-3" onClick={() => selectConversation(invite.conversationId)}>
                        <div className={styles.chatsWrap}>
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                className="w-10 rounded-full"/>
                            <small key={index}>{invite.username}</small>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>Inga inbjudningar finns.</p>
        )}
    </div>
  )
}
export default ChatListComp