import { createContext, useState, useEffect } from "react";
import { getCookie } from '../utils/helper';


export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        if(getCookie('user')) setCurrentUser({ user: JSON.parse(getCookie('user')), token: getCookie('jwtToken') });
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}