import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login
  const login = (token) => {
    if (token) {
      // Store the token securely in the local storage
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const hasAccessToken = () => {
    const accessToken = localStorage.getItem("token");
    return accessToken !== null && accessToken !== "";
  };

  useEffect(() => {
    logout();
  }, []);

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
