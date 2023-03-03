import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useLocalStorage('authData', {});
  
  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}