import { useState } from "react"
import { Link } from "react-router-dom"
import styles from '../Styles/SideNav-style.module.css'

const SideNavComp = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div>
        <button className={styles.openBtn} onClick={toggleNav}>&#9776;</button>

        {isOpen && <div className={styles.overlay} onClick={toggleNav}></div>}

        <div className={isOpen ? `${styles.sideNav} ${styles.expanded}` : `${styles.sideNav} ${styles.collapsed}`}>
            <a href="#" className={styles.closeBtn} onClick={toggleNav}>&times;</a>
            <ul>
                <li><Link to="/profile" className={styles.link} onClick={toggleNav}>Profile</Link></li>
                <li><Link to="/chat" className={styles.link} onClick={toggleNav}>Chat</Link></li>
                <li><Link to="/" className={styles.link} onClick={toggleNav}>Sign Out</Link></li>
            </ul>
        </div>
    </div>
  )
}
export default SideNavComp