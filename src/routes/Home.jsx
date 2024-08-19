import styles from '../Styles/Home-style.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleBtnCklick = (path) => {
        navigate(path);
    }
  return (
    <div className={styles.homeWrap}>
        <h1>Welcome to Chatify</h1>
        <div className="cardWrapper">
            <div className="card bg-base-100 w-96 shadow-cardShadow">
                <div className='card-body items-center text-center gap-7'>
                    <h2 className="card-title">What do you want to do?</h2>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleBtnCklick('/signin')}>Sign in</button>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleBtnCklick('/register')}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Home