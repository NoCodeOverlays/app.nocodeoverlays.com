import { createContext, useState, useContext, useEffect } from 'react';
import { firebaseAPI } from '../lib/firebase';

const OverlayContext = createContext({ data: null, loading: true });

export const OverlayProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    firebaseAPI('getOverlayData').then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <OverlayContext.Provider value={{ data, loading }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);
