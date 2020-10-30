import { createContext, useState, useEffect, useContext } from 'react';
import { firebaseAPI } from '../lib/firebase';

const AuthContext = createContext({ user: null, userLoading: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState();

  useEffect(() => {
    setUserLoading(true);
    return firebaseAPI('onAuthStateChanged', (res) => {
      setUser(res);
      setUserLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
