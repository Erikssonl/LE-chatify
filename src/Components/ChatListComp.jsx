import { useContext } from 'react'
import { ChatContext } from '../context/ChatContextProvider'
import styles from '../Styles/ChatComp-style.module.css'

const ChatListComp = () => {
  const { allConversations, decodedJwt, getMessages, setConId, setShowConv } =
    useContext(ChatContext);

  const inviteArray = JSON.parse(decodedJwt.invite || '[]');

  const btnHandler = (convId) => {
    setShowConv(false);
    setConId(convId);
    console.log(convId);
    getMessages(convId);
  };

  const validAllConversations = allConversations || [];
  const hasContent = validAllConversations.length > 0 || inviteArray.length > 0;

  return (
    <div>
      {hasContent ? (
        <>
          {validAllConversations.map((convId, idx) => (
            <div className="card bg-base-100 mb-4 p-3" key={idx} onClick={() => btnHandler(convId)}>
              <div className={styles.chatsWrap}>
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="w-10 rounded-full"/>
                <small>Konversation {idx + 1}</small>
              </div>
            </div>
          ))}
          {inviteArray.map((invite, index) => (
            <div className="card bg-base-100 mb-4 p-3" key={index} onClick={() => btnHandler(invite.conversationId)}>
              <div className={styles.chatsWrap}>
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="w-10 rounded-full"/>
                <small>{invite.username}</small>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>There are no conversations</p>
      )}

    </div>
  )
}
export default ChatListComp;