import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

// Custom hook to use the context easily
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // Attempt to get user from localStorage, or default to null
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("event-user")) || null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};