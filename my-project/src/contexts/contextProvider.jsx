import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios";

const stateContext = createContext({});

export const ContextProvider = ({ children }) => {
 
  
  const [errors, setErrors] = useState({_Html: ''});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()

  const getAuth = () => {
    return localStorage.getItem("auth") || false;
  };
  const getRole = () => {
    return localStorage.getItem("role");
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  const [auth, isAuth] = useState(getAuth());
  const [roles, setRoles] = useState(getRole());
  const [user, setUser] = useState(getUser());
  const setUsers = (data) => {
    setUser(data);
};
  const setAuth = (data) => {
      isAuth(data);
  };
  const setRole = (data) => {
      setRoles(data);
  };
 
  
  const register = ({...data}) => {
    axiosClient.get('/sanctum/csrf-cookie');
    return axiosClient.post('/register', {...data})
    .then((res) => {
      return res.data;
    })
    .then((res) => {
        return res.data
    })
    .then(({name, email}) => {
      setUser({name: name, email: email});
      setAuth(true);
      navigate('/email/verify');
    })
    .catch((error) => {
      const response = error.response;
      if (response) {
        // Email is already taken
        setErrors({
          ...errors,
          _Html:
            "This email is already taken. Please choose a different one.",
        });
      } else {
        console.log("Error during signup:", error);
      }
    });
  }

  const login = ({...data}) =>  {
    setLoading(true);
    axiosClient.get('/sanctum/csrf-cookie');
    return axiosClient.post('/login', {...data})
    .then(({data}) => {
      return data.data
    })
    .then((res) => {
      setLoading(false);
      setAuth(true);
      setUsers({name: res.user.name, email: res.user.email, email_verified_at: res.user.email_verified_at});
      setRole(res.role);
      localStorage.setItem("role", res.role);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("auth", true);
      if(res.role === 'admin'){
        navigate("/dashboard"); 
      }else if(res.role === 'user'){
          if(res.user.email_verified_at){
            navigate('/home')
          }else{
            axiosClient.post('/re-send-pin');
            navigate('/email/verify')
          }
      }else{
        navigate('/login');
      }

    })
    .catch((err) => {
      // Assuming the API responds with a status code of 401 or similar for unauthorized access
      setLoading(false);
      if (err.response && err.response.status === 403) {
        setErrors({
          _Html: err.response.data.message,
        });
      } else {
        // For any other error, you might want to display a generic error message
        setErrors({ _Html: "An error occurred. Please try again later." });
      }
    });
  }

  const email_verify = ({...email_and_pin}) => {
    setLoading(true);
    return axiosClient.post('/email/verify', {...email_and_pin})
    .then(() => {
        navigate('/home');
    })
    .catch((err) => {
      setLoading(false);
      if (err.response && err.response.status === 403) {  
        setErrors({
          _Html: err.response.data.message,
        });
      } else {
        // For any other error, you might want to display a generic error message
        setErrors({ _Html: "An error occurred. Please try again later." });
      }
    })

  }

  const resend_pin = () => {
    axiosClient.post('/re-send-pin');
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
  // 
  return (
    <stateContext.Provider value={{ user, auth,  roles,errors, loading, login,logout, setUsers, setAuth, register,  setErrors, email_verify, resend_pin}}>
      {children}
    </stateContext.Provider>
  );
};
export const useStateContext = () => useContext(stateContext);
