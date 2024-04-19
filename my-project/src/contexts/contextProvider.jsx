import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios";

const stateContext = createContext({});

export const ContextProvider = ({ children }) => {
 
  const [user, setUser] = useState({});
  const [error, setError] = useState({_Html: ''});
  
  const navigate = useNavigate()

  const getAuth = () => {
    return localStorage.getItem("auth") || false;
  };
  const getRole = () => {
    return localStorage.getItem("role") || null;
  };
  const [auth, isAuth] = useState(getAuth());
  const [roles, setRoles] = useState(getRole());
  const setAuth = (data) => {
      isAuth(data);
  };
  const setRole = (data) => {
      setRoles(data);
  };

  const login = ({...data}) =>  {
    axiosClient.get('/sanctum/csrf-cookie');
    return axiosClient.post('/login', {...data})
    .then(({data}) => {
      return data.data;
    })
    .then(({role, email, name}) => {
      setAuth(true);
      setUser({name: name, email: email});
      setRole(role);
      localStorage.setItem("role", role);
      localStorage.setItem("user", name);
      localStorage.setItem("auth", true);
      if(role === 'admin'){
        navigate("/dashboard"); 
      }else if(role === 'user'){
        navigate("/home"); 
      }else{
        navigate("/login"); 
      }
    })
    .catch((err) => {
      // Assuming the API responds with a status code of 401 or similar for unauthorized access
      if (err.response && err.response.status === 401) {
        setError({
          _Html:
            "Password or Email did not match. Please re-check your details.",
        });
      } else {
        // For any other error, you might want to display a generic error message
        setError({ _Html: "An error occurred. Please try again later." });
      }
    });
  }

  const logout = async (api) => {
    await axiosClient.post(api);
    setUser({});
    isAuth(false);
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <stateContext.Provider value={{ user, auth, logout, login, setUser, isAuth, roles}}>
      {children}
    </stateContext.Provider>
  );
};
export const useStateContext = () => useContext(stateContext);
