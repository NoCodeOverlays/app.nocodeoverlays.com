import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth';
import { firebaseAPI } from '../lib/firebase';

const OverlayContext = createContext({ data: null, loading: true });

export const OverlayProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (!user) {
      return;
    }

    firebaseAPI('getOverlayData').then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [user]);

  return (
    <OverlayContext.Provider value={{ data, loading }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
