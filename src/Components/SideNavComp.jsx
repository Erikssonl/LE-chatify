import { useState, useContext } from "react"
import { ChatContext } from '../context/ChatContextProvider';
import { Link, useNavigate } from "react-router-dom"
import styles from '../Styles/SideNav-style.module.css'

const SideNavComp = () => {
    const { signOut } = useContext(ChatContext)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const toggleNav = () => setIsOpen(!isOpen); 

    const handleSignOut = () => {
        setTimeout(signOut, 2000)
    }


  return (
    <div>
        <button className={styles.openBtn} onClick={toggleNav}>&#9776;</button>

        {isOpen && <div className={styles.overlay} onClick={toggleNav}></div>}

        <div className={isOpen ? `${styles.sideNav} ${styles.expanded}` : `${styles.sideNav} ${styles.collapsed}`}>
            <a href="#" className={styles.closeBtn} onClick={toggleNav}>&times;</a>
            <ul>
                <li><Link to="/profile" className={styles.link} onClick={toggleNav}>Profile</Link></li>
                <li><Link to="/chat" className={styles.link} onClick={toggleNav}>Chat</Link></li>
                <li><Link to="/" className={styles.link} onClick={() => handleSignOut()}>Sign Out</Link></li>
            </ul>
        </div>
    </div>
  )
}
export default SideNavComp