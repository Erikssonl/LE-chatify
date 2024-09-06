import styles from '../Styles/Register-style.module.css'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContextProvider';
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const {setRegUserName, regUserName, setRegEmail, regEmail, setRegPassword,
     regPassword, regStatus, handleFileChange, postAuthRegister, imgUrl, setRegStatus
  } = useContext(ChatContext)

  // const navigate = useNavigate();

  // const handleRegister = async () => {
  //   try {
  //     await postAuthRegister();
  //     if (regStatus) {
  //       setTimeout(() => {
  //         navigate('/signin');
  //         setRegStatus(false)
  //       }, 2000)
  //     }
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //   }
  // };

  return (
    <div className={styles.registerWrap}>
      <h1>Welcome to Chatify</h1>
      <div className="cardWrapper">
            <div className="card bg-base-100 w-96 shadow-cardShadow">
                <div className='card-body items-center text-center gap-7'>
                  <h2>Register</h2>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input 
                    type="email" 
                    className="grow" 
                    placeholder="Email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)} />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input 
                    type="text" 
                    className="grow" 
                    placeholder="Username"
                    required
                    value={regUserName}
                    onChange={(e) => setRegUserName(e.target.value)} />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input 
                    type="password" 
                    className="grow" 
                    placeholder="Password" 
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </label>
                  <p className="text-left">Choose Avatar</p>
                  <input 
                  type="file" 
                  className="file-input file-input-bordered file-input-sm w-60 max-w-xs"
                  onChange={handleFileChange} />
                  {imgUrl && (
                    <div>
                      <p>Uploded Image:</p>
                      <img className={styles.uplodedImg} src={imgUrl} alt="Uploaded" />
                      <p>URL: <a href={imgUrl} target="_blank">{imgUrl}</a></p>
                    </div>
                  )}
                  <div className="card-actions justify-end">
                        <button onClick={() => postAuthRegister()} className="btn btn-primary">Register</button>
                  </div>
                  <div>
                    {regStatus === false ? (
                        <div>
                            <br />
                            <div role="alert" className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Registration failed</span>
                            </div>
                        </div>
                    ) : regStatus === true ? (
                        <div>
                            <br />
                            <div role="alert" className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Registration successful</span>
                            </div>
                            <br />
                            <div className="card-actions justify-center">
                                <Link to="/signin">Click here to sign in!</Link>
                            </div>
                        </div>
                    ) : null}
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Register