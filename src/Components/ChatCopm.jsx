import { useContext, useEffect, useState } from 'react'
import styles from '../Styles/ChatComp-style.module.css'
import InviteComp from './InviteComp'
import { ChatContext } from '../context/ChatContextProvider'
import ChatListComp from './ChatListComp'
import LandingPageComp from './LandingPageComp'

const ChatCopm = () => {
  const { decodedJwt, messages, postMessages, getMessages, conId, deleteMessage } = useContext(ChatContext)
  const [inputValue, setInputValue] = useState("")

  const hadleSendMessage = () => {
    postMessages(inputValue)
    setInputValue("")
  }

  useEffect (()=> {
    if (conId) {
      // getMessages()
    }
  }, [hadleSendMessage, conId])

  useEffect(() => {
    if (conId) {
      getMessages(conId);
    }
  }, [conId]);


  return (
    <div className={styles.mainChatWrap}>
      <div className={styles.listWrap}>
        <InviteComp />
        <ChatListComp />
      </div>
      <div className="flex-1 ">
        {!conId ? (
          <LandingPageComp />
        ) : (
          <div className="card bg-base-100 p-7 max-h-dvh">
            {messages && messages.length > 0 ? (
              <>
                <div className={styles.messagesWrap}>
                  {messages.map((msg) => (
                    <div key={msg.id} className={`chat ${msg.userId === decodedJwt.id ? 'chat-end' : 'chat-start'}`}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="User avatar"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          />
                        </div>
                      </div>
                      <div className="chat-header mt-4">
                        {msg.userId === decodedJwt.id ? `${decodedJwt.user}` : "Other User"}
                      </div>
                      <div className={`chat-bubble ${msg.userId === decodedJwt.id ? 'bg-primary text-black' : 'bg-customChatBubble text-secondary'}`}>
                        {msg.text}
                      </div>
                      {msg.userId === decodedJwt.id && (
                        <div onClick={() => deleteMessage(msg.id)} className="chat-footer mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 8" fill="none">
                            <path d="M2.6125 0.276563C2.69687 0.10625 2.87031 0 3.05938 0H4.94063C5.12969 0 5.30312 0.10625 5.3875 0.276563L5.5 0.5H7C7.27656 0.5 7.5 0.723437 7.5 1C7.5 1.27656 7.27656 1.5 7 1.5H1C0.723437 1.5 0.5 1.27656 0.5 1C0.5 0.723437 0.723437 0.5 1 0.5H2.5L2.6125 0.276563ZM1 2H7V7C7 7.55156 6.55156 8 6 8H2C1.44844 8 1 7.55156 1 7V2ZM2.5 3C2.3625 3 2.25 3.1125 2.25 3.25V6.75C2.25 6.8875 2.3625 7 2.5 7C2.6375 7 2.75 6.8875 2.75 6.75V3.25C2.75 3.1125 2.6375 3 2.5 3ZM4 3C3.8625 3 3.75 3.1125 3.75 3.25V6.75C3.75 6.8875 3.8625 7 4 7C4.1375 7 4.25 6.8875 4.25 6.75V3.25C4.25 3.1125 4.1375 3 4 3ZM5.5 3C5.3625 3 5.25 3.1125 5.25 3.25V6.75C5.25 6.8875 5.3625 7 5.5 7C5.6375 7 5.75 6.8875 5.75 6.75V3.25C5.75 3.1125 5.6375 3 5.5 3Z" fill="#AE3838"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>Inga meddelanden att visa.</p>
            )}
            <div className="divider"></div>
            <div className={styles.sendMessWrap}>
              <input 
                type="text" 
                placeholder="Type here" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input input-bordered input-primary w-full" />
              <button onClick={hadleSendMessage} className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.4577 0.218854C19.8523 0.492235 20.0593 0.964793 19.9851 1.43735L17.4851 17.684C17.4265 18.0628 17.196 18.3948 16.86 18.5822C16.5241 18.7697 16.1217 18.7931 15.7663 18.6447L11.0943 16.7037L8.41851 19.5976C8.07084 19.9765 7.52396 20.1015 7.04348 19.914C6.56301 19.7265 6.2505 19.2618 6.2505 18.7463V15.4813C6.2505 15.3251 6.3091 15.1767 6.41457 15.0634L12.9615 7.92038C13.1881 7.67434 13.1803 7.29551 12.9459 7.06119C12.7115 6.82686 12.3326 6.81124 12.0865 7.03385L4.1411 14.091L0.691824 12.3648C0.277755 12.1578 0.0121258 11.7438 0.000406863 11.283C-0.0113121 10.8221 0.230879 10.3925 0.629323 10.1621L18.1296 0.164178C18.5476 -0.074054 19.0632 -0.0506214 19.4577 0.218854Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCopm;

// return (
//   <div className={styles.mainChatWrap}>
//     <div className={styles.listWrap}>
//       <InviteComp />
//       <ChatListComp />
//     </div>
//     <div className="flex-1 ">
//       <div className="card bg-base-100 p-7 max-h-dvh">
//         {messages && messages.length > 0 ? (
//           <>
//             {/* <h2>Chat 1</h2>
//             <div className="divider"></div> */}
//             <div className={styles.messagesWrap}>
//               {messages.map((msg) => (
//                 <div key={msg.id} className={`chat ${msg.userId === decodedJwt.id ? 'chat-end' : 'chat-start'}`}>
//                   <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                       <img
//                         alt="User avatar"
//                         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                       />
//                     </div>
//                   </div>
//                   <div className="chat-header mt-4">
//                     {/* {msg.userId === decodedJwt.id ? "Me" : "Other User"} */}
//                     {msg.userId === decodedJwt.id ? `${decodedJwt.user}` : "Other User"}
//                   </div>
//                   <div className={`chat-bubble ${msg.userId === decodedJwt.id ? 'bg-primary text-black' : 'bg-customChatBubble text-secondary'}`}>
//                     {msg.text}
//                   </div>
//                   <div className="chat-footer mt-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 8" fill="none">
//                       <path d="M2.6125 0.276563C2.69687 0.10625 2.87031 0 3.05938 0H4.94063C5.12969 0 5.30312 0.10625 5.3875 0.276563L5.5 0.5H7C7.27656 0.5 7.5 0.723437 7.5 1C7.5 1.27656 7.27656 1.5 7 1.5H1C0.723437 1.5 0.5 1.27656 0.5 1C0.5 0.723437 0.723437 0.5 1 0.5H2.5L2.6125 0.276563ZM1 2H7V7C7 7.55156 6.55156 8 6 8H2C1.44844 8 1 7.55156 1 7V2ZM2.5 3C2.3625 3 2.25 3.1125 2.25 3.25V6.75C2.25 6.8875 2.3625 7 2.5 7C2.6375 7 2.75 6.8875 2.75 6.75V3.25C2.75 3.1125 2.6375 3 2.5 3ZM4 3C3.8625 3 3.75 3.1125 3.75 3.25V6.75C3.75 6.8875 3.8625 7 4 7C4.1375 7 4.25 6.8875 4.25 6.75V3.25C4.25 3.1125 4.1375 3 4 3ZM5.5 3C5.3625 3 5.25 3.1125 5.25 3.25V6.75C5.25 6.8875 5.3625 7 5.5 7C5.6375 7 5.75 6.8875 5.75 6.75V3.25C5.75 3.1125 5.6375 3 5.5 3Z" fill="#AE3838"/>
//                     </svg>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p>Inga meddelanden att visa.</p>
//         )}
//         <div className="divider"></div>
//         <div className={styles.sendMessWrap}>
//           <input 
//           type="text" 
//           placeholder="Type here" 
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="input input-bordered input-primary w-full" />
//           <button onClick={hadleSendMessage} className="btn btn-primary">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//               <path d="M19.4577 0.218854C19.8523 0.492235 20.0593 0.964793 19.9851 1.43735L17.4851 17.684C17.4265 18.0628 17.196 18.3948 16.86 18.5822C16.5241 18.7697 16.1217 18.7931 15.7663 18.6447L11.0943 16.7037L8.41851 19.5976C8.07084 19.9765 7.52396 20.1015 7.04348 19.914C6.56301 19.7265 6.2505 19.2618 6.2505 18.7463V15.4813C6.2505 15.3251 6.3091 15.1767 6.41457 15.0634L12.9615 7.92038C13.1881 7.67434 13.1803 7.29551 12.9459 7.06119C12.7115 6.82686 12.3326 6.81124 12.0865 7.03385L4.1411 14.091L0.691824 12.3648C0.277755 12.1578 0.0121258 11.7438 0.000406863 11.283C-0.0113121 10.8221 0.230879 10.3925 0.629323 10.1621L18.1296 0.164178C18.5476 -0.074054 19.0632 -0.0506214 19.4577 0.218854Z" fill="white"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }
// export default ChatCopm