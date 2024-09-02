import { useContext, useState, useEffect } from "react"
import { ChatContext } from '../context/ChatContextProvider';
import { Tooltip } from 'react-tooltip';
import MainNavComp from "./MainNavComp"
import style from "../Styles/ProfileComp-style.module.css"
import { useNavigate } from "react-router-dom";

const ProfileComp = () => {
  const { decodedJwt, updateUserData, deleteUser } = useContext(ChatContext)
  
  const navigate = useNavigate()
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [inputs, setInputs] = useState({
    user: {
      value: decodedJwt.user || '',
      disabled: true,
      icon: 'edit',
    },
    email: {
      value: decodedJwt.email || '',
      disabled: true,
      icon: 'edit',
    }
  });

  useEffect(() => {
    setInputs({
      user: {
        ...inputs.user,
        value: decodedJwt.user || '',
      },
      email: {
        ...inputs.email,
        value: decodedJwt.email || '',
      }
    });
  }, [decodedJwt]);
  
  const handleEditInput = (field) => {
    setInputs({
      ...inputs,
      [field]: {
        disabled: !inputs[field].disabled,
        icon: inputs[field].icon === 'edit' ? 'save' : 'edit'
      }
    });
  };

  const handleChange = (field, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [field]: {
        ...prevInputs[field],
        value: value
      }
    }))
  }

  const handleSaveAllChanges = async () => {
    if ((inputs.user.value == undefined || inputs.user.value.trim() == "") || (inputs.email.value == undefined || inputs.email.value.trim() == "")) {
      setSaveMessage('Username and email cannot be empty');
      setSaveStatus(false);
      return;
    }

    try {
      const result = await updateUserData({
        userId: decodedJwt.id,
        updatedData: {
          user: inputs.user.value,
          email: inputs.email.value,
        }
      });
  
      if (result.success) {
        setSaveMessage('Success! Changes have been saved.');
        setSaveStatus(true);
      } else {
        setSaveMessage(result.message || 'Failed to save changes.');
        setSaveStatus(false);
      }
    } catch (error) {
      setSaveMessage('An error occurred while saving changes.');
      setSaveStatus(false);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log("Decoded JWT Updated:", decodedJwt);
  }, [decodedJwt]);
  
  useEffect(() => {
    console.log("Inputs State Updated:", inputs);
  }, [inputs]);

  const handleUserDeleted = () => {
    navigate('/')
  }

  const handleDeleteUser = () => {
    deleteUser()
      .then(() => {
        console.log('User deletion successful.');
        setDeleteMessage('User is deleted successfully.');
        setTimeout(handleUserDeleted, 2000);
      })
      .catch((error) => {
        console.error('User deletion failed:', error);
        setDeleteMessage('Something went wrong, user is not deleted.');
      });
  }

  return (
    <div >
      <MainNavComp />
      <div className="card bg-base-100 p-7 flex flex-auto justify-center items-center flex-row">
        <div className={style.cardContent}>
          <figure className="flex-1 mr-0" >
            <img
              src={decodedJwt.avatar}
              alt="user avatar" />
          </figure>
          <div className="card-body">
            <div className={style.inputWrap}>
              <input
                type="text"
                value={inputs.user.value}
                className="input input-bordered w-full max-w-xs"
                disabled={inputs.user.disabled}
                onChange={(e) => handleChange('user', e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="15" height="15" viewBox="0 0 15 15" 
                fill="none"
                onClick={()=> handleEditInput('user')}
                className="cursor-pointer"
                // data-tip="Edit"
                // data-for="editTip"
                >
                {inputs.user.icon === 'edit' ?(
                    <path d="M12.0205 6.76758L12.3515 6.43652L11.3584 5.44336L9.53905 3.62402L8.54588 2.63086L8.21483 2.96191L7.55272 3.62402L1.71678 9.45996C1.41209 9.76465 1.18944 10.1426 1.06639 10.5557L0.0292824 14.083C-0.0439598 14.3291 0.023423 14.5957 0.207993 14.7773C0.392564 14.959 0.656236 15.0264 0.902329 14.9561L4.42674 13.9189C4.83983 13.7959 5.21776 13.5732 5.52245 13.2686L11.3584 7.43262L12.0205 6.76758ZM4.68749 11.7012L4.42088 12.3662C4.3037 12.457 4.17186 12.5244 4.03124 12.5684L1.74022 13.2422L2.41405 10.9541C2.45506 10.8105 2.52538 10.6787 2.6162 10.5645L3.28124 10.2979V11.2354C3.28124 11.4932 3.49217 11.7041 3.74999 11.7041H4.68749V11.7012ZM10.626 0.547852L10.2041 0.972656L9.54198 1.63477L9.20799 1.96582L10.2012 2.95898L12.0205 4.77832L13.0137 5.77148L13.3447 5.44043L14.0068 4.77832L14.4316 4.35352C15.164 3.62109 15.164 2.43457 14.4316 1.70215L13.2803 0.547852C12.5478 -0.18457 11.3613 -0.18457 10.6289 0.547852H10.626ZM9.23729 5.46973L5.01854 9.68848C4.8369 9.87012 4.53807 9.87012 4.35643 9.68848C4.17479 9.50684 4.17479 9.20801 4.35643 9.02637L8.57518 4.80762C8.75682 4.62598 9.05565 4.62598 9.23729 4.80762C9.41893 4.98926 9.41893 5.28809 9.23729 5.46973Z" fill="white"/>
                ) : (
                  <path d="M2.8125 0.9375C1.77832 0.9375 0.9375 1.77832 0.9375 2.8125V12.1875C0.9375 13.2217 1.77832 14.0625 2.8125 14.0625H12.1875C13.2217 14.0625 14.0625 13.2217 14.0625 12.1875V5.07715C14.0625 4.5791 13.8662 4.10156 13.5146 3.75L11.25 1.48535C10.8984 1.13379 10.4209 0.9375 9.92285 0.9375H2.8125ZM2.8125 3.75C2.8125 3.23145 3.23145 2.8125 3.75 2.8125H9.375C9.89355 2.8125 10.3125 3.23145 10.3125 3.75V5.625C10.3125 6.14355 9.89355 6.5625 9.375 6.5625H3.75C3.23145 6.5625 2.8125 6.14355 2.8125 5.625V3.75ZM7.5 8.4375C7.99728 8.4375 8.47419 8.63504 8.82582 8.98668C9.17746 9.33831 9.375 9.81522 9.375 10.3125C9.375 10.8098 9.17746 11.2867 8.82582 11.6383C8.47419 11.99 7.99728 12.1875 7.5 12.1875C7.00272 12.1875 6.52581 11.99 6.17417 11.6383C5.82254 11.2867 5.625 10.8098 5.625 10.3125C5.625 9.81522 5.82254 9.33831 6.17417 8.98668C6.52581 8.63504 7.00272 8.4375 7.5 8.4375Z" fill="white"/>
                )}
              </svg>
              {/* <Tooltip id="editTip" place="top" effect="solid" /> */}
            </div>
            <div className={style.inputWrap}>
              <input
                type="email"
                value={inputs.email.value}
                className="input input-bordered w-full max-w-xs"
                disabled={inputs.email.disabled}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="15" height="15" viewBox="0 0 15 15" 
                fill="none"
                onClick={()=> handleEditInput('email')}
                className="cursor-pointer"
                // data-tip="Edit"
                // data-for="editTip"
                >
                {inputs.email.icon === 'edit' ?(
                    <path d="M12.0205 6.76758L12.3515 6.43652L11.3584 5.44336L9.53905 3.62402L8.54588 2.63086L8.21483 2.96191L7.55272 3.62402L1.71678 9.45996C1.41209 9.76465 1.18944 10.1426 1.06639 10.5557L0.0292824 14.083C-0.0439598 14.3291 0.023423 14.5957 0.207993 14.7773C0.392564 14.959 0.656236 15.0264 0.902329 14.9561L4.42674 13.9189C4.83983 13.7959 5.21776 13.5732 5.52245 13.2686L11.3584 7.43262L12.0205 6.76758ZM4.68749 11.7012L4.42088 12.3662C4.3037 12.457 4.17186 12.5244 4.03124 12.5684L1.74022 13.2422L2.41405 10.9541C2.45506 10.8105 2.52538 10.6787 2.6162 10.5645L3.28124 10.2979V11.2354C3.28124 11.4932 3.49217 11.7041 3.74999 11.7041H4.68749V11.7012ZM10.626 0.547852L10.2041 0.972656L9.54198 1.63477L9.20799 1.96582L10.2012 2.95898L12.0205 4.77832L13.0137 5.77148L13.3447 5.44043L14.0068 4.77832L14.4316 4.35352C15.164 3.62109 15.164 2.43457 14.4316 1.70215L13.2803 0.547852C12.5478 -0.18457 11.3613 -0.18457 10.6289 0.547852H10.626ZM9.23729 5.46973L5.01854 9.68848C4.8369 9.87012 4.53807 9.87012 4.35643 9.68848C4.17479 9.50684 4.17479 9.20801 4.35643 9.02637L8.57518 4.80762C8.75682 4.62598 9.05565 4.62598 9.23729 4.80762C9.41893 4.98926 9.41893 5.28809 9.23729 5.46973Z" fill="white"/>
                ) : (
                  <path d="M2.8125 0.9375C1.77832 0.9375 0.9375 1.77832 0.9375 2.8125V12.1875C0.9375 13.2217 1.77832 14.0625 2.8125 14.0625H12.1875C13.2217 14.0625 14.0625 13.2217 14.0625 12.1875V5.07715C14.0625 4.5791 13.8662 4.10156 13.5146 3.75L11.25 1.48535C10.8984 1.13379 10.4209 0.9375 9.92285 0.9375H2.8125ZM2.8125 3.75C2.8125 3.23145 3.23145 2.8125 3.75 2.8125H9.375C9.89355 2.8125 10.3125 3.23145 10.3125 3.75V5.625C10.3125 6.14355 9.89355 6.5625 9.375 6.5625H3.75C3.23145 6.5625 2.8125 6.14355 2.8125 5.625V3.75ZM7.5 8.4375C7.99728 8.4375 8.47419 8.63504 8.82582 8.98668C9.17746 9.33831 9.375 9.81522 9.375 10.3125C9.375 10.8098 9.17746 11.2867 8.82582 11.6383C8.47419 11.99 7.99728 12.1875 7.5 12.1875C7.00272 12.1875 6.52581 11.99 6.17417 11.6383C5.82254 11.2867 5.625 10.8098 5.625 10.3125C5.625 9.81522 5.82254 9.33831 6.17417 8.98668C6.52581 8.63504 7.00272 8.4375 7.5 8.4375Z" fill="white"/>
                )}
              </svg>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary text-secondary" onClick={()=> handleSaveAllChanges()}>Comfirm changes</button>
              {saveStatus !== null && (
                <div className={`text-sm font-medium ${saveStatus ? 'text-green-500' : 'text-red-500'}`}>
                  {saveMessage}
                </div>
              )}
              <button className="btn bg-customDeleteBtn text-secondary" onClick={()=>document.getElementById('my_modal_3').showModal()}>Delete user</button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Hello, dont want to chat anymore?
                  <br />You are about to delete this user!</h3>
                  <p className="py-4">Are you sure? Comfirm by clicking the button below</p>
                  <button onClick={handleDeleteUser} className="btn bg-customDeleteBtn" >Delete user</button>
                  {deleteMessage && <p>{deleteMessage}</p>}
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfileComp