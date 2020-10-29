import { createContext, useState, useEffect, useContext } from 'react';
import { firebaseAPI } from '../lib/firebase';

const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    return firebaseAPI('onAuthStateChanged', (res) => {
      setUser(res);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
