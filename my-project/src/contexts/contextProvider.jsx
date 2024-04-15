import { createContext, useContext, useState } from "react";

const stateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const getToken = () => {
    return localStorage.getItem("ACCESS_TOKEN") || "";
  };
  const [token, _setToken] = useState(getToken());
  const setTokens = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
  };
  const setToken = (data) => {
    setTokens(data);
    _setToken(data);
  };

  return (
    <stateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </stateContext.Provider>
  );
};
export const useStateContext = () => useContext(stateContext);
