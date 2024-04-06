import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    setUser:  () => {},
    setToken: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(null);
    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem("ACCESS_TOKEN", token);
        }
    }


    return (
        <stateContext.Provider value={
           { user,
            setUser,
            token,
            setToken
        }
        }>
            {children}
        </stateContext.Provider>
    )

}
export const useStateContext = () => useContext(stateContext)