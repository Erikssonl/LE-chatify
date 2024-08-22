import { useContext } from 'react';
import { ChatContext } from '../context/ChatContextProvider';
import { Link } from "react-router-dom"
import styles from '../Styles/SignIn-style.module.css'


const SignIn = () => {
  return (
    <div className={styles.signInWrap}>
      <h1>Welcome to Chatify</h1>
      <div className="cardWrapper">
            <div className="card bg-base-100 w-96 shadow-cardShadow">
                <div className='card-body items-center text-center gap-7'>
                  <h2>Sign in</h2>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input 
                    type="text" 
                    className="grow" 
                    placeholder="Username or Email"
                    required/>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input 
                    type="password" 
                    className="grow" 
                    placeholder="Password" 
                    required
                    />
                  </label>
                  <div className="card-actions justify-end">
                        <button className="btn btn-primary">Register</button>
                  </div>
                </div>
                <div className="card-actions justify-center gap-2">
                    <Link to="/register">No user account? Click here to register!</Link>
                </div>
                <br />
            </div>
        </div>
    </div>
  )
}
export default SignIn