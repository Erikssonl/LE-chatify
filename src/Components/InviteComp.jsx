import { useContext, useEffect, useState } from "react"
import { ChatContext } from '../context/ChatContextProvider';
import { useDebounce } from '../hooks/useDebounce';

const InviteComp = () => {
    const { allUsers, inviteUser } = useContext(ChatContext)
    const [userSearch, setUserSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const search = debouncedSearchTerm.trim().toLowerCase();
        if (search) {
            const filteredUsers = allUsers.filter(user =>
                user.username.toLowerCase().includes(search)
            );
            setUserSearch(filteredUsers);
        } else {
            setUserSearch([]);
        }
    }, [debouncedSearchTerm, allUsers])

    const handleInvite = (userId) => {
        inviteUser(userId);
        setSearchTerm("");
        setUserSearch([]);
    }

  return (
    <div>
        <div>
          <input 
            type="text" 
            placeholder="Invite user to chat" 
            className="input input-bordered input-primary w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        {searchTerm && userSearch.length > 0 && (
            <div className="dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute">
                <ul className="menu">
                    {userSearch.map((user, index) => (
                        <li key={index} className="flex justify-between items-center p-2">
                            <p className="flex-grow truncate">{user.username}</p>
                            <button onClick={() => handleInvite(user.userId)} className="btn btn-primary btn-xs">Invite</button>
                            <div className="divider"></div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}
export default InviteComp