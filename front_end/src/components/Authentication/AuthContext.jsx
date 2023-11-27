import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  // Handle login
  const login = (token) => {
    if (token) {
      // Store the token securely in the local storage
      localStorage.setItem("token", token);
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.setItem("token", "");
    setAccessToken("");
    setIsAuthenticated(false);
  };

  const hasAccessToken = () => {
    const accessToken = localStorage.getItem("token");
    return accessToken !== null && accessToken !== "";
  };

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
