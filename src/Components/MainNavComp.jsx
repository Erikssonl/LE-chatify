import { useState, useContext } from "react"
import { ChatContext } from '../context/ChatContextProvider';
import { Link } from "react-router-dom";
import SideNavComp from "./SideNavComp"
import styles from '../Styles/MainNav-style.module.css'

const MainNavComp = () => {
    const { decodedJwt } = useContext(ChatContext)


  return (
    <div className="navbar bg-base-100 rounded-box flex-auto justify-between px-7 mb-16 ">
            <SideNavComp />
            <h1>Chatify</h1>
            {decodedJwt && (
                <div >
                  <Link to="/profile" className={styles.link}> 
                    <p>{decodedJwt.user}</p> 
                    <img className={styles.profileImg} alt="User avatar" src={decodedJwt.avatar} />
                  </Link>
                </div>
            )}
    </div>
  )
}
export default MainNavComp