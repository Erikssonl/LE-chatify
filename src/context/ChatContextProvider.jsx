import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {

  const [myCsrfToken, setCsrfToken] = useState([]);
  
  const [regUserName, setRegUserName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStatus, setRegStatus] = useState(null)
  const [imgUrl, setImgUrl] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState(null);
  const [decodedJwt, setDecodedJwt] = useState(JSON.parse(sessionStorage.getItem('jwtDecoded')) || null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState((sessionStorage.getItem('isAuthenticated') === 'true') || false);
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([])
  const [messages, setMessages] = useState('');

  useEffect(() => {
    fetch('https://chatify-api.up.railway.app/csrf', {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('key', '85fa3072d23d668454706cbab59cf52a');
    formData.append('image', file);

    const apiUrl = 'https://api.imgbb.com/1/upload';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const imageUrl = data.data.url;
        setImgUrl(imageUrl);
    } catch (error) {
        console.error('Upload failed:', error);
    }
  };

  const postAuthRegister = () => {
    fetch('https://chatify-api.up.railway.app/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: regUserName,
        password: regPassword,
        email: regEmail,
        avatar: imgUrl,
        // avatar: 'https://i.pravatar.cc/200',
        csrfToken: myCsrfToken
      })
    })
    .then(response => {
      if (!response.ok){
        throw new Error(`HTTP status ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      setRegStatus(true);
    })
    .catch(error => {
      console.error('Error: ', error);
      setRegStatus(false);
    });
  }

  const signIn = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          username: username,
          password: password,
          csrfToken: myCsrfToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('jwtToken', data.token);
        setJwtToken(data.token);
        // console.log('JWT Token set:', data.token);
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        setDecodedJwt(decodedToken);
        sessionStorage.setItem('jwtDecoded', JSON.stringify(decodedToken));
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', true)
        navigate('/chat')
      } else {
        throw new Error(data.message || 'Invalid username or password');
      } 
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem('jwtToken');
    setJwtToken(null);
    sessionStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false);
  };

  const updateUserData = async (userData) => {
    const { userId, updatedData } = userData;
    const token = jwtToken || sessionStorage.getItem('jwtToken');
    console.log( 'JWT Token: ', token);

    const response = await fetch('https://chatify-api.up.railway.app/user', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        userId: userId,
        updatedData,
      }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setDecodedJwt({
        ...decodedJwt,
        ...updatedUser
      });
      return { success: true };
    } else {
      const errorData = await response.json();
      console.error('Faild to update user info.', errorData.message);
      return { success: false, message: errorData.message}
    }
  };

  const deleteUser = async () => {
    try {
      const token = jwtToken || sessionStorage.getItem('jwtToken');
      console.log( 'JWT Token: ', token);

      const response = await fetch('https://chatify-api.up.railway.app/users/' + decodedJwt.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok) {
        throw new Error ('Failed to delete the user.');
      }
      console.log('User deleted successfully!');
      return await response.json();
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    const token = jwtToken || sessionStorage.getItem('jwtToken');

    fetch('https://chatify-api.up.railway.app/users', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          console.error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllUsers(data);
      })
      .catch(error => {
        console.error('Problem with fetch:', error);
        setAllUsers([]);
      })
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const getMessages = async () => {
    const token = jwtToken || sessionStorage.getItem('jwtToken');

    fetch('https://chatify-api.up.railway.app/messages', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          console.error('Network response was not ok');
        }
        return response.json();
      })
      .then (data => {
        setMessages(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch:', error);
      })
  }

  return (
    <ChatContext.Provider value={{setRegUserName, regUserName, setRegEmail, regEmail, setRegPassword, regPassword,
     regStatus, handleFileChange, postAuthRegister, imgUrl, username, setUsername, password, setPassword, signIn, isAuthenticated,
     signOut, decodedJwt, updateUserData, deleteUser }}>
      {props.children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider