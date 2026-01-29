import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
