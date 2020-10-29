import { createContext, useState, useEffect, useContext } from 'react';
import { firebaseAPI } from '../lib/firebase';

const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebaseAPI('onAuthStateChanged', (user) => {
      setLoading(false);
      setUser(user || null);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
