import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login
  const login = (token, username, exp_time) => {
    if (token && username && exp_time) {
      // Store the token securely in the local storage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("exp_time", exp_time);
      setIsAuthenticated(true);
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token"); // clear the token from the local storage
    localStorage.removeItem("username");
    localStorage.removeItem("exp_time");
    setIsAuthenticated(false);
  };

  const hasAccessToken = () => {
    const accessToken = localStorage.getItem("token");
    return accessToken !== null && accessToken !== "";
  };

  // useEffect(() => {
  //   logout();
  // }, []);

  // check authentication using tokens
  //   const checkAuth = () => {
  //     return isAuthenticated;
  //   };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, hasAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
