import { createContext, useState, useEffect } from "react"

export const ChatContext = createContext();

const ChatContextProvider = (props) => {

  const [myCsrfToken, setCsrfToken] = useState([]);

  useEffect(() => {
    fetch('https://chatify-api.up.railway.app/csrf', {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, []);
  console.log(myCsrfToken)

  const [regUserName, setRegUserName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStatus, setRegStatus] = useState(null)
  const [imgUrl, setImgUrl] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('key', '85fa3072d23d668454706cbab59cf52a');
    formData.append('img', file);

    const apiUrl = 'https://api.imgbb.com/1/upload';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      if(!response.ok) {
        throw new Error('Network response was not ok: '+ response.statusText);
      }

      const data = await response.json();
      const imgUrl = data.data.url;
      setImgUrl(imgUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload faild: ', error);
      toast.error('Upload faild: ' + error.toString());
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
        // avatar: imgUrl,
        avatar: 'https://i.pravatar.cc/200',
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn= async (username, password, callback ) => {
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
        setIsAuthenticated(true);
        callback();
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

  const signOut = (callback) => {
    sessionStorage.removeItem('jwtToken');
    setJwtToken(null);
    setIsAuthenticated(false);
    callback();
  };

  // const auth = {
  //   isAuthenticated: () => {
  //     const token = sessionStorage.getItem('jwtToken');
  //     return !!token;
  //   },

  //   signIn: async (callback) => {
  //     const token = await signinAuth();
  //     if (token) {
  //       auth.isAuthenticated = true;
  //       callback();
  //     }
  //   },

  //   signOut: (callback) => {
  //     sessionStorage.removeItem('jwtToken');
  //     setJwtToken('');
  //     auth.isAuthenticated = false;
  //     callback();
  //   }
  // };

  return (
    <ChatContext.Provider value={{setRegUserName, regUserName, setRegEmail, regEmail, setRegPassword, regPassword,
     regStatus, handleFileChange, postAuthRegister, imgUrl, username, setUsername, password, setPassword, signIn, isAuthenticated, }}>
      {props.children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider