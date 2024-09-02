import styles from '../Styles/ChatComp-style.module.css'

const ChatCopm = () => {
  return (
    <div className={styles.mainChatWrap}>
      <div className={styles.listWrap}>
        <div>
          <input type="text" placeholder="Search user" className="input input-bordered input-primary w-full mb-4" />
        </div>
        <div className="card bg-base-100 mb-4 p-3">
          <div className={styles.chatsWrap}>
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              className="w-10 rounded-full"/>
            <p>Test chat</p>
          </div>
        </div>
        <div className="card bg-base-100 mb-4 p-3">
          <div className={styles.chatsWrap}>
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              className="w-10 rounded-full"/>
            <p>Test chat</p>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <div className="card bg-base-100 mb-4 p-1">
          <h2>Chat 1</h2>
        </div>
        <div className="card bg-base-100 p-7 max-h-dvh">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
            </div>
            <div className="chat-bubble bg-customChatBubble text-secondary">You were the Chosen One!</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
            </div>
            <div className="chat-bubble bg-primary">I hate you!</div>
          </div>
          <div className="divider"></div>
          <div className={styles.sendMessWrap}>
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
            <button className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.4577 0.218854C19.8523 0.492235 20.0593 0.964793 19.9851 1.43735L17.4851 17.684C17.4265 18.0628 17.196 18.3948 16.86 18.5822C16.5241 18.7697 16.1217 18.7931 15.7663 18.6447L11.0943 16.7037L8.41851 19.5976C8.07084 19.9765 7.52396 20.1015 7.04348 19.914C6.56301 19.7265 6.2505 19.2618 6.2505 18.7463V15.4813C6.2505 15.3251 6.3091 15.1767 6.41457 15.0634L12.9615 7.92038C13.1881 7.67434 13.1803 7.29551 12.9459 7.06119C12.7115 6.82686 12.3326 6.81124 12.0865 7.03385L4.1411 14.091L0.691824 12.3648C0.277755 12.1578 0.0121258 11.7438 0.000406863 11.283C-0.0113121 10.8221 0.230879 10.3925 0.629323 10.1621L18.1296 0.164178C18.5476 -0.074054 19.0632 -0.0506214 19.4577 0.218854Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatCopm