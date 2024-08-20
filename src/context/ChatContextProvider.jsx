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
    formData.append('key', '6837423b2feebc9a2e75fd353987ce1b');
    formData.append('img', file);

    const apiUrl = 'https://api.imgbb.com/1/upload';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      if(!response.ok) {
        throw new Error('Network response was not ok');
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
        avatar: imgUrl,
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

  return (
    <ChatContext.Provider value={{}}>
      {props.children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider